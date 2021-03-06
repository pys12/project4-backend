require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const cors = require ('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors({ origin: true, credentials: true }))

app.use('/products',require('./routes/products'))
app.use('/users',require('./routes/users'))
app.use('/orders',require('./routes/orders'))
app.get('/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));


app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));