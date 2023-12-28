

import { VueJeu } from "./Vue/VueJeu.js";
import { ControleurJeu } from "./Controleur/ControleurJeu.js";



export class Application {

    #vueJeu;
    #controleurJeu;
    

    constructor(mapLetter)
    {
        //Création Vue et Controleur
            this.#controleurJeu = new ControleurJeu(mapLetter);
            this.#vueJeu = new VueJeu(this.#controleurJeu);
            
         
    }

    //Getters
    get controleurJeu(){return this.#controleurJeu}

    get vueJeu(){return this.#vueJeu}
}