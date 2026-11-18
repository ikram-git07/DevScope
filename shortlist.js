

const API_URL = "https://mockapi.io/projects/6af9bb956d8b86fb22d731a1#";
import { afichCandidat, ajoutCandidat } from "./config.js";


const urlParams = new URLSearchParams(window.location.search);
const recherchAnalyse = document.querySelector("#recherch-analyse");
console.log(urlParams);
const prevInput = urlParams.get("query");
// const affUser = document.querySelector("#aff-user");
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
            `https://api.github.com/users/${inputName}/repos`, {
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



        ajShort.addEventListener("click", async () => {
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
            };

            try {
                const developers = await afichCandidat();
                if (developers.find(dev => dev.login === nvuser.login)) {
                    messageBtn.textContent = "Ce développeur est déjà dans la shortlist !";
                    return;
                }
                await ajoutCandidat(nvuser);
                messageBtn.textContent = "Ajouté à la shortlist ✔";
            } catch (e) {
                console.error(e);
                messageBtn.textContent = "Erreur, réessayez.";
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







