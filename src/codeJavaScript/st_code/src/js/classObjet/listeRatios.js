//Classe Liste Ratios 
/**
 * Classe représentant les listes ratios.
 *
 * Explication : Une liste de ratios est une liste correspondant au code en graycode.
 *
 * @author Sport Track
 */
class ListeRatios {
    /**
     * Constructeur de l'objet ListeRatios.
     *
     * @param {Array[float]} uneListeRatios - Liste de ratios.
     */
    constructor(uneListeRatios) {
        this.ListeRatios = uneListeRatios;

    };
    setListeRatios(uneListeRatios) {
        this.ListeRatios = uneListeRatios;
    };
    getListeRatios() {
        return this.ListeRatios;
    };

};