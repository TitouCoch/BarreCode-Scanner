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
        cv.imshow(output1, matriceImageNiveauDeGris);
        //
        //matriceImageNiveauDeGris >>detection des bords des objets >> matriceImageAvecContours
        var matriceImageAvecContours = matriceImageNiveauDeGris.clone()
        cv.Canny(matriceImageNiveauDeGris, matriceImageAvecContours, 50, 200, 3, false);
        //afficher image:
        //
        cv.imshow(output2, matriceImageAvecContours);
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

        function recupererListeObjets(matrice){
            //matriceContoursObjet >> RECUPERATION DES HAUTEURS ET POSITIONS DES OBJETS >> listeObjet
            // listeObjets >> Initialisation >> listeObjets
            var listeObjets = [];
            //listeObjets >> Parcours complet de la matrice des contours objets avec traitement systématique >> listeObjets
            for (var objetCourant = 0; objetCourant < matrice.length; objetCourant++)
            {
                //ymin, ymax, xpos >> Intialisation des variables avec le premier point de contours de lo'objet >> ymin, ymax, ypos
                var ymin = matrice[objetCourant][0][1];
                var ymax = matrice[objetCourant][0][1];
                var xmin = matrice[objetCourant][0][0];
                var xmax = matrice[objetCourant][0][0];
                for (var point = 0; point < matrice[objetCourant].length; point++) {
                    if (matrice[objetCourant][point][1] > ymax) {
                        ymax = matrice[objetCourant][point][1];
                    }
                    if (matrice[objetCourant][point][1] < ymin) {
                        ymin = matrice[objetCourant][point][1];
                    }
                    if (matrice[objetCourant][point][0] > xmax) {
                        xmax = matrice[objetCourant][point][0];
                    }
                    if (matrice[objetCourant][point][0] < xmin) {
                        xmin = matrice[objetCourant][point][0];
                    }
                }
                // calcule de la hauteur de la barre
                var hauteur = ymax - ymin;
                var largeur = xmax - xmin;
                // ajout de la hauteur et de posx dans la listeObjets
                listeObjets.push([xmin, xmax, ymin, ymax, hauteur, largeur]);
            }
            return listeObjets;
        }

        //Fonction qui trouve les objets références dans l'image
        function trouverReferences(listeObjets = []) {
            var listeReferences = [];
            for (var i = 0; i < listeObjets.length; i++) {
                var marge = 3;
                var XmaxLogo = -1;
                var hauteurTemp = listeObjets[i][4];
                if (hauteurTemp - marge <= listeObjets[i][5] && listeObjets[i][5] <= hauteurTemp + marge && listeObjets[i][0]>XmaxLogo && hauteurTemp != 0) {
                    listeReferences.push(listeObjets[i]);
                    if(hauteurTemp >= 20){
                        console.log("hauteurLogo:",hauteurTemp)
                        XmaxLogo = listeObjets[i][1]
                    }
                }
            }
            var logo = listeObjReference[0];
            var boule1 = listeObjReference[1];
            var boule2 = listeObjReference[2];
            return logo,boule1,boule2;
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

        //Appel de la fonction trouverReferences
        var listeObjReference = trouverReferences(listeObjetsTrie);
        console.log(listeObjReference)
       
                
        console.log("listeObjReference", listeObjReference);
        console.log("logo", logo);
        console.log("boule1", boule1);
        console.log("boule2", boule2);

        function distance(a, b) {
            return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)
        }
        function toDegree(a)
        {
            return a * 180/Math.PI;
        }
        
        function toRadian(a)
        {
            return a/(180/Math.PI);
        }
        function calculerAngle(boule1, boule2) {
           
            // initialisation des points
            var pointA = [boule1[0] + boule1[4] / 2, boule1[2] + boule1[5] / 2];
            var pointB = [boule2[0] + boule2[4] / 2, boule2[2] + boule2[5] / 2];
            var pointVirtuel = [pointB[0], pointA[1]];
            //afficher les droites
            contx.strokeStyle = '#f00';
            contx.beginPath();
            contx.moveTo(pointA[0], pointA[1]);
            contx.lineTo(pointB[0], pointB[1]);
            contx.stroke();
            contx.strokeStyle = '#f00';
            contx.beginPath();
            contx.moveTo(pointA[0], pointA[1]);
            contx.lineTo(pointVirtuel[0], pointVirtuel[1]);
            contx.stroke();
            //
            console.log("pointA", pointA);
            console.log("pointB", pointB);
            console.log("pointViruel :", pointVirtuel);

            // calcul des distance
            var hypothenuse = distance(pointA, pointB);
            var adjacent = distance(pointA, pointVirtuel);
            console.log("h:", hypothenuse, "adj:", adjacent);
            var angle = Math.acos(adjacent / hypothenuse);
            angle = toDegree(angle);
            if(pointVirtuel[1]<pointB[1])
            {
                console.log("angle positif");
                return angle;
            }
            else
            {
                console.log("angle negatif");
                return -angle;
            }
            
        }
        console.log(calculerAngle(boule1, boule2));

        function rotationPoint(x,y,angle)
        {
            var angleRadian = toRadian(angle)
            return [x*Math.cos(angleRadian)+y*-1*Math.sin(angleRadian) ,x*Math.sin(angleRadian)+y*Math.cos(angleRadian)]
        }
        function rotationEnsemble(centre,matrice,angle)
        {
            var matriceApresRotation = [];
            console.log(matrice);
           for(var objet=0; objet < matrice.length; objet++)
           {
            matriceApresRotation.push([])
            for(var point=0; point < matrice[objet].length;point++)
            {   
                // le y du point dans un repere cartesien de centre "centre"
                var XRepereCentre = matrice[objet][point][0] - centre[0];
                var YRepereCentre = matrice[objet][point][1] - centre[1];
                // rotation des coordonées du point
                var nouveauPoint = rotationPoint(XRepereCentre,YRepereCentre,angle);
                // remettre les points dans le plan d'origine
                var XRepereOrigine = matrice[objet][point][0] + centre[0];
                var YRepereOrigine = matrice[objet][point][1] + centre[1];
                // remplacer le point par le nouveau point apres rotation
                matriceApresRotation[objet].push([XRepereOrigine,YRepereOrigine])
            }
           }
           return matriceApresRotation
        }
        console.log(" rotation de (10,10) de 90 degree:",rotationPoint(2,10,10));
        console.log(listeObjetsTrie.length);
        var matriceApresRotation =  rotationEnsemble(logo,matriceContourObjet,20);
        console.log("matriceApresRotation:",matriceApresRotation);
        // listeObjetTrie >> CALCUL DES RATIOS >> listeRatios
        // hauteurReference >> Affectation de  la hauteur du premier objet a la hauteur reference >> hauteurReference
        function calculerLesRatios(matrice){
            var hauteurReference = logo[4];
            var listeObjetsApresRotation = [];
            // hauteurReference, listeObjetsTrie >> Parcours et calcul de chaques ratios >> listeRatios
            for (var objetCourant = 0; objetCourant < matrice.length; objetCourant++) {
                //ymin, ymax, xpos >> Intialisation des variables avec le premier point de contours de lo'objet >> ymin, ymax, ypos
                var ymin = matrice[objetCourant][0][1];
                var ymax = matrice[objetCourant][0][1];
                var xmin = matrice[objetCourant][0][0];
                var xmax = matrice[objetCourant][0][0];
                listeObjetsApresRotation.push([]);
                for (var point = 0; point < matrice[objetCourant].length; point++) 
                {
                    if (matrice[objetCourant][point][1] > ymax) {
                        ymax = matrice[objetCourant][point][1];
                    }
                    if (matrice[objetCourant][point][1] < ymin) {
                        ymin = matrice[objetCourant][point][1];
                    }
                    if (matrice[objetCourant][point][0] > xmax) {
                        xmax = matrice[objetCourant][point][0];
                    }
                    if (matrice[objetCourant][point][0] < xmin) {
                        xmin = matrice[objetCourant][point][0];
                    }
                
                }
                // calcule de la hauteur de la barre
                var hauteur = ymax - ymin;
                // ajout de la hauteur et de posx dans la listeObjets
                listeObjetsApresRotation[objetCourant].push(xmin,xmax,ymin,ymax,hauteur);
            }
    }
        function filtreObjet(liste)
        {
            var listeObjetFiltreApresRotation = [];
            var limiteXmax = boule2[1];
            var limiteXmin = boule1[0];
            for (var i = 0; i < liste.length; i++)
            {
                var objetCourant = liste[i];
                if(objetCourant[0]>=limiteXmin && objetCourant[1]<=limiteXmax)
                {
                    listeObjetFiltreApresRotation.push(objetCourant)
                }
            }
        return listeObjetFiltreApresRotation;
        }

        console.log("liste Objet Avant Filtrage",listeObjetsApresRotation);
        console.log("liste Objet Apres Filtrage",filtreObjet(listeObjetsApresRotation));
        // listeRatios >> Initialisation variable >> listeRatios
        var listeRatios = [];
        for (var objetCourant = 1; objetCourant < listeObjetsTrie.length; objetCourant++) {
            // listeRatios, hauteurReference, listeObjetTrie >> Division de la hauteur de l'objet courant par la hauteur référence et insertion dans la liste des ratios >> listeRatios
            var ratio = (listeObjetsTrie[objetCourant][1] / hauteurReference);
            listeRatios.push(ratio);
        }

        //for (var objet=0; objet<listeObjetsTrie)
        
        var listeObjets = recupererListeObjets(matriceContourObjet);
        var logo,boule1,boule2 = trouverReferences(listeObjets);
        listeObjetsTrie = listeObjets.sort(fonctionTri);
        rotationEnsemble(centre,matriceContoursObjets,angle)
        filtreObjet(liste,logo,boule1,boule2)
        calculerLesRatios(matrice)


        return listeRatios;
    };



    





    conversionGrayCode(listeRatios) {
        function valeurAbsolue(a) {
            if (a < 0) { return -a }
            else { return a };
        }
        //licenceGrayCode >> INITIALISATION VARIABLE >> licenceGrayCode
        var licenceGrayCode = "";
        
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