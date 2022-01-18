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
    document.querySelector("#textSubmit").addEventListener("click", onTextSubmit)
}

const onLevelSelection = async (e) => {
    let level = e.target.options[e.target.options.selectedIndex].value;
    document.querySelector("#textDactylo").value = "";
    if (!LEVEL_OPTIONS.includes(level)) {
        onDactylographierClick(); //display the original content if we select 'Veuillez choisir un niveau'
        return;
    }
    await fetch("/api/texts/"+level).then(response => {
        if(!response.ok){
            throw new Error(response.status + " " + response.statusText);
        }
        return response.json();
    }).then( response => {
        document.querySelector("#notifDactylo").innerText = response;
        document.querySelector("#textDactylo").removeAttribute("disabled");
    });
    
}

const onTextSubmit = async (e) => {
    let level = document.querySelector("#levelListAdd").value;
    let text = document.querySelector("#textDactylo").value;
    if (text === "") {
        document.querySelector("#statutText").innerText = "Veuillez écrire un texte non vide";
        return;
    }
    if (!LEVEL_OPTIONS.includes(level)) {
        document.querySelector("#statutText").innerText = "Veuillez choisir un niveau de difficulté";
        return;
    }
    await fetch("/api/texts/", {
        method: "POST",
        body : JSON.stringify({text: text, level: level}),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok)
            throw new Error("Error code : " + response.status + " : " + response.statusText);
        return response.json();
    })
    .then((data) => {
        document.querySelector("#statutText").innerText = data;
    })
    .catch((err) => document.querySelector("#statutText").innerText = err.message);
}

dactylographier.addEventListener("click", onDactylographierClick);
text.addEventListener("click", onTextClick);