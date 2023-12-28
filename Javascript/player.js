import { Coordonnee } from "./coordonnees.js"

export class Player
{

    #coordonnees

    constructor(coordonnees)
    {

        this.#coordonnees = new Coordonnee(coordonnees);
        this.#coordonnees.x = coordonnees.x;
        this.#coordonnees.y = coordonnees.y;

        
        
    }

   

    set coordonnees(coordonnees)
    {

        this.#coordonnees.x = coordonnees.x;
        this.#coordonnees.y = coordonnees.y;
        
    }

    get coordonnees(){

        return this.#coordonnees;

    }

    //Reset des coordonnées de l'objet player lors du gameOver
    ResetPosPlayer(grille){
        grille.map((ligne, iLigne) =>{

            ligne.map((cell, iCell) =>{
                if(cell == "P"){
                    this.coordonnees = {x : iCell, y : iLigne};
                }
                

            });


        });
        
    }
}