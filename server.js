// server.js
const express = require("express");
const fetch = require("node-fetch"); // use node-fetch@2 for CommonJS
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/swiggy", async (req, res) => {
  try {
    const swiggyUrl =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    const response = await fetch(swiggyUrl, {
      headers: {
        // These headers mimic a real browser, sometimes needed for Swiggy
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json",
        Referer: "https://www.swiggy.com/",
      },
    });

    if (!response.ok) {
      console.error("Swiggy API error:", response.statusText);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch Swiggy API" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Server error:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});


app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  const menuUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.022505&lng=72.5713621&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(menuUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json",
        Referer: "https://www.swiggy.com/",
      },
    });

    if (!response.ok) {
      console.error("Swiggy Menu API error:", response.statusText);
      return res.status(response.status).json({ error: "Failed to fetch menu" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
