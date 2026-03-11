const axios = require("axios");
const pool = require("./db");

async function getCoordinates(address) {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "college-recommendation-system"
      }
    }
  );

  if (response.data.length === 0) {
    return null;
  }

  return {
    lat: parseFloat(response.data[0].lat),
    lon: parseFloat(response.data[0].lon),
  };
}

async function updateColleges() {
  const colleges = await pool.query(
    "SELECT id, name, location FROM college WHERE latitude IS NULL"
  );

  for (let college of colleges.rows) {
    try {
      const coords = await getCoordinates(college.location);

      if (coords) {
        await pool.query(
          "UPDATE college SET latitude=$1, longitude=$2 WHERE id=$3",
          [coords.lat, coords.lon, college.id]
        );

        console.log(`Updated: ${college.name}`);
      } else {
        console.log(`Not found: ${college.name}`);
      }

      // 1 second delay to avoid OpenStreetMap rate limit
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (err) {
      console.log(`Error with ${college.name}:`, err.message);
    }
  }

  console.log("Done updating coordinates!");
  process.exit();
}

updateColleges();