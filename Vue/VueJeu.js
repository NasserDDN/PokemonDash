
import { Player } from "../Javascript/player.js";
import { Coordonnee } from "../Javascript/coordonnees.js"





export class VueJeu{

    
    #mapJeu;    //Objet map
    

    #player;        //Objet player

    #boolNewGame;   //Booléen pour savoir si la partie vient d'etre lancée ou non 
                    //Aide pour la suppression du menu

    #controleJeu;   //Objet controleur

    #resumeGame;    //Objet ResumeGame pour reprendre la partie en cliquant sur "Resume Game" dans le menu

    constructor(controlJeu)
    {
        this.#controleJeu = controlJeu;
        this.#player = this.#controleJeu.player;
        

        this.#boolNewGame = true;

        this.AfficheBoutons();
        this.AfficherJeu(this.#boolNewGame);
        this.CheckMouv();
        this.EraseMenu();

        

    }

    //Fonction pour l'affichage des boutons retour au menu et recommencer
    AfficheBoutons(){

        //Création des éléments du 1er menu
        const bodyH = document.querySelector("body");
        const divMenu = document.createElement("div");
        const button = document.createElement("button");
        const button2 = document.createElement("button");
        
        button.classList.add("smallButton");
        button.setAttribute("id", "retourMenu");
        button.innerText = "Menu";

        button2.classList.add("smallButton");
        button2.setAttribute("id", "recommencer");
        button2.innerText = "Recommencer";

        divMenu.appendChild(button);
        divMenu.appendChild(button2);
        divMenu.setAttribute("id", "smallMenu");
        divMenu.style.display = "flex";
        divMenu.style.flexDirection = "row";
        divMenu.style.width = "40%";
        divMenu.style.margin = "50px";


        //Création des éléments du menu secondaire (menu de vérification)
        const textVerif = document.createElement("h2");
        const textVerif2 = document.createElement("h2");

        textVerif.innerText = "Voulez vous vraiment retourner au menu ? (Cela sauvegardera votre partie)"
        textVerif2.innerText = "Voulez vous vraiment recommencer le niveau ?"
        const oui = document.createElement("button");
        const non = document.createElement("button");

        oui.innerText = "Oui";
        non.innerText = "Non";
        oui.classList.add("smallButton");
        non.classList.add("smallButton");

        bodyH.appendChild(divMenu);


         //Event bouton menu
         button.addEventListener("click", event =>{
            
            //Suppression bouton "retour au menu" et "recommencer"
            divMenu.removeChild(button);
            divMenu.removeChild(button2);

            //Nouveau menu "Oui ou Non"
            divMenu.appendChild(textVerif);
            divMenu.appendChild(oui);
            divMenu.appendChild(non);
            divMenu.style.flexDirection = "column";
            
            //Oui
            divMenu.childNodes[1].addEventListener("click", event =>{
                
                

                //Conserve les données actuelles dans localStorage pour reprendre la partie plus tard
                localStorage.setItem("mapSave", this.#controleJeu.map.MapString(this.#mapJeu.grille));
                localStorage.setItem("mapSaveDiamondTotal", this.#controleJeu.map.diamondTotal );
                localStorage.setItem("mapSaveDeplacements", this.#controleJeu.map.nbDeplacements);
                localStorage.setItem("mapSaveDiamondCount", this.#controleJeu.map.diamondCount);
                localStorage.setItem("mapSaveAtStart", this.#controleJeu.mapAtStart.MapString(this.#controleJeu.mapAtStart.grille));

                //Retour à la page d'accueil
                window.location.href = "Accueil.html";
                

            });
            

            //Non
            divMenu.childNodes[2].addEventListener("click", event =>{
                
                //Suppression du menu pour la création du prochain
                document.querySelector("body").removeChild(document.getElementById("smallMenu"));

                //Fonction qui affiche à nouveau les boutons "retour au menu" et "recommencer"
                this.AfficheBoutons();

                //On met à jour la map (Juste pour l'affichage des éléments de la page dans l'odre)
                this.AfficherJeu();

                
            });



        });

        //Event bouton recommencer
        button2.addEventListener("click", event =>{

            //Nouveau menu "Oui ou Non"
            divMenu.removeChild(button);
            divMenu.removeChild(button2);
            divMenu.appendChild(textVerif2);
            divMenu.appendChild(oui);
            divMenu.appendChild(non);
            divMenu.style.flexDirection = "column";


            //Oui
            divMenu.childNodes[1].addEventListener("click", event =>{
                
                //On indique au controlleur de restart la game
                this.#controleJeu.RestartGame();

                //Suppression du menu pour la création du prochain
                document.querySelector("body").removeChild(document.getElementById("smallMenu"));

                //Fonction qui affiche à nouveau les boutons "retour au menu" et "recommencer"
                this.AfficheBoutons();

                //On met à jour la map (Juste pour l'affichage des éléments de la page dans l'odre)
                this.AfficherJeu();
                

            });

            //Non
            divMenu.childNodes[2].addEventListener("click", event =>{
                
                //Suppression du menu
                document.querySelector("body").removeChild(document.getElementById("smallMenu"));

                //Fonction qui affiche à nouveau les boutons "retour au menu" et "recommencer"
                this.AfficheBoutons();

                //On met à jour la map (Juste pour l'affichage des éléments de la page dans l'odre)
                this.AfficherJeu();
                
            });

            
        });

        
    }

    

    //Supprime l'interface au lancement de la partie
    EraseMenu(){

        const bodyH = document.querySelector("body");

        bodyH.removeChild(document.querySelector("div"));

        bodyH.style.display = "flex";
        bodyH.style.alignItems = "center";

    }

    
    //Fonction qui affiche la page de jeu (MAJ de la map)
    AfficherJeu(boolNewGame){

        
        //Suppresion de la précédente map pour la rafraichir
        if(this.#boolNewGame == false){

            document.querySelector("body").removeChild(document.querySelector("map"));
            document.querySelector("body").removeChild(document.getElementById("score"));
        }

        
            //Mise à jour de l'objet player
            this.#player = this.#controleJeu.player;

            //Mise à jour de la map
            this.#mapJeu = this.#controleJeu.map;

            //Création de la division pour le score
            const divScore = document.createElement("div");
            divScore.setAttribute("id","score");
            divScore.textContent = `${this.#mapJeu.diamondCount} / ${this.#mapJeu.diamondTotal} Pokéballs Nombre déplacements : ${this.#mapJeu.nbDeplacements}`;
            document.querySelector("body").appendChild(divScore);

            //Création de la map dans laquelle il y aura les divs
            document.querySelector("body").appendChild(document.createElement("map"));

            const jeuHTML=document.querySelector("map");
            jeuHTML.style.width = "960px"   //32*30
            jeuHTML.style.height = "480px"    //16*30  
            jeuHTML.style.backgroundImage = "url(Sprites/background.gif)";
            jeuHTML.style.marginBottom = "60px"

            //Const des coordonnées du player
            const playerX = this.#player.coordonnees.x;
            const playerY = this.#player.coordonnees.y;

            


            //Parcours de la grille pour mettre à jour les div
            this.#mapJeu.grille.map((ligne, iLigne) =>{
        
                const ligneHTML = document.createElement("div");
                ligneHTML.classList.add("ligne");

        
                ligne.map((cell, iCell) => {

                    const div = document.createElement("div");
            
            
            
                    //Efface le joueur si gameOver
                    if(cell == "P" && this.#controleJeu.gameover == true){
                        div.classList.add("V");
                        
                    }

                    else div.classList.add(cell);

                    ligneHTML.appendChild(div);
                });
        
                jeuHTML.appendChild(ligneHTML);

            });

    
            this.#boolNewGame = false;

        //Si le player meurt on appelle la fonction EndGame avec du délai
        if(this.#controleJeu.gameover == true || this.#controleJeu.win == true){

           const timeout = setTimeout(event=> {
               this.EndGame();
           } , 1500);
           
           
        }

    }

//Check les inputs de l'utilisateur
CheckMouv(){

        const button = document.getElementById("retourMenu");
        const button2 = document.getElementById("recommencer");
        const divMenu = document.getElementById("smallMenu");
        

        //Event Keyboard
        window.addEventListener('keydown', event => {

            //Le joueur ne peut plus bouger quand la partie est finie (pour éviter les erreurs console)
            if(this.#controleJeu.gameover == true || this.#controleJeu.win == true){

                console.log("mouvement impossible");
            
            
            }

            else {
                this.#controleJeu.CheckMouv(event.key);
                this.AfficherJeu();
            }

            

        });
    
    }



EndGame(){

    //Suppresion des éléments de jeu
    document.querySelector("body").removeChild(document.getElementById("score"));
    document.querySelector("body").removeChild(document.querySelector("map"));
    document.querySelector("body").removeChild(document.querySelector("div"));

    //Création de l'interface de gameover
    const divEndGame = document.createElement("div");
    const result = document.createElement("h2");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    if(this.#controleJeu.gameover == true){
        result.innerText = "Game Over";
    }
    else result.innerText = "Partie gagnée !!"
    document.querySelector("body").appendChild(result);
    
    button1.innerText = "Rejouer";
    button1.setAttribute("id","buttonRestart")
    button1.classList.add("button");
    
    button2.setAttribute("id","buttonMenu")
    button2.classList.add("button");
    button2.innerText = "Menu";

    divEndGame.appendChild(result);
    divEndGame.appendChild(button1);
    divEndGame.appendChild(button2);

    document.querySelector("body").appendChild(divEndGame);


    
    //EventListener sur les boutons "Rejouer" et "Menu"
    //Rejour
    document.getElementById("buttonRestart").addEventListener("click", event =>{

        this.#boolNewGame = true;
        this.#controleJeu.RestartGame();

        //Remove du gameover
        document.querySelector("body").removeChild(document.querySelector("div"));

        this.#controleJeu.gameover = false;
        this.#controleJeu.win = false;
        console.log(this.#player.coordonnees);
        this.AfficheBoutons();
        this.AfficherJeu();



    });

    //Retour au menu
    document.getElementById("buttonMenu").addEventListener("click", event =>{
        document.location.href = "Accueil.html";
        
    });
    
}


}






