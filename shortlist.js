

  const API_URL = "https://mockapi.io/projects/6af9bb956d8b86fb22d731a1#";
  import { ajoutCandidat } from "./config.js";


const urlParams = new URLSearchParams(window.location.search);
const recherchAnalyse = document.querySelector("#recherch-analyse");
console.log(urlParams);
const prevInput = urlParams.get("query");
const affUser = document.querySelector("aff-user");
const ajShort = document.querySelector("#ajShort");
const messageBtn = document.querySelector("#message-shortlist");


recherchAnalyse.value = prevInput;

// recherche

const reposList = document.querySelector("#repos-list");
const repoTemplate = document.querySelector("#repo-template");



async function fetchData(inputName) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${inputName}`,

        

        );

const fetchRepo = await fetch(
    `https://api.github.com/users/${inputName}/repos`,{
        headers: {
                    authorization: `Bearer ${token}`,

                },
    }
)
if (!response.ok) {
    throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
    );
}
if (!fetchRepo.ok) {
    throw new Error(`Erreur repos: ${fetchRepo.status}`);
}

const data = await response.json();
const repos = await fetchRepo.json();

afficherRepos(repos);
// console.log(fetchRepo)

// console.log(response)
console.log(data)
document.querySelector("#avatar").src = data.avatar_url;
document.querySelector("#name").textContent = data.name;
document.querySelector("#username").textContent = "@" + data.login;
document.querySelector("#bio").textContent = data.bio;
document.querySelector("#repos").textContent = data.public_repos;
document.querySelector("#followers").textContent = data.followers;
document.querySelector("#following").textContent = data.following;
document.querySelector("#profile-link").href = data.html_url
document.querySelector("#local").textContent = data.location || "📍 Non précisé";

ajShort.addEventListener("click", async ()=> {
    const nvuser = {
        name: data.name || data.login,
        login: data.login,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        language: "Non spécifié",
        rating: 0,
        statuts: "A contacter",
        note: "",
        created_at: data.created_at
    }
    try {
        const developers = await transferUsers();
        // Vérifier léexistance du développeurs:
        const exist = developers.find(dev => dev.login === nvuser.login);
        if (exist) {
            messageBtn.textContent = "Ce Developper est déja dans shortlist! "
            return;
        }

        const resultat = await ajoutCandidat(nvuser);
        console.log("Developer : ", resultat);


    } catch (e) {
        console.log(e.message);
    }
});
        

    } catch (e) {
    console.error("Failed to fetch profile:", e);
    return null;
}
}
fetchData(prevInput);



function afficherRepos(repos) {
    reposList.innerHTML = "";
    document.querySelector("#repos-count").textContent = repos.length;
    repos.forEach(repo => {
        const clone = repoTemplate.content.cloneNode(true);
        clone.querySelector("#repo-name").textContent = repo.name;
        clone.querySelector("#repo-description").textContent = repo.description || "Aucune description.";
        clone.querySelector("#repo-language").textContent = repo.language || "Non précisé";
        clone.querySelector("#repo-stars").textContent = "★ " + repo.stargazers_count;
        clone.querySelector("#repo-forks").textConten = "⑂ " + repo.forks_count;
        clone.querySelector("#repo-date").textContent = "Mis à jour le " + new Date(repo.updated_at).toLocaleDateString("fr-FR");
        clone.querySelector("#repo-link").href = repo.html_url;
        reposList.appendChild(clone);
    });
}


function shortlist(users) {
    affUser.innerHTML = `<div class="flex items-center gap-5">
            <img
                src="avatar.jpg"
                alt="Avatar"
                class="w-16 h-16 rounded-full border-4 border-slate-500 object-cover"
            >

            <div>
                <h3 class=" text-lg font-bold">
                    soufiane boushaba
                </h3>

                <div class="flex items-center gap-2">
                    <span class="text-gray-400 text-sm">
                        @SOUFIANE-BOUSHABA
                    </span>

                    <span class="text-cyan-400 bg-cyan-950 border border-cyan-800 
                                 rounded-lg px-2 py-1 text-xs font-bold">
                        Java
                    </span>
                </div>

                <p class="text-cyan-400 italic mt-2">
                    test
                </p>

                <p class="text-gray-500 text-sm mt-2">
                    Ajouté le 06/11/2026
                </p>
            </div>

        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center justify-center gap-3">

            <div class="text-lime-400 text-2xl tracking-wider">
                ★★★★★
            </div>

            <button class="text-rose-400 border border-rose-500 
                           rounded-lg px-4 py-2 font-bold hover:bg-rose-500/10">
                ● REFUSÉ
            </button>

            <button class="text-cyan-400 border border-cyan-700 
                           rounded-lg px-4 py-2 font-bold hover:bg-cyan-500/10">
                ✎ Modifier
            </button>

            <button class="text-rose-400 border border-rose-800 
                           rounded-lg px-4 py-2 font-bold hover:bg-rose-500/10">
                ✕ Supprimer
            </button>

        </div>`
}



 async function transferUsers(user) {
    try{
 const response = await fetch("https://6af9bb956d8b86fb22d731a0.mockapi.io/api/v1/candidats" );
        if (!response.ok) throw new Error(Error`${response.status}`);
        return await response.json();
    }catch (e) {
    console.error("Failed to fetch profile:", e);
    return null;
}
}


