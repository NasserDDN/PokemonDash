import { Application } from "./../application.js";


class ImportLevel{

    constructor(){

        this.ImportFile();
        
    }

    ImportFile(){

        //Création de l'input pour sélectionner le fichier
        const inputText = document.createElement("input");
        const label = document.createElement("label");

        inputText.setAttribute("type", "file");
        inputText.setAttribute("id", "avatar");
        inputText.setAttribute("name", "avatar");
        inputText.setAttribute("accept", ".txt");

        label.innerText = "Choississez un fichier txt pour générer une map";

        const div = document.createElement("div");
        div.appendChild(label);
        div.appendChild(inputText);

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";

        document.querySelector("body").appendChild(div);


        //Variable qui permet de lire le fichier sélectionné
        var fichier = new FileReader();

        var mapLetter = [];

        //Declenchement de l'event lors qu'un fichier va être sélectionné
        inputText.addEventListener("change", event => {

            
            //Conversion du contenu du fichier en chaine de caractères
            fichier.readAsText(event.target.files[0]);

            //Gestion du contenu du fichier lorsque le fichier a été chargé
            fichier.addEventListener("load", event => {

                //1 caractère par case du tableau
                mapLetter = fichier.result.split("");
            
                //Parcourir le tableau de lettres
                mapLetter.map((cell, iCell) =>{


                    //Supprimer les caractères de retour à la ligne s'il y en a
                    if(cell == "\r" ){
                        mapLetter.splice(iCell, 1);
                        iCell --;
                    
                    }

            
                });

                //Besoin de parcourir 2 fois le tableau car il y a plusieurs types de caractères de retour à la ligne
                mapLetter.map((cell, iCell) =>{


                    //Supprimer les caractères de retour à la ligne s'il y en a
                    if(cell == "\n" ){
                        mapLetter.splice(iCell, 1);
                        iCell --;
                    
                    }


                });

                
                //Verification du nombre de level actuel pour attribuer le bon nom au nouveau niveau
                let nbNiveau = parseInt(localStorage.getItem("nbNiveaux"));
                             
                //Création du level dans localStorage
                localStorage.setItem(`level${nbNiveau + 1}`, mapLetter.toString());

                //Petit message avant de retourner au menu
                let message = document.createElement("h2");
                message.innerText = "Map importée";
                document.querySelector("body").removeChild(document.querySelector("div"));
                document.querySelector("body").appendChild(message);


                //Retour au menu avec un timeout
                const timeout = setTimeout(event =>{

                    window.location.href = "Accueil.html";

                },2000);

            });


        });

   
    }
}

new ImportLevel();




















