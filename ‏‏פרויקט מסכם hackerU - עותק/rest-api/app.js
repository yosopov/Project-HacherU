const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const credit = require("./routes/credit");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


mongoose
.connect("mongodb://localhost/project_concludes_W210222E",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error("Could not connect to MongoDB..." ,err));

app.use(morgan("dev"));
app.use(cors())
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);
app.use("/api/credit", credit);



const port = 3900;

http.listen(port,() => console.log(`Listening on PORT ${port}...`))