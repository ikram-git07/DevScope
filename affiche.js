import { afichCandidat } from "./config.js";

const container = document.querySelector("#shortlist-container");
const compteur = document.querySelector("#nombre-candidats");

function shortlist(users) {
    container.innerHTML = "";
    compteur.textContent = users.length;

    users.forEach(user => {
        container.innerHTML += `
        <div class="bg-white border border-green-800 rounded-2xl p-6 shadow-md">
            <div class="flex items-center gap-5">
                <img src="${user.avatar_url}" alt="Avatar"
                     class="w-16 h-16 rounded-full border-4 border-slate-500 object-cover">
                <div>
                    <h3 class="text-lg font-bold">${user.name}</h3>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-500 text-sm">@${user.login}</span>
                        <span class="text-cyan-700 bg-cyan-100 border border-cyan-300 rounded-lg px-2 py-1 text-xs font-bold">
                            ${user.language || "Non précisé"}
                        </span>
                    </div>
                    <p class="text-cyan-700 italic mt-2">${user.note || "Aucune note"}</p>
                    <p class="text-gray-500 text-sm mt-2">
                        Ajouté le ${new Date(user.created_at).toLocaleDateString("fr-FR")}
                    </p>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-3 mt-5">
                <div class="text-lime-500 text-2xl tracking-wider">${"★".repeat(user.rating || 0)}</div>
                <button class="text-rose-500 border border-rose-500 rounded-lg px-4 py-2 font-bold hover:bg-rose-500/10">● REFUSÉ</button>
                <button class="text-cyan-700 border border-cyan-700 rounded-lg px-4 py-2 font-bold hover:bg-cyan-500/10">✎ Modifier</button>
                <button class="text-rose-500 border border-rose-800 rounded-lg px-4 py-2 font-bold hover:bg-rose-500/10">✕ Supprimer</button>
            </div>
        </div>`;
    });
}

async function init() {
    try {
        const candidats = await afichCandidat();
        shortlist(candidats);
    } catch (e) {
        console.error(e);
        container.innerHTML = `<p class="text-rose-600">Impossible de charger la shortlist.</p>`;
    }
}

init();

