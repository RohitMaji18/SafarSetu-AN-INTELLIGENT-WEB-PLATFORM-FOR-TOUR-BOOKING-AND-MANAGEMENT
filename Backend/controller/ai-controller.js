const Groq = require("groq-sdk");
const Tour = require("../models/tours-model");

const normalizeText = (text) =>
  text?.toString().toLowerCase().trim() || "";

const levenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, () => []);
  for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
      );
    }
  }
  return matrix[b.length][a.length];
};

const isCloseMatch = (word, target) => {
  if (!word || !target) return false;
  const normalizedWord = normalizeText(word);
  const normalizedTarget = normalizeText(target);
  if (normalizedTarget.includes(normalizedWord)) return true;
  const distance = levenshteinDistance(normalizedWord, normalizedTarget);
  return distance <= 1 || (normalizedWord.length > 5 && distance <= 2);
};

const stopWords = new Set([
  "the", "and", "for", "with", "from", "that", "this", "your", "have", "want",
  "more", "over", "into", "near", "are", "but", "not", "all", "any",
  "tour", "tours", "travel", "trip", "trips", "to", "in", "on", "at", "by",
]);

const scoreTour = (preference, tour) => {
  const pref = normalizeText(preference);
  if (!pref) return 0;

  const candidateText = normalizeText(
    `${tour.title} ${tour.state} ${tour.location || ""} ${tour.highlights?.join(" ") || ""} ${tour.description || ""}`
  );
  const candidateWords = new Set(candidateText.match(/\w+/g) || []);
  const searchWords = [...new Set(pref.match(/\w+/g) || [])].filter(
    (word) => word.length > 2 && !stopWords.has(word)
  );

  let score = 0;

  searchWords.forEach((word) => {
    if (candidateWords.has(word)) score += 3;
    if (isCloseMatch(word, tour.title)) score += 15;
    if (isCloseMatch(word, tour.state)) score += 12;
    if (tour.location && isCloseMatch(word, tour.location)) score += 10;
    if ((tour.highlights || []).some((highlight) => isCloseMatch(word, highlight))) score += 6;
    if (tour.description && normalizeText(tour.description).includes(word)) score += 2;
  });

  if (normalizeText(tour.title) === pref) score += 35;
  if (normalizeText(tour.state) === pref) score += 25;
  if (tour.location && normalizeText(tour.location) === pref) score += 20;

  return score;
};

let groq = null;
if (process.env.GROQ_API_KEY) {
  groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

const getAIRecommendation = async (req, res) => {
  try {if (!groq) return res.status(503).json({ message: "AI service offline." });
    const { userPreference, tourId } = req.body;
    const allTours = await Tour.find({});
    if (!allTours.length) return res.status(404).json({ message: "No tours in database." });
   let selectedTour = null;
    let matchType = "none";
    // 1. SELECTION LOGIC
 if (tourId) {
      selectedTour = await Tour.findOne({ _id: tourId });
      matchType = "exact";
    } else {
      const scored = allTours.map(t => ({ tour: t, score: scoreTour(userPreference, t) }));

      
      // Only pick the top result if it has a strong relevance score
      if (scored[0].score >= 8) {
        selectedTour = scored[0].tour;
        matchType = scored[0].score > 20 ? "exact" : "similar";
      }
    }

    // 2. THE STRICT RULE: If no match found in DB, do NOT call AI.
    if (!selectedTour) {
      return res.status(200).json({
        matchType: "none",
        message: `We don't have any tours matching "${userPreference}" right now.`,
        recommendedTourId: null,
        itinerary: []
      });
    }

    // 3. AI GENERATION (Only for the selected tour)
    const systemMessage = `
      You are the 'Tourmate' AI discovery agent.
      STRICT RULES:
      1. You are only allowed to talk about the tour provided: ${selectedTour.title}.
      2. Do not suggest or mention other destinations.
      3. Create an itinerary of exactly ${selectedTour.duration} days.
      4. Respond ONLY in valid JSON.
    `;

    const userPrompt = `
      The user is interested in: "${userPreference}"
      We found this tour in our database:
      - Title: ${selectedTour.title}
      - State: ${selectedTour.state}
      - Duration: ${selectedTour.duration} days
      - Highlights: ${selectedTour.highlights?.join(", ")}

      Task: Generate a JSON response for this tour.
      Format:
      {
          "matchType": "${matchType}",
          "message": "We found a perfect match in ${selectedTour.state}!",
          "recommendedTourId": ${selectedTour._id},
          "recommendedTourName": "${selectedTour.title}",
          "reason": "This tour matches your interest in ${userPreference}.",
          "itinerary": [
              { "day": 1, "activities": ["Point 1", "Point 2"] }
          ]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1, // Low temp prevents hallucination
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0].message.content);

    // Ensure required response fields exist
    const response = {
      matchType: aiResponse.matchType || matchType,
      message: aiResponse.message || `We found a tour matching your search: ${selectedTour.title}.`,
      recommendedTourId: aiResponse.recommendedTourId || selectedTour._id,
      recommendedTourName: aiResponse.recommendedTourName || selectedTour.title,
      reason: aiResponse.reason || `This tour matches your interest in ${userPreference}.`,
      itinerary: Array.isArray(aiResponse.itinerary) ? aiResponse.itinerary : []
    };

    // Final check to ensure itinerary matches database duration
    const finalItinerary = [];
    for (let i = 0; i < selectedTour.duration; i++) {
      const dayData = response.itinerary[i] || { activities: ["Explore " + selectedTour.title] };
      finalItinerary.push({
        day: i + 1,
        activities: Array.isArray(dayData.activities) ? dayData.activities.slice(0, 5) : ["Explore " + selectedTour.title]
      });
    }
    response.itinerary = finalItinerary;

    res.status(200).json(response);

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAIRecommendation };