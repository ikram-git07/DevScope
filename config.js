//  export const API_URL = "https://mockapi.io/projects/6af9bb956d8b86fb22d731a1#";

// export async function ajoutCandidat(candidat) {
//     try {
//         const response = await fetch("https://6af9bb956d8b86fb22d731a0.mockapi.io/api/v1/candidats", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(candidat)
//         });

//         if (!response.ok) {
//             throw new Error(`Erreur HTTP : ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Candidat ajouté :", data);
//         return data;
//     } catch (e) {
//         console.log("Erreur :", e.message);
//     }
// }


// export async function afichCandidat() {
//     try {
//         const response = await fetch("https://6af9bb956d8b86fb22d731a0.mockapi.io/api/v1/candidats");

//         if (!response.ok) {
//             throw new Error(`Erreur HTTP : ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Candidat ajouté :", data);
//         return data;
//     } catch (e) {
//         console.log("Erreur :", e.message);
//     }
// }



const API_URL = "https://6af9bb956d8b86fb22d731a0.mockapi.io/api/v1/candidats";

export async function afichCandidat() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    return await response.json();
}

export async function ajoutCandidat(candidat) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidat)
    });
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    return await response.json();
}

