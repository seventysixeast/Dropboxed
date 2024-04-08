// add google calendar event google apis node express
const express = require("express");
const router = express.Router();
//file is in public folder
const credentialsPath = "./client.json";

const addevent = async (req, res) => {
  const accessToken = "4/0AeaYSHAYymkuF-i3aT4ud0zHp26iOZFfaDNJYfXyvZKXflpI9tybkZZ4j4LCr8ZT1eYllA"
  let response = axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList/calendarId')

  
};
module.exports = { addevent };
