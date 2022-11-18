class Photo {
    //ATTRIBUTS et CONSTRUCTEUR
    constructor(matriceImage) {
        this.matriceImage = matriceImage;
        // ENCAPSULATION
    };
    setMatriceImage(matriceImage) {
        this.matriceImage = matriceImage;
    };
    getMatriceImage() {
        return this.matriceImage;
    };
    // METHODES SPECIFIQUES
    recuperationContourObjets() {
        // Methode: matriceImage >> recuperationContourObjets >> matriceContoursObjet
        // INITIALISATION
        let matriceImage = cv.imread(this.matriceImage);
        var matriceCountoursObjets = new Array();
        var matriceImageNiveauDeGris = matriceImage.clone()
        // matriceImage >> conversion image en niveaux de gris >> matriceImageNiveauDeGris
        cv.cvtColor(matriceImage, matriceImageNiveauDeGris, cv.COLOR_RGBA2GRAY, 0);
        //afficher image:
        //
        cv.imshow (output1,matriceImageNiveauDeGris);
        //
        //matriceImageNiveauDeGris >>detection des bords des objets >> matriceImageAvecContours
        var matriceImageAvecContours = matriceImageNiveauDeGris.clone()
        cv.Canny(matriceImageNiveauDeGris,matriceImageAvecContours, 50, 200, 3, false);
        //afficher image:
        //
        cv.imshow (output2,matriceImageAvecContours);
        //
        // creation des matrices et liste de vecteurs  contours et hierarchy
        let contours = new cv.MatVector();
        let hierarchy = new cv.Mat();
        // matriceImageAvecContours >> récupération des contours de chaques objets >> matriceContoursObjets
        cv.findContours(matriceImageAvecContours, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);
        //mise sous forme de matrice de dimension 3
        var matriceContoursObjets = new Array();
        // parcours complet de la liste d'objets
        for (var i = 0; i < contours.size(); ++i) {
            matriceContoursObjets[i] = new Array();
            var ci = contours.get(i);  //Récupération de l'objet courant dans une variable
            // parcours des points du contours de l'objet
            for (var j = 0; j < ci.data32S.length; j += 2) {
                var coordonneeX = ci.data32S[j]; //Récupération de la coordonnée x
                var coordonneeY = ci.data32S[j + 1]; //Récupération de la coordonnée y
                // Insertion du point sous forme de liste contenant x et y
                matriceContoursObjets[i].push([coordonneeX, coordonneeY]);
            }
        }
        return matriceContoursObjets;
    };

    //Méthode : matriceContoursObjets >> Récupération du ratio en fonction de la hauteur des barres obtenues sur la photo >> listeRatios
    recuperationRatio(matriceContourObjet) {
        //matriceContoursObjet >> RECUPERATION DES HAUTEURS ET POSITIONS DES OBJETS >> listeObjet
        // listeObjets >> Initialisation >> listeObjets
        var listeObjets = [];
        //listeObjets >> Parcours complet de la matrice des contours objets avec traitement systématique >> listeObjets
        for (var objetCourant = 0; objetCourant < matriceContourObjet.length; objetCourant++) {
            //ymin, ymax, xpos >> Intialisation des variables avec le premier point de contours de lo'objet >> ymin, ymax, ypos
            var ymin = matriceContourObjet[objetCourant][0][1];
            var ymax = matriceContourObjet[objetCourant][0][1];
            var xmin = matriceContourObjet[objetCourant][0][0];
            var xmax = matriceContourObjet[objetCourant][0][0];
            for (var point = 0; point < matriceContourObjet[objetCourant].length; point++) {
                if (matriceContourObjet[objetCourant][point][1] > ymax) {
                    ymax = matriceContourObjet[objetCourant][point][1];
                }
                if (matriceContourObjet[objetCourant][point][1] < ymin) {
                    ymin = matriceContourObjet[objetCourant][point][1];
                }
                if (matriceContourObjet[objetCourant][point][0] > xmax) {
                    xmax = matriceContourObjet[objetCourant][point][0];
                }
                if (matriceContourObjet[objetCourant][point][0] < xmin) {
                    xmin = matriceContourObjet[objetCourant][point][0];
                }
            }
            // calcule de la hauteur de la barre
            var hauteur = ymax - ymin;
            var largeur = xmax - xmin;
            // ajout de la hauteur et de posx dans la listeObjets
            listeObjets.push([xmin,xmax,ymin,ymax,hauteur,largeur]);
        }
        
        //Fonction qui trouve les objets références dans l'image
        function trouverReferences(listeObjets=[]){
            var listeReferences =[];
            for (var i = 0; i < listeObjets.length; i++) {
                var marge = 3;
                var hauteurTemp = listeObjets[i][4];
                if(hauteurTemp-marge<= listeObjets[i][5] && listeObjets[i][5]<=hauteurTemp+marge){
                    listeReferences.push(listeObjets[i]);
                }
            }
            return listeReferences;
        }
        

        
        listeObjets.sort(fonctionTri);
        //creation de la fonction pour le tri
        function fonctionTri(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                if (a[0] > b[0]) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        }
        var listeObjetsTrie = listeObjets;


        //Appelle de la fonction trouverReferences
        var listeObjReference=trouverReferences(listeObjetsTrie);
        var deuxiemeBouleReference=listeObjReference[2];
        var premiereBouleReference=listeObjReference[1];
        var logoReference=listeObjReference[0];
        //var bouleVirtuelle=[deuxiemeBouleReference[0],premiereBouleReference[3]]

        function filtrerObjet(listeObjets=[],logoReference=[],deuxiemeRondReference=[],premiereBouleReference=[]){
            var marge=10
            var valeurXmin = premiereBouleReference[0];
            var valeurXmax = deuxiemeRondReference[0];
            var valeurYmin = logoReference[2];
            var valeurYmax = logoReference[3];

            for(var i=1;i<listeObjets.length;i++){
                if(listeObjets[i][0] <= valeurXmin){
                    //console.log(i,"L'objet est avant le logo sur l'axe x")
                    listeObjets.splice(i,1);
                }
                else if(listeObjets[i][0] >= valeurXmax){
                    //console.log(i,"L'objet est après le logo sur l'axe x")
                    listeObjets.splice(i,1);
                }
                else if(listeObjets[i][2] < valeurYmin-10){
                    //console.log(i,"L'objet est avant le logo sur l'axe y")
                    listeObjets.splice(i,1);
                }
                else if(listeObjets[i][3] > valeurYmax+10){
                    //console.log(i,"L'objet est après le logo sur l'axe y")
                    listeObjets.splice(i,1);
                }
            }
            //listeObjets.splice(0,1);
            return listeObjets
        }
        var listeObjet2=filtrerObjet(listeObjets,logoReference,deuxiemeBouleReference,premiereBouleReference)
        console.log("Liste objet2",listeObjet2)

        // listeObjetTrie >> CALCUL DES RATIOS >> listeRatios
        // hauteurReference >> Affectation de  la hauteur du premier objet a la hauteur reference >> hauteurReference
        var hauteurReference = listeObjetsTrie[0][1];
        // hauteurReference, listeObjetsTrie >> Parcours et calcul de chaques ratios >> listeRatios
        // listeRatios >> Initialisation variable >> listeRatios
        var listeRatios = [];
        for (var objetCourant = 1; objetCourant < listeObjetsTrie.length; objetCourant++) {
            // listeRatios, hauteurReference, listeObjetTrie >> Division de la hauteur de l'objet courant par la hauteur référence et insertion dans la liste des ratios >> listeRatios
            var ratio = (listeObjetsTrie[objetCourant][1] / hauteurReference);
            listeRatios.push(ratio);
        }
        return listeRatios;
    };

















































    
    //Méthode : listeRatios >> Conversion barres en grey code >> licenceGrayCode
    conversionGrayCode(listeRatios) {
        //licenceGrayCode >> INITIALISATION VARIABLE >> licenceGrayCode
        var licenceGrayCode = "";
        function valeurAbsolue(a) {
            if (a < 0) { return -a }
            else { return a };
        }
        //listeRatios, licenceGrayCode >> Parcours complet de listeRatios avec traitement systématique >> licenceGrayCode
        for (var i = 0; i < listeRatios.length; i++) {
            
            //listeRatios, licenceGrayCode >> Recherche de la valeur la plus proche du ratio >> licenceGrayCode
            // min, inidicePlusProche >> Initialisation variable >> min, indicePlusProche
            var min = 1;
            var indicePlusProche;
            //licenceGrayCode, listeRatios, min, indicePlusProche >> Recherche de la première occurence du ratio dans la variable global TABLE_DECODAGE >> licenceGrayCode
            for (var ligne = 0; ligne < TABLE_DECODAGE.length; ligne++) {
                //Si la différence entre la valeur courante de liste ratio et la valeur reference de la table d'encodage est inférieur à min
                if (valeurAbsolue(listeRatios[i] - TABLE_DECODAGE[ligne][0]) < min) {
                    //min, indicePlusProche >> Affectation de l'indice de la TABLE_DECODAGE le plus proche de la valeur courante de listeRatios >> min, indicePlusProche
                    min = valeurAbsolue(listeRatios[i] - TABLE_DECODAGE[ligne][0])
                    indicePlusProche = ligne;
                }
            }
            //licenceGrayCode, indicePlusProche >>Parcours et ajout de la correspondance en gray code dans licenceGrayCode >> licenceGrayCode
            for (var bit = 0; bit < 3; bit++) {
                licenceGrayCode += TABLE_DECODAGE[indicePlusProche][1][bit];
            }
        }
        return licenceGrayCode;
    };


    conversionLicence(licenceGreyCode) {
         // licenceGrayCode >> conversion licenceGrayCode en chaine de caracteres >> numLicence
         // initialisation des variables >> numLicence, motBinaire
        var numLicence = "";
        var motBinaire = "";
        // licenceGrayCode, motBinaire >> Parcours complet de licenceGrayCode avec traitement systematique
        // licenceGrayCode, motBinaire >> recuperation de 6 bits de la liste dans un motBinaire temporaire >> motBinaire
        for (var bit = 0; bit < licenceGreyCode.length - 1; bit += 6) {
            //motBinaire >> remise de mot binaire en liste vide >> motBinaire
            motBinaire = "";
            if (licenceGreyCode.length - bit < 6) {
                break;
            }
            for (var decalage = 0; decalage < 6; decalage++) {
                motBinaire += licenceGreyCode[bit + decalage];
            }

            // motBinaire, licenceGrayCode, numLicence >> recherche de premiere occurence dans la variable globale TABLE_ENCODAGE_GRAY_CODE >> numLicence
            for (var cle in TABLE_ENCODAGE_GRAY_CODE) {
                if (JSON.stringify(motBinaire) == JSON.stringify(TABLE_ENCODAGE_GRAY_CODE[cle])) {
                    // numLicence >> Ajout du caractere correspondait dans numLicence >> numLicence
                    numLicence += cle;
                }
            }
        }
        return numLicence;
    }
    testerLicence(numLicence) {

    }
    decodage() {
        // matriceImage >> Traitement Image: analyse de l'image pour en recuperer les contours de chaque objets >> matriceContourObjet 
        var matriceContourObjet = this.recuperationContourObjets(this.matriceImage);
        // matriceContourObjet >> recuperation des ratios en fonction de la hauteur des barres obtenues sur la photo >> listeRatios
        var listeRatios = this.recuperationRatio(matriceContourObjet);
        // listeRatios >> conversion licenceGrayCode en chaine de caractères >> 
        var licenceGrayCode = this.conversionGrayCode(listeRatios);
        // listeRatio >> conversion ratios en graycode >> licenceGrayCode
        var numLicence = this.conversionLicence(licenceGrayCode);
        // licenceGrayCode >> tester la licence dans une requete
        this.testerLicence(numLicence);
        //afficher info joueur
    }
};