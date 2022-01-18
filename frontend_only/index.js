import {DEFAULT_TEXTS} from './default-texts.js';

let dactylographier = document.querySelector("#dactylographier");
let text = document.querySelector("#text");
let contentDiv = document.querySelector("#contentDiv");
const LEVEL_OPTIONS = ['facile', 'moyen', 'difficile'];

const onDactylographierClick = () => {
    contentDiv.innerHTML = "<h3 class='mb-3'>Texte à dactylographier</h3>"
                        + " <select class='form-control mb-4' id='levelList'>"
                        + "    <option>Veuillez choisir un niveau</option>"
                        + "    <option> "+ LEVEL_OPTIONS[0] +"</option>"
                        + "    <option> "+ LEVEL_OPTIONS[1] +"</option>"
                        + "    <option> "+ LEVEL_OPTIONS[2] +"</option>"
                        + " </select>"
                        + " <p class='alert alert-info' id='notifDactylo'>Le texte à dactylographier sera repris ici une fois le niveau sélectionné.</p>"
                        + " <textarea id='textDactylo' rows='5' cols='84' disabled/>";
    document.querySelector("#levelList").addEventListener("change", onLevelSelection);
}

const onTextClick = () => {
    contentDiv.innerHTML = "<h3 class='mb-3'>Ajout d'un texte à dactylographier</h3>"
                        + " <textarea id='textDactylo' rows='5' cols='84'></textarea><br/>"
                        + " <select class='form-control mt-1' id='levelListAdd'>"
                        + "    <option>Veuillez choisir un niveau</option>"
                        + "    <option> "+ LEVEL_OPTIONS[0] +"</option>"
                        + "    <option> "+ LEVEL_OPTIONS[1] +"</option>"
                        + "    <option> "+ LEVEL_OPTIONS[2] +"</option>"
                        + " </select><br/>"
                        + " <input type='submit' class='btn btn-primary mb-2' id='textSubmit' name=textSubmit value='Envoyer'/>"
                        + " <p class='alert alert-info' id='statutText'>Statut opération</p>";
}

const onLevelSelection = (e) => {
    let level = e.target.options[e.target.options.selectedIndex].value;
    document.querySelector("#textDactylo").value = "";
    if (!LEVEL_OPTIONS.includes(level)) {
        onDactylographierClick(); //display the original content if we select 'Veuillez choisir un niveau'
        return;
    }
    let textsDifficulty = selectTextDifficulty(level);
    let index = Math.floor(Math.random()*(textsDifficulty.length));
    let text = textsDifficulty[index].content;
    document.querySelector("#notifDactylo").innerText = text;
    document.querySelector("#textDactylo").removeAttribute("disabled");
}

//return a table containing all the texts from DEFAULT_TEXTS having the level difficulty in parameter
const selectTextDifficulty = (levelDifficulty) => {
    let textsDifficulty = [];
    DEFAULT_TEXTS.forEach(text => {
        if (text.level === levelDifficulty) {
            textsDifficulty.push(text);
        }
    });
    return textsDifficulty;
}

dactylographier.addEventListener("click", onDactylographierClick);
text.addEventListener("click", onTextClick);