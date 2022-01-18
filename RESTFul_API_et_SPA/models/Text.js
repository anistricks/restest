"use strict";
const FILE_PATH = __dirname + "/texts.json";
const LEVEL_OPTIONS = ['facile', 'moyen', 'difficile'];

class Text {

    static getListTexts () {
        const fs = require("fs");
        if(!fs.existsSync(FILE_PATH)) 
            return [];
        let listTextsRaw = fs.readFileSync(FILE_PATH);
        if(listTextsRaw)
            return JSON.parse(listTextsRaw);
        return []; 
    }

    static getRandomTextFromListDifficulty(level) {
        let listTexts = this.getListTexts();
        if (!LEVEL_OPTIONS.includes(level))
            return null;
        let textsDifficulty = [];
        listTexts.forEach(text => {
            if (text.level === level) {
                textsDifficulty.push(text);
            }
        });
        let index = Math.floor(Math.random()*(textsDifficulty.length));
        return textsDifficulty[index].content;
    }

    static setText(text, level) {
        let listTexts = this.getListTexts();
        listTexts.push({id: listTexts.length+1, content: text, level: level});
        let jsonData = JSON.stringify(listTexts);  
        const fs = require("fs");
        fs.writeFileSync(FILE_PATH, jsonData);
        return "Enregistré";
    }
}

module.exports = Text;