const urlParams = new URLSearchParams(window.location.search);
const recherchAnalyse = document.querySelector("#recherch-analyse");
console.log(urlParams);
const prevInput = urlParams.get("query");




recherchAnalyse.value = prevInput;

// recherche
async function fetchData(inputName) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${inputName}`,

           
        );
        const fetchRepo = await fetch(
            `https://api.github.com/users/${inputName}/repos`
        )


        if (!response.ok) {
            throw new error(
                `GitHub API error: ${response.status} ${response.statusText}`
            );
        }
        if (!fetchRepo.ok) {
            throw new error(
                console.log(fetchRepo.status)
            )
        }
        const data = await response.json();
        const repos = await fetchRepo.json();

        console.log(repos)


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
        document.querySelector("#local").textContent = data.location;

    } catch (e) {
        console.error("Failed to fetch profile:", e.message);
        return null; // Return a fallback value so the app doesn't crash
    }
}
fetchData(prevInput);