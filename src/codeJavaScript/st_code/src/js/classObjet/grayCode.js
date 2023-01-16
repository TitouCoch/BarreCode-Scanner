//Classe GrayCode 
/**
 * Classe représentant un code Gray code.
 *
 * Explication : Le Gray code est un code binaire utilisé pour éviter les variations brusques dans les signaux numériques.
 *
 * @author Sport Track
 */
class GrayCode {
    //Constructeur de l'objet Licence
    /**
     * Constructeur de l'objet GrayCode.
     *
     * @param {string} g - Gray code.
     */
    constructor(g) {
      this.graycode = g;
    }

    //Encapsulation
    //Fonction qui retourne l'attribut numLicence
    /**
     * Retourne le Gray code.
     *
     * @return {string} Gray code.
     */
    getGraycode(){
        return this.graycode;
    }

    /**
     * Modifie le Gray code.
     *
     * @param {string} g - Nouveau Gray code.
     */
    setGraycode(g){
        this.graycode=g;
    }

  }