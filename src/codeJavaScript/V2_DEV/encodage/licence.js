//Classe Licence 

class Licence {
    //Constructeur de l'objet Licence
    constructor(l="") {
      this.numLicence = l;
    }

    //Fonction qui retourne l'attribut numLicence
    getNumLicence(){
        return this.numLicence;
    }

    //Fonction convertionGrayCode()
    convertionGrayCode(l=""){
        //Initialisation des variables
        var licenceGrayCode=""
        //Convertion complet du numéro de licence avec traitement systématique (conversion gray code)
        for(var caracCourant = 0 ;caracCourant < this.numLicence.length ; caracCourant++){
            //Traduction du caractère courant en graycode
            licenceGrayCode+=(tableEncodageGrayCode[this.numLicence[caracCourant]]);
        }
        //Retourne la licence convertie en gray code
        return licenceGrayCode;
    }

    conversionBarres(licenceGrayCode){
        //Initialisation de liste barres
        var listeBarre=[]
        //Parcours complet de licenceGrayCode avec traitement systématique qui transforme 3 bits de la liste en  taille de barre
        for(var i=0;i<licenceGrayCode.length;i+=3){
            //Séparation de la liste gray code en motBinaire de 3 bits, Conversion motBinaire en taille barre
            //Initialisation du mot binaire
            var motBinaire=[];
            //Affectation mot binaire
            for(var decalage=0;decalage<3;decalage++){
                //Ajout du bit courant dans la liste mot binaire
                motBinaire.push(parseInt(licenceGrayCode[i+decalage]));
            }
            //Conversion du mot binaire en taille de barre avec une recherche de première occurence
            //Parcour des clé du dictionnaire correspGrayCodeBarre
            for(var posCourante in correspGrayCodeBarre){
                //Condition qui vérifie l'égalité entre le motBinaire et les valeurs du dictionnaire correspGrauCodeBarre
                if(JSON.stringify(motBinaire)===JSON.stringify(correspGrayCodeBarre[posCourante])){
                    listeBarre.push(posCourante);
                    break;
                }
            }
        }    
        //Retourne la liste des hauteurs de barres
        return listeBarre
    }

    genererCodeBarre(numLicence=""){
        //Affectation dans une variable du résultat de la conversion de la licence en gray code
        var licenceGrayCode = this.convertionGrayCode(numLicence);
        //Affectation dans une variable du résultat de la conversion de la licenceGrayCode en liste de barre
        var listeBarre = this.conversionBarres(licenceGrayCode);
        //Affichage du ST code
        //Parcours complet du ST code avec traitement sytématique 
        for(var i=0;i<listeBarre.length;i++){
            //Affectation de la hauteur pour les éléments grpahique correspondant aux barres
            var barreHTMLTemp = document.getElementById('vertical'+i);
            //Affectation de la hauteur de barre dans une variable temporaire
            var hauteurBarreTemp = 10*listeBarre[i];
            //Affectation de la hauteur courante à l'élément graphique courant
            barreHTMLTemp.style.height = `${hauteurBarreTemp}px`
            //Application de quelques rêgle CSS
            barreHTMLTemp.style.borderLeft = "4px solid white"
            barreHTMLTemp.style.display="inline-block"
            barreHTMLTemp.style.marginLeft="5px"
            barreHTMLTemp.style.borderRadius="5px"
        }
    }
  }
  