const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define path
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "VinhNguyen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Vinh Nguyen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "This is help page",
    name: "Vinh Nguyen",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help articles not found.",
    title: "404",
    name: "Vinh Nguyen",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    title: "404",
    name: "Vinh Nguyen",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
