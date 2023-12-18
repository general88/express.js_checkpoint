const express = require("express");
const app = express();
port = process.env.PORT || 5000;
const path = require("node:path");

//middleware function to check day of the week and time of the day
const checker = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  console.log(dayOfWeek);
  const hourOfDay = now.getHours();
  console.log(hourOfDay);

  app.use(express.static(path.resolve(__dirname, "public")));

  // Check if it's Monday to Friday and between 9 AM and 5 PM
  const isWorkingHours =
    dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17;

  if (!isWorkingHours) {
    return res.send(
      "Website is only available during Monday to Friday from 0900 to 1700."
    );
  }

  next();
};

//calling the middleware function
app.use(checker);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "././homepage.html"));
});
app.get("/services", (req, res) => {
  res.sendFile(path.resolve(__dirname, "././services.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "././contact.html"));
});

app.listen(port, () => console.log(`listening on port ${port}`));
