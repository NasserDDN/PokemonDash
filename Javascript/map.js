import { Coordonnee } from "./coordonnees.js"

export class Map 
{


    #grille;
    #playerCoord;
    #mapLetter;
    #diamondTotal;
    #diamondCount;
    #nbDeplacements;
    #mapString;
    
    

    constructor(mapLetter)
    {
        this.#diamondTotal = 0;
        this.#diamondCount = 0;
        this.#nbDeplacements = 0;
        this.#mapString = "";
        this.#mapLetter = mapLetter;
        this.NewGame(this.#mapLetter);
        this.#mapString = this.MapString(this.#grille);
        
        
        
        
        

    }

    NewGame(mapLetter){

        this.#grille = [];
        let i = 0;
        

        for(let iLigne = 0; iLigne < 16 ; iLigne++){

            let ligne = [];

            for(let iColonne = 0; iColonne < 32 ; iColonne++){

                ligne.push(mapLetter[i]);

                //Compter le total de diamants
                if(ligne[iColonne] == "D"){
                    this.#diamondTotal++;
                }


                //Définir les coordonées de l'objet player
                if(mapLetter[i] == "P"){
                    this.#playerCoord = new Coordonnee({x:iColonne, y: iLigne});
                    

                }

                i++;
            }

            this.#grille.push(ligne);
        }

        console.log(this.#grille);

        console.log(this.diamondTotal);
        
        
        
        


    }

    //Fonction qui renvoie un string à partir d'un tableau de lettres
    MapString(tabLettres){
        let chaine = "";
        tabLettres.map((ligne, iLigne) =>{

            ligne.map((cell, iCell) =>{
                

            });
            chaine += ligne.toString();
        });

        
        return chaine;

    }

    get mapString(){return this.#mapString}

    //Remplace la grille par la grille d'origine
    set grille(grilleAtStart){
        grilleAtStart.map((ligne, iLigne) =>{

            ligne.map((cell, iCell) =>{
                this.#grille[iLigne].splice(iCell, 1, grilleAtStart[iLigne][iCell]);
                

            });


        });
    }

    
    
    get playerCoord(){return this.#playerCoord}

    get grille(){return this.#grille}

    set diamondTotal(diamondTotal){this.#diamondTotal = diamondTotal}

    get diamondTotal(){return this.#diamondTotal}

    set diamondCount(diamondCount){this.#diamondCount = diamondCount;}

    get diamondCount(){return this.#diamondCount}

    set nbDeplacements(nbDeplacements){this.#nbDeplacements = nbDeplacements;}

    get nbDeplacements(){return this.#nbDeplacements}

    
    
}