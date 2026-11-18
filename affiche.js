import { afichCandidat } from "./config"

const candidats =await afichCandidat()



function shortlist(candidats) {
    affUser.innerHTML = `<div class="flex items-center gap-5">
            <img
                src="avatar.jpg"
                alt="Avatar"
                class="w-16 h-16 rounded-full border-4 border-slate-500 object-cover"
            >

            <div>
                <h3 class=" text-lg font-bold">
                 
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