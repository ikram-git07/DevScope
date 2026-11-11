const rechercheIinput =document.querySelector("#recherch-analyse");
const btnEnvoyer =document.querySelector("#analyser");
const recherche =document.querySelector("#recherche");
const shortliste =document.querySelector("#shortlist");


btnEnvoyer.addEventListener("click", ()=> {});



// recherche
 async function fetchData (inputName) {
   try {
    const userData = await fetch (`https://api.github.com/users/${inputName}`);
    console.log(userData)

   }

   catch (erreur){
    console.log("qwkjehfni")
   }
 }
 fetchData();