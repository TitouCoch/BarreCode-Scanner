/**
 * Classe représentant une licence.
 *
 * Une licence est caractérisée par une chaine de chiffre et de caractère, exemple "Ax67De6t54".
 *
 * @author Sport Track
 */
class Licence {
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
     * Modifie le numéro de la licence.
     *
     * @param {string} l - Nouveau numéro de la licence. Valeur par défaut : chaine vide.
     */
    setNumLicence(l=""){
        this.numLicence=l;
    }

    //Méthode Spécifique
    //Méthode : Aucune données >> Méthode convertionGrayCode >> licenceGrayCode
    convertionGrayCode(){
        //licenceGrayCode >> Initialisation des variables >> licenceGrayCode
        var licenceGrayCode=""
        //Parcours complet du numéro de licence avec traitement systématique (conversion gray code)
        for(var caracCourant = 0 ;caracCourant < this.numLicence.length ; caracCourant++){
            //licenceGrayCode, TABLE_ENCODAGE >> Traduction du caractère courant en graycode >> licenceGrayCode
            licenceGrayCode+=(TABLE_ENCODAGE[this.numLicence[caracCourant]]);
        }
        //Retourne la licence convertie en gray code
        return licenceGrayCode;
    }

    //Méthode : licenceGrayCode >> conversionBarre >> liteBarre
    conversionBarres(licenceGrayCode){
        //listeBarre >> Initialisation de liste barres >> listeBarre
        var listeBarre=[]
        //Parcours complet de licenceGrayCode avec traitement systématique qui transforme 3 bits de la liste en  taille de barre
        for(var i=0;i<licenceGrayCode.length;i+=3){
            //Séparation de la liste gray code en motBinaire de 3 bits, Conversion motBinaire en taille barre
            //motBinaire >> Initialisation du mot binaire >> motBinaire
            var motBinaire=[];
            //Affectation mot binaire
            for(var decalage=0;decalage<3;decalage++){
                //motBinaire, licenceGrayCode >> Ajout du bit courant dans la liste mot binaire >> motBinaire
                motBinaire.push(parseInt(licenceGrayCode[i+decalage]));
            }
            //Conversion du mot binaire en taille de barre avec une recherche de première occurence
            //Parcour des clé du dictionnaire CORRESP_GRAYCODE_BARRE
            for(var posCourante in CORRESP_GRAYCODE_BARRE){
                //Condition qui vérifie l'égalité entre le motBinaire et les valeurs du dictionnaire CORRESP_GRAYCODE_BARRE
                if(JSON.stringify(motBinaire)===JSON.stringify(CORRESP_GRAYCODE_BARRE[posCourante])){
                    //listeBarre, posCourante>> Affectation de la posCourante dans la liste des barres >> listeBarre 
                    listeBarre.push(posCourante);
                    break;
                }
            }
        }    
        //Retourne la liste des hauteurs de barres
        return listeBarre
    }

    //Méthode : Aucune données >> genererCodeBarre >> Aucun résultat
    genererCodeBarre(){
        //Affectation dans une variable du résultat de la conversion de la licence en gray code
        var licenceGrayCode = this.convertionGrayCode();
        //Affectation dans une variable du résultat de la conversion de la licenceGrayCode en liste de barre
        var listeBarre = this.conversionBarres(licenceGrayCode);
        //Affichage du ST code
        //Parcours complet du ST code avec traitement sytématique 
        for(var i=0;i<listeBarre.length;i++){
            //barreHTMLTemp >> Affectation de la hauteur pour les éléments grpahique correspondant aux barres >> barreHTMLTemp
            var barreHTMLTemp = document.getElementById('vertical'+i);
            //hateurBareTemp >> Affectation de la hauteur de barre dans une variable temporaire >> hauteurBarreTemp
            var hauteurBarreTemp = 10*listeBarre[i];
            //barreHTMLTemp, hauteurBarreTemp >> Affectation de la hauteur courante à l'élément graphique courant >> Aucun résultat
            barreHTMLTemp.style.height = `${hauteurBarreTemp}px`
            //Application de quelques rêgle CSS
            barreHTMLTemp.style.borderLeft = "4px solid white"
            barreHTMLTemp.style.display="inline-block"
            barreHTMLTemp.style.marginLeft="5px"
            barreHTMLTemp.style.borderRadius="5px"
        }
    }
  }
  