import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();




const app = express();
const port = 4000;
const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
    const city = req.query.city;
    
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await axios.get(API_URL);
    const data = response.data;

    res.render("index.ejs", { data: data });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      console.error("Full error:", error);
      res.render("index.ejs", {
          error: error.message,
      });
};
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  