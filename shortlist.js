const urlParams = new URLSearchParams(window.location.search);
const prevInput = urlParams.get("query");
const recherchAnalyse =document.querySelector("#recherch-analyse");


recherchAnalyse.value =prevInput

