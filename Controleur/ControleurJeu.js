import { Map } from "./../Javascript/map.js";
import { Player } from "./../Javascript/player.js";




export class ControleurJeu {

    #map;           //Objet map
    #mapAtStart     //2e objet map pour remettre la map à 0 lorsque l'on recommence la partie apres game over
    #player;        //Objet player
    

    #win;           //Booléens pour afficher "Game Over" ou "Win"
    #gameOver;      
    

    constructor(mapLetter)
    {
        //Création de la map
        this.#map = new Map(mapLetter);

        //Création de la map à t=0 qui ne sera pas modifié lors de la partie
        this.#mapAtStart = new Map(mapLetter);

        this.#player = new Player(this.#map.playerCoord);

        this.#gameOver = false;
        this.#win = false;
        
        
    }

    //Setters et Getters
    get map(){return this.#map;}

    get mapAtStart(){return this.#mapAtStart}

    get player(){return this.#player;}

    set gameover(bool){this.#gameOver = bool}

    get gameover(){return this.#gameOver}

    get win(){return this.#win}

    set win(bool){this.#win = bool}

    set mapAtStart(mapAtStart){this.#mapAtStart = mapAtStart}


    //Remettre la map à 0 et reset la position de notre objet player
    //Partie gagnée ou game over
    RestartGame(){
        
        this.#map.grille = this.#mapAtStart.grille;
        this.#player.ResetPosPlayer(this.#map.grille);
        this.#map.diamondCount = 0;
        this.#map.nbDeplacements = 0;
        
         
    }

    //Fonction appelée lorsque Z, Q, S ou D sont préssées
    CheckMouv(eventkey){

        
          
          
  
        switch(eventkey) {
  
            //Utilisateur appuie sur Z
            case "z" : 

            //On empeche le joueur de sortir de la map si il n'y a pas de mur
                if(this.#player.coordonnees.y == 0){

                    this.#player.coordonnees = {x: this.#player.coordonnees.x , y: this.#player.coordonnees.y};
  
                }  

                //Vérifier que le joueur peut se déplacer dans cette direction
                else if(this.Possible(eventkey) == true ){

                this.#player.coordonnees = {x: this.#player.coordonnees.x , y: this.#player.coordonnees.y - 1};
                
                //Fonction qui modifie les autres éléments de la map autour du joueur en fonction de la touche pressée
                this.Mouvement("z");

                //Nombre de déplacements sur le tableau des scores
                this.#map.nbDeplacements++;

              
              
            } ;
            
            break ;
  
            //Utilisateur appuie sur Q
              case "q" : 

              

                if(this.#player.coordonnees.x == 0){

                    this.#player.coordonnees = {x: this.#player.coordonnees.x , y: this.#player.coordonnees.y};
  
                }

                else if(this.Possible(eventkey)==true){
                this.#player.coordonnees = {x: this.#player.coordonnees.x - 1 , y: this.#player.coordonnees.y} ;

                this.Mouvement("q");
                this.#map.nbDeplacements++;
              
            };

            break ;
  
            //Utilisateur appuie sur S
              case "s" : 

              

                if(this.#player.coordonnees.y == 15){

                    this.#player.coordonnees = {x: this.#player.coordonnees.x , y: this.#player.coordonnees.y};
  
                }

                else if(this.Possible(eventkey)==true){
                this.#player.coordonnees = {x: this.#player.coordonnees.x , y: this.#player.coordonnees.y + 1} ;

                this.Mouvement("s");
                this.#map.nbDeplacements++;
              
              
            };

            break ;

            //Utilisateur appuie sur D
              case "d" :
                

                    

                if(this.#player.coordonnees.x == 31){

                    this.#player.coordonnees = {x: this.#player.coordonnees.x , y: this.#player.coordonnees.y};
      
                }

                    else if(this.Possible(eventkey) == true){
                    this.#player.coordonnees = {x: this.#player.coordonnees.x + 1 , y: this.#player.coordonnees.y} ;

                    this.Mouvement("d");
                    this.#map.nbDeplacements++;

                    
                    };

                    break ;
        }
    }

   //Fonction qui vérifie les possibilités de mouvement face aux murs et aux rochers
   Possible(eventkey){

    var checkBool;

    //Parcours de la map
    this.#map.grille.map((ligne, iLigne) =>{

        ligne.map((cell, iCell) =>{

           
            if(this.#player.coordonnees.x == iCell && this.#player.coordonnees.y == iLigne ){

                //Vérification que la case sur laquelle le joueur va se déplacer n'est pas un mur ou un rocher bloqué
                switch(eventkey){

                    case "z" : 
                    
                        if(this.map.grille[iLigne - 1][iCell] == "M"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }
                        
                        else if(this.#map.grille[iLigne - 1][iCell] == "R"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }

                        else checkBool = true;
                    break;

                    case "q" : 
                    
                        if(this.map.grille[iLigne][iCell - 1] == "M"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }

                        else if(this.#map.grille[iLigne][iCell - 1] == "R" && this.#map.grille[iLigne][iCell - 2] != "V"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }
                        else checkBool = true;
                    break;

                    case "s" : 
                    
                        if(this.map.grille[iLigne + 1][iCell] == "M"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }

                        else if(this.#map.grille[iLigne + 1][iCell] == "R"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }

                        else checkBool = true;
                    break;

                    case "d" : 
                    
                        if(this.map.grille[iLigne][iCell + 1] == "M"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }

                        else if(this.#map.grille[iLigne][iCell + 1] == "R" && this.#map.grille[iLigne][iCell + 2] != "V"){
                            checkBool = false;
                            console.log("mouvement impossible");
                        }

                        else checkBool = true;
                    break;
            
                         
            
            
                }
            }

        });

        



    });

    return checkBool;
    

}


   //Fonction qui modifie l'objet Map lorsqu'il y a un mouvement du joueur
   Mouvement(direction){

    //Une boucle pour faire tomber tous les rochers si il y en a plusieurs en vertical
    for(let k = 0 ; k < 15 ; k++){

        //Parcours de la map
        this.#map.grille.map((ligne, iLigne) =>{

            ligne.map((cell, iCell) =>{

                //Faire tomber un rocher
                if(this.#map.grille[iLigne][iCell] == "R"){
                    
                    //Si le rocher est sur la dernière ligne du tableau on ne va pas plus loin
                    if(iLigne != 15){

                        if(this.#map.grille[iLigne + 1][iCell] == "V" && iLigne == 14){

                             //Suppresion de la div rocher pour la remplacer par du vide
                             ligne.splice(iCell, 1, "V");

                             //Le rocher tombe dans les y + 1
                             this.#map.grille[iLigne + 1].splice(iCell, 1, "R");

                        }

                        
                        //Rocher qui tombe sur le player
                        else if(this.#map.grille[iLigne + 1][iCell] =="V" && this.#map.grille[iLigne + 2][iCell] =="P" ){

                        


                            //Suppresion de la div rocher pour la remplacer par du vide
                            ligne.splice(iCell, 1, "V");

                            //Le rocher tombe dans les y + 1
                            this.#map.grille[iLigne + 1].splice(iCell, 1, "R");

                        
                            //Explosion avec débris
                            for(let y = iLigne + 1 ; y <= iLigne + 3  ; y++){
                                for(let x = iCell - 1 ; x <= iCell + 1 ; x++){
                            

                                    this.#map.grille[y].splice(x , 1 , "Q");

                                }
                            }   

                        

                            //Booléen pour declencher le game over
                            this.#gameOver = true;

                            }

                    
                        
                            //Rocher qui tombe dans le vide
                            if(this.#map.grille[iLigne + 1][iCell] == "V"){
            
                            
            
                                
            
                            

                                //Suppresion de la div rocher pour la remplacer par du vide
                                ligne.splice(iCell, 1, "V");

                                //Le rocher tombe dans les y + 1
                                this.#map.grille[iLigne + 1].splice(iCell, 1, "R");

                            

              
                            }
                    
                    

                        }
                    }  
                

                

                //Suppression de l'ancienne position du player
                if(cell == "P"){
                    ligne.splice(iCell, 1, "V");
                }
                

                
                if(this.#player.coordonnees.x == iCell && this.#player.coordonnees.y == iLigne ){

                    //Player qui prend des diamants
                    if(this.#map.grille[iLigne][iCell] == "D"){
                        this.#map.diamondCount++;
                        if(this.#map.diamondCount == this.#map.diamondTotal){
                            this.#win = true;
                        }
                    }
                    
                    //Player qui déplace un rocher
                    if(this.#map.grille[iLigne][iCell] == "R"){

                     //Deplacement du rocher en fonction de la direction du player
                        switch(direction){

                            case "q" : 
                                ligne.splice(iCell - 1, 1, "R");
                            break;

                            case "d" :
                                ligne.splice(iCell + 1, 1, "R");
                            break;


                        }

                    }

                    //Modification du tableau de caractères
                    ligne.splice(iCell, 1, "P");

                    
                }

            });



        });


    }
   }

   
}









