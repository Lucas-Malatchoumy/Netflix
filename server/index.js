const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config");
const moviesRoutes = require("./routes/movies")
const userRoutes = require("./routes/user")
app.use(cors());
app.use(express.json())

app.use('/Netflix/movies', moviesRoutes)
app.use('/Netflix/user', userRoutes);

app.listen('3001', () => {
  console.log("ca roule");
})