/**
 * Class représentant la matrice de contour
 * 
 * Explication :
 * 
 * @author Sport Track
 */
class ContoursObjets {
    //ATTRIBUTS et CONSTRUCTEUR
    /**
     * Constructeur de l'objet ContoursObjets.
     *
     * @param {} uneContoursObjets - Matrice de contour.
     */
    constructor(uneContoursObjets) {
        this.ContoursObjets = uneContoursObjets;
        // ENCAPSULATION
    };

    //Fonction qui modifie l'attribut uneContoursObjets
    /**
     * Modifie la matrice de contours.
     * @param {} uneContoursObjets - Matrice de contour.
     * 
     */
    setContoursObjets(uneContoursObjets) {
        this.ContoursObjets = uneContoursObjets;
    };

    //Fonction qui retourne l'attribut uneContoursObjets
    /**
     * Retourne la matrice de contours.
     *
     * @return {} Matrice de contour.
     */
    getContoursObjets() {
        return this.ContoursObjets;
    };
    // METHODES SPECIFIQUES
};