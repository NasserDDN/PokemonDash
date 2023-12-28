

export class Coordonnee
{
    //Abscisse
    #x; 
    
    //Ordonnée
    #y;

    
    constructor(coordonnee)
    {
        this.#x = coordonnee.x;
        this.#y = coordonnee.y;
    }


    //Getters et Setters
    set x(value) { this.#x = value; }
    get x() { return this.#x;}

    set y(value) { this.#y = value; }
    get y() { return this.#y;}
}