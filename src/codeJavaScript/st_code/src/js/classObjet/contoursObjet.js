/**
 * Classe représentant une matrice de Contours Objets.
 *
 * Explication : Une matrice de contours objets est un tableau à trois dimension d'entien
 *
 * @author Sport Track
 */
class ContoursObjets {
    //ATTRIBUTS et CONSTRUCTEUR
    /**
     * Constructeur de l'objet ContoursObjets.
     *
     * @param {} unContoursObjets - Matrice de contour.
     */
    constructor(unContoursObjets) {
        this.leContoursObjets = unContoursObjets;
        // ENCAPSULATION
    };

    //Fonction qui modifie l'attribut uneContoursObjets
    /**
     * Modifie la matrice de contours.
     * @param {} uneContoursObjets - Matrice de contour.
     * 
     */
    setContoursObjets(unContoursObjets) {
        this.leContoursObjets = unContoursObjets;
    };

    //Fonction qui retourne l'attribut uneContoursObjets
    /**
     * Retourne la matrice de contours.
     *
     * @return {} Matrice de contour.
     */
    getContoursObjets() {
        return this.leContoursObjets;
    };
    // METHODES SPECIFIQUES
};