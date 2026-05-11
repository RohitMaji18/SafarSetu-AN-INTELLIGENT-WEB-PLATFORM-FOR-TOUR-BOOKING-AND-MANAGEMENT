const Tour = require("../models/tours-model.js");

//get all tours
exports.getAllTours = async (req, res) => {
  try {
    const { state, difficulty, duration, priceMin, priceMax, groupSize, search } = req.query;

    const query = {};

    if (state) {
      query.state = { $regex: new RegExp(`^${state}$`, "i") };
    }

    if (difficulty) {
      query.difficulty = { $regex: new RegExp(`^${difficulty}$`, "i") };
    }

    if (duration) {
      query.duration = Number(duration);
    }

    if (groupSize) {
      query.groupSize = Number(groupSize);
    }

    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { highlights: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const tours = await Tour.find(query).sort({ price: 1 });
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getTourWeather = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOne({ _id: id });
    if (!tour) {
      return res.status(404).json({
        status: "error",
        message: "Tour not found",
      });
    }

    const weatherApiKey = process.env.OPENWEATHER_API_KEY;
    if (!weatherApiKey || weatherApiKey === 'your_openweather_api_key_here') {
      // Return mock weather data when API key is not configured
      const mockWeatherData = {
        location: tour.location || tour.state || "Unknown Location",
        description: "Sunny and pleasant",
        temp: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
        feelsLike: Math.floor(Math.random() * 15) + 22,
        humidity: Math.floor(Math.random() * 30) + 40, // Random humidity 40-70%
        windSpeed: Math.floor(Math.random() * 10) + 5, // Random wind 5-15 km/h
        icon: "01d"
      };

      return res.status(200).json({
        status: "success",
        data: {
          weather: mockWeatherData
        },
      });
    }

    const locationQuery = encodeURIComponent(tour.location || tour.state || "India");
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&units=metric&appid=${weatherApiKey}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(response.status).json({
        status: "error",
        message: "Weather lookup failed.",
        details: errorBody,
      });
    }

    const weatherData = await response.json();

    res.status(200).json({
      status: "success",
      data: {
        weather: {
          location: weatherData.name,
          description: weatherData.weather?.[0]?.description || "Clear skies",
          temp: weatherData.main?.temp,
          feelsLike: weatherData.main?.feels_like,
          humidity: weatherData.main?.humidity,
          windSpeed: weatherData.wind?.speed,
          icon: weatherData.weather?.[0]?.icon,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
//get a single tour by ID

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOne({ _id: id });
    if (!tour) {
      return res.status(404).json({
        status: "error",
        message: "Tour not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
