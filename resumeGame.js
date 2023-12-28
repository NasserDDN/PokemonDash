import { Application } from "./../application.js";
import { Map } from "./Javascript/map.js"

export class ResumeGame{

    #mapLetter;

    #application;

    #mapAtStart;

    

    constructor()
    {   
        

        //Remplissage du tableau avec la chaine de caractère sauvegardée dans localStorage
        this.#mapLetter = this.MapStringToArray(localStorage.getItem("mapSave"));

        //Nouvelle partie avec la map sauvegardée
        this.#application = new Application(this.#mapLetter);

        //Mise à jour du nombre de diamants, de déplacements
        this.#application.controleurJeu.map.diamondTotal = parseInt(localStorage.getItem("mapSaveDiamondTotal"));
        this.#application.controleurJeu.map.diamondCount = parseInt(localStorage.getItem("mapSaveDiamondCount"));
        this.#application.controleurJeu.map.nbDeplacements = parseInt(localStorage.getItem("mapSaveDeplacements"));

        //La map de départ est aussi récupérée
        this.#mapAtStart = this.MapStringToArray(localStorage.getItem("mapSaveAtStart"));

        //On redéfinit la map de départ pour pouvoir recommencer depuis le tout début de la map
        this.#application.controleurJeu.mapAtStart = new Map(this.MapStringToArray(localStorage.getItem("mapSaveAtStart")));

        //Mise à jour de la map pour prendre en compte les changements précédents
        this.#application.vueJeu.AfficherJeu(true);
    }

    //Fonction qui transforme le String sauvegardé dans localStorage en Array
    MapStringToArray(mapString){

        let mapLetter = [];
        let k = 0;

        //Suppresion des caracteres "," qui se sont créé lors de la conversion de l'Array en String
        mapString = mapString.replace(/,/g, '');
        
        //On crée notre nouvelle grille à partir de la chaine de caractères
        for(let i = 0; i < mapString.length ; i++){

            
            mapLetter.push(mapString.charAt(k));
            k++;
                
           
        }

        return mapLetter;

        

    }

    


}

document.getElementById("button2").addEventListener("click", event =>{

    new ResumeGame();
})