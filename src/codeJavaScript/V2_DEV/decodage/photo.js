class Photo{
    //ATTRIBUTS et CONSTRUCTEUR
    constructor(matriceImage){
    this.matriceImage = matriceImage;
    // ENCAPSULATION
    };
    setMatriceImage(matriceImage){
        this.matriceImage = matriceImage;
    };
    getMatriceImage(){
        return this.matriceImage;
    };
    // METHODES SPECIFIQUES
    recuperationContourObjets(){
    
// INITIALISATION
   let src = cv.imread(this.matriceImage);
   let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
   var matriceCountoursObjets = new Array();
   // Passage en niveau de gris
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  //detection bordures
  cv.Canny(src,src, 50, 200, 3, false);
   // creation des matrices contours et hierarchy
   let contours = new cv.MatVector();
   let hierarchy = new cv.Mat();
    // remplissages des matrices avec les contours 
   cv.findContours(src, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);
   // dessin des contours dans differentes couleurs
   for (let i = 0; i < contours.size(); ++i) {
       let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                               Math.round(Math.random() * 255));
       cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
   }
   // suppresion des matrices plus utiles
  //ANALYSE OBJET DANS L'IMAGE 

  const dicObjet = {} //Création d'une variable dictionnaire 
  //Boucle qui parcours tous les contours de l'image
  // creation de la matrice des contours des objets 
  var matriceContoursObjets = new Array();
  for (var i = 0; i < contours.size(); ++i) 
{   
    matriceContoursObjets[i] = new Array();
    var ci = contours.get(i);  //Récupération du contours courant dans une variable
    for (var j = 0; j < ci.data32S.length; j += 2)
    {
        var coordonneeX = ci.data32S[j]; //Récupération de la coordonnée x
        var coordonneeY = ci.data32S[j + 1]; //Récupération de la coordonnée y
        //matriceContoursObjets[i][j] = new Array();
        matriceContoursObjets[i].push([coordonneeX,coordonneeY]);
        // remplissage de l'objet courant avec un tableau contenant x et y
    }
}
return matriceContoursObjets;
};

    recuperationRatio(matriceContourObjet){
        // INITIALISATION 
        var listeObjets = new Array();
        for(var objetCourant = 0; objetCourant < matriceContourObjet.length; objetCourant++){
            //intialisation des variables
                var ymin = matriceContourObjet[objetCourant][0][1];
                var ymax = matriceContourObjet[objetCourant][0][1];
                var xpos = matriceContourObjet[objetCourant][0][0];
            for(var point = 0; point < matriceContourObjet[objetCourant].length; point++){
                if(matriceContourObjet[objetCourant][point][1] > ymax){
                    ymax = matriceContourObjet[objetCourant][point][1];
                }
                if(matriceContourObjet[objetCourant][point][1] < ymin){
                    ymin = matriceContourObjet[objetCourant][point][1];
                }
            }
            // calcule de la hauteur de la barre
            var hauteur = ymax - ymin;
            // ajout de la hauteur et de posx dans la listeObjets
            listeObjets.push([xpos,hauteur]);
        }
        // Tri de la liste Objet par posx
        listeObjets.sort(fonctionTri);
        // creation de la fonction pour le tri
        function fonctionTri(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                if(a[0] > b[0]){
                    return 1;
                }
                else{
                    return -1;
                }
            }
            
        }
        var listeObjetsTrie = listeObjets;
        /*for(var i=0; i < listeObjetsTrie.length;i++){
            console.log(listeObjetsTrie[i]);
        }
        */
        // CALCUL DES RATIOS
        // initialisation
        // affectation de  la hauteur du premier objet a la hauteur reference
        var hauteurReference = listeObjetsTrie[0][1];
        //parcours et calcul de chaques ratios
        var listeRatio=[];
        for(var objetCourant = 1 ;objetCourant < listeObjetsTrie.length;objetCourant++){
            var dividende = listeObjetsTrie[objetCourant][1];
            var ratio = (dividende/hauteurReference);   
            listeRatio.push(ratio);
        }
        return listeRatios;
    };
    conversionGrayCode(listeRatios){
    }
    conversionLicence(licenceGreyCode){

        // recuperation d'un mot binaire de 6bits de longueurs
        for(var bit=0;bit < licenceGreyCode.length-1;bit += 6){
            var motBinaire;
            for(var decalage = 0; decalage < 5; decalage){
                motBinaire += licenceGreyCode[bit+decalage];
            }
        }
        // insertion du caractere correspondant au motBinaire dans numLicence
        for(var cle in tableEncodageGrayCode){
            if(motBinaire ===  tableEncodageCode[cle]){
                numLicence += cle;
            }
        }
    }
    testerLicence(numLicence){

    }
    decodage(){
            var matriceContourObjet = this.recuperationContourObjets(this.matriceImage);
            var listeRatios = this.recuperationRatio(matriceContourObjet);
            var licenceGrayCode = this.conversionGrayCode(listeRatios);
            var numLicence = this.conversionLicence(licenceGrayCode);
            this.testerLicence(numLicence);
            //afficher info joueurs
    }
};