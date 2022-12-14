//Classe Licence 

class Licence {
    //Constructeur de l'objet Licence
    constructor(l="") {
      this.numLicence = l;
    }
    //Encapsulation
    //Fonction qui retourne l'attribut numLicence
    getNumLicence(){
        return this.numLicence;
    }
    setNumLicence(l=""){
        this.numLicence=l;
    }

  }