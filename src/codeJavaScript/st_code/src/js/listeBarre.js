//Classe ListeBarre 

class ListeBarre {
    //Constructeur de l'objet Licence
    constructor(l="") {
      this.listeBarre = l;
    }

    //Encapsulation
    //Fonction qui retourne l'attribut numLicence
    getListeBarre(){
        return this.listeBarre;
    }
    setListeBarre(l=""){
        this.listeBarre=l;
    }

  }