const rechercheIinput =document.querySelector("#recherch-analyse");
const btnEnvoyer =document.querySelector("#analyser");
const recherche =document.querySelector("#recherche");
const shortliste =document.querySelector("#shortlist");


btnEnvoyer.addEventListener("click", ()=> {
    const username =rechercheIinput.ariaValueMax.trim();

    if (username !== "") {
        window.location.href =`shortlist.html?
        query=${username}`
    }
});



