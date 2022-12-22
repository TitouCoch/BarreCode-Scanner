//Classe Licence 
/**
 * Classe représentant une licence.
 *
 * Une licence est caractérisée par une chaine de chiffre et de caractère, exemple "Ax67De6t54".
 *
 * @author Sport Track
 */
class Licence {
    //Constructeur de l'objet Licence
    /**
     * Constructeur de l'objet Licence.
     *
     * @param {string} l - Numéro de la licence. Valeur par défaut : chaine vide.
     */
    constructor(l="") {
      this.numLicence = l;
    }
    
    //Encapsulation
    /**
     * Getter qui retourne le numéro de la licence.
     *
     * @return {string} Numéro de la licence.
     */
    getNumLicence(){
        return this.numLicence;
    }
    /**
     * 
     * Modifie le numéro de la licence.
     *
     * @param {string} l - Nouveau numéro de la licence. Valeur par défaut : chaine vide.
     */
    setNumLicence(l=""){
        this.numLicence=l;
    }

  }