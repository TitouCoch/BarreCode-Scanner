class Licence {

    constructor(l="") {
      this.numLicence = l;
    }

    getNumLicence(){
        return this.numLicence;
    }

    setNumLicence(l=""){
        this.numLicence=l;
    }

    convertionGrayCode(l=""){
        //Initialisation des variables
        var licenceGrayCode=""
        //Convertion complet du numéro de licence avec traitement systématique (conversion gray code)
        for(var caracCourant=0;caracCourant<this.numLicence.length;caracCourant++){
            //Traduction du caractère courant en graycode
            licenceGrayCode+=(tableEncodageGrayCode[this.numLicence[caracCourant]]);
        }
        console.log(licenceGrayCode)
        return licenceGrayCode;
    }

    conversionBarres(licenceGrayCode){
        //Initialisation de liste barres
        var listeBarre=[]
        //Parcours complet de licenceGrayCode avec traitement systématique qui transforme 3 bits de la liste en barre
        for(var i=0;i<licenceGrayCode.length;i+=3){
            //Séparation de la liste gray code en motBinaire de 3 bits, Conversion mot binaire 3 bits en barre
            var motBinaire=[];
            //Affectation mot binaire
            for(var decalage=0;decalage<3;decalage++){
                motBinaire.push(parseInt(licenceGrayCode[i+decalage]));
            }
            //Conversion du mot binaire en taille de barre avec une recherche de première occurence
            for(var posCourante in correspGrayCodeBarre){
                if(JSON.stringify(motBinaire)===JSON.stringify(correspGrayCodeBarre[posCourante])){
                    listeBarre.push(posCourante);
                    break;
                }
            }
        }    
        return listeBarre
    }

    genererCodeBarre(){
        var licenceGreyCode = this.convertionGrayCode(this.getNumLicence());
        var listeBarre = this.conversionBarres(licenceGreyCode);
        //Affichage du ST code
        //Parcours complet du ST code avec traitement sytématique 
        for(var i=0;i<listeBarre.length;i++){
            //Affectation de la hauteur pour les éléments grpahique correspondant aux barres
            var barreHTMLTemp =document.getElementById('vertical'+i);
            var hauteurBarre = 10*listeBarre[i];
            barreHTMLTemp.style.height=`${hauteurBarre}px`
            barreHTMLTemp.style.borderLeft="4px solid white"
            barreHTMLTemp.style.display="inline-block"
            barreHTMLTemp.style.marginLeft="5px"
            barreHTMLTemp.style.borderRadius="5px"
        }
    }
  }
  