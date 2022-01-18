"use strict"
let express= require("express");
let router = express.Router();

let Text = require("../models/Text.js");

//posting a new text
router.post("/", async function (request, response) {
    let level = request.body.level;
    let text = request.body.text;
    response.json(Text.setText(text, level));
});

//getting a random text from a level difficulty
router.get("/:level", async function (request, response) {
    let level = request.params.level;
    response.json(Text.getRandomTextFromListDifficulty(level));
});

module.exports = router;