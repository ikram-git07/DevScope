const urlParams = new URLSearchParams(window.location.search);
const recherchAnalyse =document.querySelector("#recherch-analyse");
console.log(urlParams);
const prevInput = urlParams.get("query");




recherchAnalyse.value = prevInput;

// recherche
 async function fetchData (inputName) {
   try {
    const userData = await fetch (`https://api.github.com/users/${inputName}`);
    if(!userData.ok){
        throw new console.error("error");
        
    }
    const data =await userData.json();
    console.log(data)

   }

   catch (erreur){
    console.log("qwkjehfni")
   }
 }
 fetchData(prevInput);