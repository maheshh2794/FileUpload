
const express = require("express");
const app = express();

const multer = require("multer")
const path = require("path")

const cors = require("cors")


const mongoose = require("mongoose");


app.use(cors())
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

mongoose.connect("mongodb+srv://dbuser2:Mahesh123@maheshgunda.hpqutwf.mongodb.net/", {
    dbName: "FileData"
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Connection error:", err));

const dataSchema = new mongoose.Schema({
    name: String,
    link: String
});

const dataModel = mongoose.model("Link", dataSchema);


app.get("/data", (req, res) => {
    dataModel.find()
        .then(data => res.json(data));
});


app.post("/data", (req, res) => {
    const data = new dataModel(req.body);

    data.save()
        .then(() => res.send("Saved successfully"));
});


app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Please select a file");
    }

    const data = new dataModel({
        name: req.file.originalname,
        link: req.file.path
    });

    data.save()
        .then(() => res.send("File uploaded and saved successfully"))
        .catch(err => res.status(500).send(err.message));
});



app.listen(4000, () => {
    console.log("Server runs in port 4000");
});
