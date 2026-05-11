const tours = [
  {
    _id: 1001,
    title: "Sands of the Thar",
    description:
      "Ride across golden sand dunes under a wide blue sky. You will watch the sun melt into the horizon and feel the desert breeze. There is time to relax in tents and enjoy a cozy campfire. Local music and food make the evenings warm and fun. The trip shows how peaceful the desert can be. It is a calm adventure with a mix of nature and culture.",
    state: "Rajasthan",
    price: 15000,
    duration: 4,
    difficulty: "Moderate",
    ecoScore: 8,
    location: "Jaisalmer, India",
    groupSize: 10,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour1-1.png",
      "images/tour1-2.png",
      "images/tour1-3.png",
      "images/tour1-4.png",
      "images/tour1-5.png",
      "images/tour1-6.png",
    ],
    rating: 4.7,
    highlights: [
      "Camel safari at dusk",
      "Cultural Rajasthani performances",
      "Night in desert tents",
    ],
    guide: {
      name: "Arjun Singh",
      experience: "12+ Years",
      photo: "images/guides/arjun-singh.jpg",
    },
    reviews: [
      {
        name: "Rahul Sharma",
        rating: 5,
        comment: "An unforgettable desert experience! The camel safari was magical, and the cultural performances were authentic. Highly recommend!",
        createdAt: "2024-03-15T10:00:00Z",
        photo: null
      },
      {
        name: "Priya Patel",
        rating: 4,
        comment: "Beautiful landscapes and great food. The tents were comfortable, but it got quite cold at night. Overall, a wonderful trip.",
        createdAt: "2024-02-20T14:30:00Z",
        photo: null
      },
      {
        name: "Amit Kumar",
        rating: 5,
        comment: "The guide Arjun was excellent and very knowledgeable. The sunset views were breathtaking. Will definitely come back!",
        createdAt: "2024-01-10T16:45:00Z",
        photo: null
      },
      {
        name: "Sneha Gupta",
        rating: 4,
        comment: "Loved the peaceful atmosphere and the local music. The food was delicious. A perfect getaway from city life.",
        createdAt: "2023-12-05T11:20:00Z",
        photo: null
      },
      {
        name: "Vikram Singh",
        rating: 5,
        comment: "Incredible experience! The sand dunes were mesmerizing, and the campfire stories were engaging. 5 stars!",
        createdAt: "2023-11-18T19:00:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:05:00Z",
    updatedAt: "2025-08-12T10:05:00Z",
  },
  {
    _id: 1002,
    title: "Backwaters Bliss",
    description:
      "Drift along slow green waterways lined with palm trees. The houseboat stays are calm, with soft sounds of water and birds. You taste real Kerala food and see village life along the banks. There are gentle boat rides at sunrise and sunset. This tour is about rest, beauty, and simple local life. It feels quiet and refreshing.",
    state: "Kerala",
    price: 19800,
    duration: 5,
    difficulty: "Easy",
    ecoScore: 9,
    location: "Alleppey, India",
    groupSize: 14,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour2-1.png",
      "images/tour2-2.png",
      "images/tour2-3.png",
      "images/tour2-4.png",
      "images/tour2-5.png",
      "images/tour2-6.png",
    ],
    rating: 4.9,
    highlights: [
      "Stay in luxury houseboats",
      "Authentic Kerala cuisine",
      "Sunrise canoe rides",
    ],
    guide: {
      name: "Maya Nair",
      experience: "8+ Years",
      photo: "images/guides/maya-nair.jpg",
    },
    reviews: [
      {
        name: "Anjali Rao",
        rating: 5,
        comment: "Absolutely serene! The houseboat was luxurious, and the backwaters were stunning. The food was authentic and delicious.",
        createdAt: "2024-03-10T09:15:00Z",
        photo: null
      },
      {
        name: "Rajesh Kumar",
        rating: 5,
        comment: "A perfect relaxation trip. The sunrise canoe ride was magical. Maya was an excellent guide with great knowledge.",
        createdAt: "2024-02-14T13:45:00Z",
        photo: null
      },
      {
        name: "Meera Iyer",
        rating: 4,
        comment: "Beautiful experience, very peaceful. The Kerala cuisine was outstanding. Would love to visit again.",
        createdAt: "2024-01-22T17:30:00Z",
        photo: null
      },
      {
        name: "Suresh Nair",
        rating: 5,
        comment: "The backwaters are breathtaking. Houseboat stay was comfortable and the village visits were insightful.",
        createdAt: "2023-12-08T12:00:00Z",
        photo: null
      },
      {
        name: "Lakshmi Menon",
        rating: 5,
        comment: "Incredible tranquility. The guide explained everything beautifully. Highly recommended for nature lovers.",
        createdAt: "2023-11-25T15:20:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:10:00Z",
    updatedAt: "2025-08-12T10:10:00Z",
  },
  {
    _id: 1003,
    title: "Call of the Rainforest",
    description:
      "Walk through lush forests full of tall trees and bright birds. You hear the sounds of wildlife and fresh water nearby. The guides show hidden spots like waterfalls and quiet paths. You stay close to nature, with safe and guided tours. This trip is perfect for nature lovers and quiet explorers. It feels like stepping into a green, peaceful world.",


    state: "Meghalaya",
    price: 15600,
    duration: 3,
    difficulty: "Moderate",
    ecoScore: 9,
    location: "Meghalaya, India",
    groupSize: 8,
    inclusions: {
      hasFood: true,
      hasStay: false,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour3-1.png",
      "images/tour3-2.png",
      "images/tour3-3.png",
      "images/tour3-4.png",
      "images/tour3-5.png",
      "images/tour3-6.png",
    ],
    rating: 4.6,
    highlights: [
      "Walk on living root bridges",
      "Private guided jungle tours",
      "Waterfall swimming experience",
    ],
    guide: {
      name: "Pema D.",
      experience: "10+ Years",
      photo: "images/guides/pema-d.jpg",
    },
    reviews: [
      {
        name: "Karan Joshi",
        rating: 5,
        comment: "The rainforest was incredible! Walking on living root bridges was a unique experience. Pema was very knowledgeable.",
        createdAt: "2024-03-05T08:30:00Z",
        photo: null
      },
      {
        name: "Neha Singh",
        rating: 4,
        comment: "Beautiful nature and peaceful atmosphere. The waterfalls were stunning. Great for photography enthusiasts.",
        createdAt: "2024-02-18T11:45:00Z",
        photo: null
      },
      {
        name: "Arun Kumar",
        rating: 5,
        comment: "Amazing biodiversity! Saw so many birds and plants. The guided tours were excellent and informative.",
        createdAt: "2024-01-12T14:20:00Z",
        photo: null
      },
      {
        name: "Pooja Sharma",
        rating: 4,
        comment: "Loved the tranquility of the forest. The root bridges were fascinating. A must-visit for nature lovers.",
        createdAt: "2023-12-01T16:10:00Z",
        photo: null
      },
      {
        name: "Ravi Patel",
        rating: 5,
        comment: "Unforgettable adventure! The jungle paths were well-maintained and the wildlife sightings were amazing.",
        createdAt: "2023-11-15T10:55:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:15:00Z",
    updatedAt: "2025-08-12T10:15:00Z",
  },
  {
    _id: 1004,
    title: "Tea Trails of Darjeeling",
    description:
      "Visit tea gardens on soft, rolling hills covered in mist. You learn how tea leaves are picked and made into cups of fresh tea. The toy train ride through the hills is slow and scenic. The air is cool and smells of tea and flowers. You stay in charming cottages with local-style meals. This tour is calm, gentle, and full of beautiful mountain views.",
    state: "West Bengal",
    price: 17200,
    duration: 4,
    difficulty: "Easy",
    ecoScore: 8,
    location: "Darjeeling, India",
    groupSize: 12,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour4-1.png",
      "images/tour4-2.png",
      "images/tour4-3.png",
      "images/tour4-4.png",
      "images/tour4-5.png",
      "images/tour4-6.png",
    ],
    rating: 4.8,
    highlights: [
      "Visit organic tea estates",
      "Scenic toy train ride",
      "Stay in colonial heritage cottages",
    ],
    guide: {
      name: "Rita Bose",
      experience: "7+ Years",
      photo: "images/guides/rita-bose.jpg",
    },
    reviews: [
      {
        name: "Deepak Verma",
        rating: 5,
        comment: "The tea gardens were breathtaking! Learning about tea production was fascinating. Rita was an excellent guide.",
        createdAt: "2024-03-08T07:45:00Z",
        photo: null
      },
      {
        name: "Sunita Agarwal",
        rating: 4,
        comment: "Beautiful misty hills and delicious tea tastings. The toy train ride was a highlight. Very relaxing trip.",
        createdAt: "2024-02-12T10:30:00Z",
        photo: null
      },
      {
        name: "Mohan Das",
        rating: 5,
        comment: "Incredible views and fresh air. The heritage cottages were charming. Perfect for a peaceful getaway.",
        createdAt: "2024-01-05T13:15:00Z",
        photo: null
      },
      {
        name: "Rekha Jain",
        rating: 4,
        comment: "Loved the tea estates and the colonial architecture. The guide was very informative about local culture.",
        createdAt: "2023-12-20T15:50:00Z",
        photo: null
      },
      {
        name: "Vivek Saxena",
        rating: 5,
        comment: "Magical experience in the hills! The tea was amazing and the scenery was stunning. Highly recommend!",
        createdAt: "2023-11-10T09:25:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:20:00Z",
    updatedAt: "2025-08-12T10:20:00Z",
  },
  {
    _id: 1005,
    title: "Mystic Caves Adventure",
    description:
     "Enter ancient caves lit by soft lantern light and listen to the quiet. The rock formations and hidden pools feel mysterious and exciting. Local guides tell stories about the caves and the history nearby. You see areas only few travelers visit. The walk is slow and careful, with time to enjoy the cave beauty. It is a short, thrilling underground adventure.",
    state: "Meghalaya",
    price: 13200,
    duration: 2,
    difficulty: "Moderate",
    ecoScore: 7,
    location: "Cherrapunji, India",
    groupSize: 9,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: false,
    },
    availableDates: [],
    image: [
      "images/tour5-1.png",
      "images/tour5-2.png",
      "images/tour5-3.png",
      "images/tour5-4.png",
      "images/tour5-5.png",
      "images/tour5-6.png",
    ],
    rating: 4.5,
    highlights: [
      "Guided cave expeditions",
      "Underground waterfall views",
      "Local folklore storytelling",
    ],
    guide: {
      name: "Dilip Pathak",
      experience: "9+ Years",
      photo: "images/guides/dilip-pathak.jpg",
    },
    reviews: [
      {
        name: "Anita Roy",
        rating: 4,
        comment: "The caves were mysterious and beautiful! The lantern-lit paths created a magical atmosphere. Dilip's stories were captivating.",
        createdAt: "2024-03-12T06:20:00Z",
        photo: null
      },
      {
        name: "Sanjay Gupta",
        rating: 5,
        comment: "Incredible underground experience! The rock formations were stunning and the folklore was fascinating.",
        createdAt: "2024-02-08T14:40:00Z",
        photo: null
      },
      {
        name: "Kavita Singh",
        rating: 4,
        comment: "Loved exploring the hidden pools and waterfalls inside the caves. A unique adventure with great guides.",
        createdAt: "2024-01-18T11:55:00Z",
        photo: null
      },
      {
        name: "Rajiv Kumar",
        rating: 5,
        comment: "Thrilling cave expedition! The history and stories made it even more interesting. Highly recommended.",
        createdAt: "2023-12-15T16:35:00Z",
        photo: null
      },
      {
        name: "Megha Agarwal",
        rating: 4,
        comment: "Beautiful and peaceful caves. The guide was knowledgeable and the experience was unforgettable.",
        createdAt: "2023-11-22T10:10:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:25:00Z",
    updatedAt: "2025-08-12T10:25:00Z",
  },
  {
    _id: 1006,
    title: "Island Escape Lakshadweep",
    description:
      "Relax on white sandy beaches with clear blue water all around. The sea is calm and perfect for swimming, snorkeling, and diving. You can see colorful fish and coral gardens under the water. Evenings are peaceful with soft sea breeze and bonfires. The island life is slow, simple, and very quiet. This tour brings beach fun and nature together.",
    state: "Lakshadweep",
    price: 24800,
    duration: 6,
    difficulty: "Moderate",
    ecoScore: 9,
    location: "Lakshadweep, India",
    groupSize: 15,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour6-1.png",
      "images/tour6-2.png",
      "images/tour6-3.png",
      "images/tour6-4.png",
      "images/tour6-5.png",
      "images/tour6-6.png",
    ],
    rating: 4.9,
    highlights: [
      "Scuba diving with experts",
      "Beach bonfire nights",
      "Kayaking in crystal waters",
    ],
    guide: {
      name: "Neha D’Souza",
      experience: "11+ Years",
      photo: "images/guides/neha-dsouza.jpg",
    },    reviews: [
      {
        name: "Rohit Sharma",
        rating: 5,
        comment: "Paradise on earth! The beaches were pristine and the snorkeling was amazing. Neha was fantastic.",
        createdAt: "2024-03-20T08:00:00Z",
        photo: null
      },
      {
        name: "Priya Mehta",
        rating: 5,
        comment: "Incredible underwater world! Saw so many colorful fish. The bonfires were magical. Perfect relaxation.",
        createdAt: "2024-02-25T12:15:00Z",
        photo: null
      },
      {
        name: "Amit Patel",
        rating: 4,
        comment: "Beautiful islands with crystal clear water. Scuba diving was the highlight. Great food and hospitality.",
        createdAt: "2024-01-30T15:45:00Z",
        photo: null
      },
      {
        name: "Sneha Rao",
        rating: 5,
        comment: "Unforgettable beach experience! The kayaking and diving were excellent. Highly recommend for beach lovers.",
        createdAt: "2023-12-10T17:30:00Z",
        photo: null
      },
      {
        name: "Vikas Jain",
        rating: 5,
        comment: "Pure bliss! The serenity and beauty of Lakshadweep are unmatched. Neha made the trip memorable.",
        createdAt: "2023-11-05T10:20:00Z",
        photo: null
      }
    ],    createdAt: "2025-08-12T10:30:00Z",
    updatedAt: "2025-08-12T10:30:00Z",
  },
  {
    _id: 1007,
    title: "Frozen Lakes Expedition",
    description:
      "Walk across frozen lakes surrounded by snow-covered mountains. The silence of the frozen world feels magical and pure. You stay in local homes and learn about mountain life. The day trips are full of white views and soft snow. This tour is for people who want a strong nature experience. It is cold, beautiful, and very different from normal trips.",
    state: "Himachal Pradesh",
    price: 21500,
    duration: 5,
    difficulty: "Extreme",
    ecoScore: 7,
    location: "Spiti Valley, India",
    groupSize: 11,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour7-1.png",
      "images/tour7-2.png",
      "images/tour7-3.png",
      "images/tour7-4.png",
      "images/tour7-5.png",
      "images/tour7-6.png",
    ],
    rating: 4.8,
    highlights: [
      "Frozen lake trek",
      "Homestays with locals",
      "Snow photography sessions",
    ],
    guide: {
      name: "Sandeep Rana",
      experience: "14+ Years",
      photo: "images/guides/sandeep-rana.jpg",
    },
    reviews: [
      {
        name: "Kiran Patel",
        rating: 5,
        comment: "Breathtaking frozen landscapes! The silence was profound. Sandeep was an expert guide for this extreme adventure.",
        createdAt: "2024-03-15T07:10:00Z",
        photo: null
      },
      {
        name: "Nisha Gupta",
        rating: 4,
        comment: "Challenging but rewarding! The homestays were authentic and the snow photography was amazing.",
        createdAt: "2024-02-20T11:25:00Z",
        photo: null
      },
      {
        name: "Rahul Verma",
        rating: 5,
        comment: "Incredible experience walking on frozen lakes. The mountain views were spectacular. Highly recommended!",
        createdAt: "2024-01-15T14:50:00Z",
        photo: null
      },
      {
        name: "Poonam Singh",
        rating: 4,
        comment: "Magical winter wonderland! The local culture and food were great. A unique adventure.",
        createdAt: "2023-12-08T16:40:00Z",
        photo: null
      },
      {
        name: "Arjun Kumar",
        rating: 5,
        comment: "Unforgettable frozen expedition! The pristine beauty of Spiti Valley is unmatched. Sandeep was excellent.",
        createdAt: "2023-11-12T09:30:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:35:00Z",
    updatedAt: "2025-08-12T10:35:00Z",
  },
  {
    _id: 1008,
    title: "Valley of Flowers Journey",
    description:
      "Step into a valley covered in bright wildflowers and green hills. The air smells fresh and the colors are very bright. You walk gentle paths with guides who know the best sights. The evenings are calm and perfect for quiet rest. You stay near the hills in small lodges. This tour is peaceful, pretty, and full of flower views.",
    state: "Uttarakhand",
    price: 16200,
    duration: 4,
    difficulty: "Easy",
    ecoScore: 8,
    location: "Uttarakhand, India",
    groupSize: 10,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour8-1.png",
      "images/tour8-2.png",
      "images/tour8-3.png",
      "images/tour8-4.png",
      "images/tour8-5.png",
      "images/tour8-6.png",
    ],
    rating: 4.7,
    highlights: [
      "Guided trek through the valley",
      "Wildflower photography tips",
      "Stay in mountain lodges",
    ],
    guide: {
      name: "Anjali Sharma",
      experience: "6+ Years",
      photo: "images/guides/anjali-sharma.jpg",
    },
    reviews: [
      {
        name: "Deepa Rao",
        rating: 5,
        comment: "Flower paradise! The valley was covered in vibrant blooms. Anjali's photography tips were very helpful.",
        createdAt: "2024-03-10T08:45:00Z",
        photo: null
      },
      {
        name: "Suresh Kumar",
        rating: 4,
        comment: "Peaceful and beautiful trek. The mountain lodges were comfortable. Great for nature photography.",
        createdAt: "2024-02-15T12:20:00Z",
        photo: null
      },
      {
        name: "Meera Jain",
        rating: 5,
        comment: "Incredible floral display! The guided trek was perfect. The fresh mountain air was refreshing.",
        createdAt: "2024-01-20T15:35:00Z",
        photo: null
      },
      {
        name: "Vijay Singh",
        rating: 4,
        comment: "Loved the wildflowers and serene paths. The lodge stay was cozy. A must-visit in summer.",
        createdAt: "2023-12-05T17:50:00Z",
        photo: null
      },
      {
        name: "Kavita Patel",
        rating: 5,
        comment: "Magical valley experience! The colors were stunning. Anjali was knowledgeable and friendly.",
        createdAt: "2023-11-18T10:15:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:40:00Z",
    updatedAt: "2025-08-12T10:40:00Z",
  },
  {
    _id: 1009,
    title: "Kashmir Valley Serenity",
    description:
     "Float on a shikara boat across a quiet alpine lake with snow peaks around. You see gardens, houseboats, and mountain reflections on the water. The trip includes calm rides, local food, and gentle village visits. The air is cool and clean, with soft mountain breeze. This journey feels slow and dreamy. It is a lovely escape into a quiet valley.",
    state: "Jammu & Kashmir",
    price: 22000,
    duration: 5,
    difficulty: "Easy",
    ecoScore: 8,
    location: "Gulmarg, India",
    groupSize: 12,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour9-1.jpg",
      "images/tour9-2.jpg",
      "images/tour9-3.jpg",
      "images/tour9-4.jpg",
      "images/tour9-5.jpg",
      "images/tour9-6.jpg",
    ],
    rating: 4.8,
    highlights: [
      "Shikara ride on Dal Lake",
      "Gulmarg gondola experience",
      "Visit to Mughal gardens",
    ],
    guide: {
      name: "Rahil Khan",
      experience: "10+ Years",
      photo: "images/guides/rahil-khan.jpg",
    },
    reviews: [
      {
        name: "Anita Kumar",
        rating: 5,
        comment: "Dreamy Kashmir experience! The shikara ride on Dal Lake was magical. Rahil was very hospitable.",
        createdAt: "2024-03-12T09:00:00Z",
        photo: null
      },
      {
        name: "Rajesh Singh",
        rating: 4,
        comment: "Beautiful valley with stunning mountain views. The Mughal gardens were impressive. Great local food.",
        createdAt: "2024-02-18T13:30:00Z",
        photo: null
      },
      {
        name: "Poonam Sharma",
        rating: 5,
        comment: "Peaceful and serene! The gondola ride in Gulmarg was thrilling. Perfect honeymoon destination.",
        createdAt: "2024-01-25T16:45:00Z",
        photo: null
      },
      {
        name: "Vivek Rao",
        rating: 4,
        comment: "Loved the houseboat stay and village visits. The cool mountain air was refreshing. Highly recommend.",
        createdAt: "2023-12-12T18:20:00Z",
        photo: null
      },
      {
        name: "Neha Patel",
        rating: 5,
        comment: "Incredible beauty of Kashmir! The reflections on the lake were breathtaking. Rahil made it special.",
        createdAt: "2023-11-08T11:40:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:45:00Z",
    updatedAt: "2025-08-12T10:45:00Z",
  },
  {
    _id: 1010,
    title: "Golden Coast Goa",
    description:
      "Spend time on busy sandy beaches with warm sun and sea breeze. You can relax, swim, and enjoy seafood by the shore. The local markets and old buildings add bright colors and fun. Evenings are lively with music, lights, and beach food. This tour is friendly, cheerful, and easy to enjoy. It mixes beach time with local culture nicely.",
    state: "Goa",
    price: 18500,
    duration: 4,
    difficulty: "Easy",
    ecoScore: 9,
    location: "North Goa, India",
    groupSize: 14,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour10-1.jpg",
      "images/tour10-2.jpg",
      "images/tour10-3.jpg",
      "images/tour10-4.jpg",
      "images/tour10-5.jpg",
      "images/tour10-6.jpg",
    ],
    rating: 4.7,
    highlights: [
      "Sunset beach parties",
      "Heritage Portuguese architecture",
      "Fresh seafood by the shore",
    ],
    guide: {
      name: "Leena Fernandes",
      experience: "9+ Years",
      photo: "images/guides/leena-fernandes.jpg",
    },
    reviews: [
      {
        name: "Ravi Kumar",
        rating: 5,
        comment: "Goa was amazing! The beaches were perfect for relaxation and the seafood was delicious. Leena was great.",
        createdAt: "2024-03-18T10:15:00Z",
        photo: null
      },
      {
        name: "Priya Singh",
        rating: 4,
        comment: "Fun and vibrant! Loved the beach parties and Portuguese architecture. The markets were lively.",
        createdAt: "2024-02-22T14:30:00Z",
        photo: null
      },
      {
        name: "Amit Jain",
        rating: 5,
        comment: "Perfect beach getaway! The sunsets were spectacular and the local culture was fascinating.",
        createdAt: "2024-01-28T17:45:00Z",
        photo: null
      },
      {
        name: "Sneha Rao",
        rating: 4,
        comment: "Great mix of relaxation and adventure. The fresh seafood was outstanding. Highly recommend!",
        createdAt: "2023-12-15T19:00:00Z",
        photo: null
      },
      {
        name: "Vikas Sharma",
        rating: 5,
        comment: "Incredible Goan experience! The beaches, food, and culture were all top-notch. Leena made it special.",
        createdAt: "2023-11-20T12:25:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:50:00Z",
    updatedAt: "2025-08-12T10:50:00Z",
  },
  {
    _id: 1011,
    title: "Coorg Coffee Hills",
    description:
      "Walk under tall coffee trees and smell fresh coffee in the air. The hills are green and misty, with small waterfalls and quiet paths. You visit coffee estates and learn how coffee is grown and made. The food is local and warm, and the stays are cozy. This trip is calm and full of fresh hill air. It is a relaxing nature escape with coffee charm.",
    state: "Karnataka",
    price: 17800,
    duration: 4,
    difficulty: "Easy",
    ecoScore: 8,
    location: "Coorg, India",
    groupSize: 12,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour11-1.jpg",
      "images/tour11-2.jpg",
      "images/tour11-3.jpg",
      "images/tour11-4.jpg",
      "images/tour11-5.jpg",
      "images/tour11-6.jpg",
    ],
    rating: 4.8,
    highlights: [
      "Coffee estate guided walk",
      "Waterfall nature trail",
      "Traditional Kodava dining",
    ],
    guide: {
      name: "Nina Rao",
      experience: "8+ Years",
      photo: "images/guides/nina-rao.jpg",
    },
    reviews: [
      {
        name: "Arjun Singh",
        rating: 5,
        comment: "Coffee paradise! The aroma was heavenly. Nina explained the coffee-making process beautifully.",
        createdAt: "2024-03-14T08:30:00Z",
        photo: null
      },
      {
        name: "Megha Kumar",
        rating: 4,
        comment: "Peaceful hill station with great coffee estates. The Kodava dining was authentic and delicious.",
        createdAt: "2024-02-19T12:45:00Z",
        photo: null
      },
      {
        name: "Suresh Patel",
        rating: 5,
        comment: "Incredible coffee experience! The misty hills and waterfalls were stunning. Perfect relaxation.",
        createdAt: "2024-01-24T15:20:00Z",
        photo: null
      },
      {
        name: "Priya Jain",
        rating: 4,
        comment: "Loved the coffee walks and local culture. The homestays were comfortable. Highly recommend!",
        createdAt: "2023-12-09T17:35:00Z",
        photo: null
      },
      {
        name: "Vivek Sharma",
        rating: 5,
        comment: "Magical Coorg! The fresh coffee and scenic views were unforgettable. Nina was excellent.",
        createdAt: "2023-11-14T10:50:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T10:55:00Z",
    updatedAt: "2025-08-12T10:55:00Z",
  },
  {
    _id: 1012,
    title: "Rann of Kutch Festival",
    description:
     "See a huge white salt desert that shines in the sun and moonlight. The festival brings music, dance, and local arts to the desert. You meet local people, watch folk shows, and shop for handmade items. Nights are bright with lights, tents, and warm fires. This tour is exciting, colorful, and very unique. It feels like a desert party under the open sky.",
    state: "Gujarat",
    price: 19200,
    duration: 4,
    difficulty: "Moderate",
    ecoScore: 8,
    location: "Kutch, India",
    groupSize: 14,
    inclusions: {
      hasFood: true,
      hasStay: true,
      hasGuide: true,
      hasTransport: true,
    },
    availableDates: [],
    image: [
      "images/tour12-1.jpg",
      "images/tour12-2.jpg",
      "images/tour12-3.jpg",
      "images/tour12-4.jpg",
      "images/tour12-5.jpg",
      "images/tour12-6.jpg",
    ],
    rating: 4.7,
    highlights: [
      "White salt desert landscape",
      "Live folk music and dance",
      "Local handicraft shopping",
    ],
    guide: {
      name: "Kunal Mehta",
      experience: "12+ Years",
      photo: "images/guides/kunal-mehta.jpg",
    },
    reviews: [
      {
        name: "Rohit Kumar",
        rating: 5,
        comment: "Incredible white desert! The festival was vibrant with amazing folk performances. Kunal was knowledgeable.",
        createdAt: "2024-03-16T09:45:00Z",
        photo: null
      },
      {
        name: "Sneha Singh",
        rating: 4,
        comment: "Unique desert experience! The salt flats were mesmerizing. The handicrafts were beautiful.",
        createdAt: "2024-02-21T13:15:00Z",
        photo: null
      },
      {
        name: "Amit Patel",
        rating: 5,
        comment: "Festival in the desert was magical! The music and dance were authentic. Great cultural immersion.",
        createdAt: "2024-01-26T16:30:00Z",
        photo: null
      },
      {
        name: "Priya Rao",
        rating: 4,
        comment: "Loved the white landscape and local art. The night camps were cozy. A unique adventure!",
        createdAt: "2023-12-11T18:45:00Z",
        photo: null
      },
      {
        name: "Vikas Jain",
        rating: 5,
        comment: "Unforgettable Rann experience! The festival atmosphere was electric. Kunal made it special.",
        createdAt: "2023-11-16T11:20:00Z",
        photo: null
      }
    ],
    createdAt: "2025-08-12T11:00:00Z",
    updatedAt: "2025-08-12T11:00:00Z",
  },
];

module.exports = tours;

