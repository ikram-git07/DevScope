const urlParams = new URLSearchParams(window.location.search);
const recherchAnalyse = document.querySelector("#recherch-analyse");
console.log(urlParams);
const prevInput = urlParams.get("query");




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
            `https://api.github.com/users/${inputName}/repos`
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
        console.log(fetchRepo)

        console.log(response)
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
