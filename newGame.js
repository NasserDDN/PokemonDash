import { Application } from "./../application.js";

export class NewGame{

    #application;

    #buttonLevel;

    #nbNiveau;

    constructor()
    {
        
        //Initialisation du nombre de niveaux dans localStorage
        localStorage.setItem("nbNiveaux", 0);

        this.#buttonLevel = document.getElementsByClassName("button");

        //Nombre de niveaux = 3
        this.#nbNiveau = this.#buttonLevel.length;

        //On modifie le nombre de niveaux dans localStorage
        localStorage.setItem("nbNiveaux", this.#nbNiveau);

        

        this.VerifNbLevel();
        this.CheckClick();
        

    }

    //On vérifie si il y a des nouveaux niveaux importés dans localStorage
    VerifNbLevel(){

        for(let i = 4 ; i < 10 ; i++){

            if(!localStorage.getItem(`level${i}`)){
                
            }
            //Si le niveau est présent
            else{
                //Création d'un nouveau bouton
                let button = document.createElement("button");
                button.setAttribute("id", `level${i}`);
                button.classList.add("button");
                button.innerText = `level${i} (importé)`;

                document.querySelector("#levelChoice").appendChild(button);
                
                //Le nombre de niveaux augmente de +1
                this.#nbNiveau++;
                localStorage.setItem("nbNiveaux", this.#nbNiveau);
            }
        }

    }

    //Vérifie sur quel bouton appuie l'utilisateur
    CheckClick(){
        

        
        
        for(let i = 0 ; i < this.#nbNiveau ; i++){

            //Event Listener sur tous les boutons
            this.#buttonLevel[i].addEventListener('click', event =>{

                
                this.LaunchGame(this.#buttonLevel[i]);
        
            });
        }

    }

    
    
    LaunchGame(choice){

        //Récupération de la chaine de caractères de la map choisie par l'utilisateur
        let mapString = localStorage.getItem(`${choice.getAttribute("id")}`);

        let mapLetter = [];
        let k = 0;

        //Suppresion des caracteres "," qui se sont créé lors de la conversion de l'Array en String
        mapString = mapString.replace(/,/g, '');
        
        //On crée notre nouvelle grille à partir de la chaine de caractères
        for(let i = 0; i < mapString.length ; i++){

            
            mapLetter.push(mapString.charAt(k));
            k++;
                
           
        }

        

        //Début de la partie
        this.#application = new Application(mapLetter);
        
        


        
    }

}
    
    
//Setup des maps
localStorage.setItem("level1", "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTDTTPTTRTVTVTRTTRTTRTTTVRVTTTRTTVRTTTVTTTTTTRDRTTVTTTTTTTTTTTTTRTTTTTTTTVTTTTRTTTTTVTTTTRTTTTTDTTTTTTTTVRVTRTTTRTTVTVTVTTTTTRTVTRTMMMMMMMMMMMMMMMMMMMMMMMMMRRRRRRTTRRTTTTTRTVTTTTTTRTTTTRRTTTTTTTTRRDRRTVTVTTTTVVRVVTTTTTTRTTRTTTTDRTTTTVTTTTRTTTVTRTTTTVTTRTTTTTTTTTRTTTTVTTTTTTTTTRRTTRRTTTTRRRRRRTTTTMMMMMMMMMMMMMMMMMMMMMMMMMMTTTTTTTRTRTRTRTTTTTTVTTTTTTVTTRDTTTTTTTTTTTTTTTTTTRTTTTTTTTTTTTRTTTTTTTVTTTRRTTTTTTTTTTTTTVTTTTTTTVTTTVRRTRTTTTTTTVTTTTTTRTTTTTRVTTTTTTTTTTTTVRTTTTVTTTTVTVTTTTD");
localStorage.setItem("level2", "RRTTRRRMTTTRTTTTTRTTTTTMTTTTTTRDTPTTRTDMTTTVTTTTVTTTRRTMTTRTTRTMTTTTTTVMRRRTTRTTMTTTVTTMRRTTTTTMVRTRRRRMRTTTTTRTMTRRTTTMTTRTTRTMTTTRTTTMTRTTRTTTMTVTTRTMTTTTVTTMRRTTTRTMTTRRRTTTMTTRTTTMTTTTTVTMTTTTVRTMTTRRRTTTMTTTTTVMTTTTRTTMRTRTRTRMTTRDRTTTMRRTTTTMTTTTTTTMTTTTTTTMTTTRTTTTMTTTVTTMTTTTTTTMTTTTVTTMTTTRTTVTMTTTVRRMRTRVTTTMTTTTRTTMTVTTTTTTMRTVTTRMRDRTTTTMTVTTTTTMTRRRTTTRMTTTTTRMRRRTTTTMTTTTTTRMRTRTRTRTMTTTTTDMTTTTTTTMTTTRTTRMTTRTTRRTMTTTTRTTTTVTTRTMTVTTTRDTTVTTTVRTMTTTRTTTTTTTTTTMTTTTTRVTTTTTTTTTMTTTTRTTTTVTTTTM");
localStorage.setItem("level3", "RRTTTTRTMTTTTTTTTTTTTTTTTTTTTTTTTPTTTTRRTTTRTTRDTTRTTTTTRTTRTTTTRRRTTTRRMTTTRTTRTTRRRRTTTTTRTVTVTDTTTTTTMTTTRTRDTTRTVVTTTTVRDTTTMRMMMMMMMTRRTTRRTTMMMMMMMMMMMMMMDTTTTTTTTTTTVTTTTVTTTTTTTTTTTRRRMMMMMMMMMMMMMMMMMMMMMMMMMMMMTTTDTTTTTTVTTTTTRTRTTTTTTTTTTTTTTTRVTTTDTTRTTTVTTTTTRTTTTTTTDTTTTTTTTVTVTVTTVVTTVVVTVVTTTVVVTTTVVVTTMMMMMMMMMMMMMMVMMMMMMMMMMMMMMMMMMTTVTTVRVVVTTVTTTRRVVTTTVRRVTTRMMTVVTVVTTVVTVVTVVTVTTVVTVTTRVTTMMVVTTDVTRTTVVRTRTTRRRTTVTVVTVVTMMTRRVVTRVVRRVRTRTTRRRTVVVTVTTVTMMMMMMMMMMMMMMMMDMMMMMMMMMMMMMMMM");
        

new NewGame();





