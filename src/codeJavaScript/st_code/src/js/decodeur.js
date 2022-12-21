
class Decodeur {
    //ATTRIBUTS et CONSTRUCTEUR
    constructor(matriceImage) {
        this.matriceImage = matriceImage;
        this.dictableEncodageGrayCode = {
            'a': '000000',
            'b': '000001',
            'c': '000011',
            'd': '000010',
            'e': '000110',
            'f': '000111',
            'g': '000101',
            'h': '000100',
            'i': '001100',
            'j': '001101',
            'k': '001111',
            'l': '001110',
            'm': '001010',
            'n': '001011',
            'o': '001001',
            'p': '001000',
            'q': '011000',
            'r': '011001',
            's': '011011',
            't': '011010',
            'u': '011110',
            'v': '011111',
            'w': '011101',
            'x': '011100',
            'y': '010100',
            'z': '010101',
            'A': '010111',
            'B': '010110',
            'C': '010010',
            'D': '010011',
            'E': '010001',
            'F': '010000',
            'G': '110000',
            'H': '110001',
            'I': '110011',
            'J': '110010',
            'K': '110110',
            'L': '110111',
            'M': '110101',
            'N': '110100',
            'O': '111100',
            'P': '111101',
            'Q': '111111',
            'R': '111110',
            'S': '111010',
            'T': '111011',
            'U': '111001',
            'V': '111000',
            'W': '101000',
            'X': '101001',
            'Y': '101011',
            'Z': '101010',
            0: '101110',
            1: '101111',
            2: '101101',
            3: '101100',
            4: '100100',
            5: '100101',
            6: '100111',
            7: '100110',
            8: '100010',
            9: '100011'
          };
        this.correspGrayCodeBarre =[[0.125, [0, 0, 0]],
        [0.250, [0, 0, 1]],
        [0.375, [0, 1, 1]],
        [0.500, [1, 1, 1]],
        [0.625, [1, 1, 0]],
        [0.750, [1, 0, 0]],
        [0.875, [1, 0, 1]],
        [1, [0, 1, 0]]]
        // ENCAPSULATION
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
            var liste = [];
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
                liste.push([xmin, xmax, ymin, ymax, hauteur, largeur]);
            }
            return liste;
        }

        //Fonction qui trouve les objets références dans l'image
        function trouverReferences(listeObjets) {
            var listeReferences = [];
            var marge = 2;
            var XmaxLogo = -1;
            for (var i = 0; i < listeObjets.length; i++) 
            {   
                var hauteurTemp = listeObjets[i][4];
                if (hauteurTemp - marge <= listeObjets[i][5] && listeObjets[i][5] <= hauteurTemp + marge && listeObjets[i][0]>XmaxLogo && hauteurTemp != 0) 
                {
                    console.log(listeObjets[i])
                    listeReferences.push(listeObjets[i]);
                    if(hauteurTemp >= 20)
                    {
                        console.log(listeObjets[i])
                        XmaxLogo = listeObjets[i][1]
                    }
                }
           }
        return listeReferences
        }


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

        function rotationPoint(x,y,angle)
        {
            var angleRadian = toRadian(angle)
            return [x*Math.cos(angleRadian)+y*-1*Math.sin(angleRadian) ,x*Math.sin(angleRadian)+y*Math.cos(angleRadian)]
        }
        function rotationEnsemble(centre,matrice,angle)
        {   
            var matriceApresRotation = [];
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
                var XRepereOrigine = nouveauPoint[0] + centre[0];
                var YRepereOrigine = nouveauPoint[1] + centre[1];
                // remplacer le point par le nouveau point apres rotation
                matriceApresRotation[objet].push([XRepereOrigine,YRepereOrigine])
            }
           }
           return matriceApresRotation
        }
        // listeObjetTrie >> CALCUL DES RATIOS >> listeRatios
        // hauteurReference >> Affectation de  la hauteur du premier objet a la hauteur reference >> hauteurReference
        function calculerLesRatios(listeObjets)
        {
            var hauteurReference = logo[4];
            var listeRatios = [];
            // hauteurReference, listeObjetsTrie >> Parcours et calcul de chaques ratios >> listeRatios
            for (var objetCourant = 0; objetCourant < listeObjets.length; objetCourant++)
            {
                {
                // listeRatios, hauteurReference, listeObjetTrie >> Division de la hauteur de l'objet courant par la hauteur référence et insertion dans la liste des ratios >> listeRatios
                var ratio = (listeObjets[objetCourant][4] / hauteurReference);
                listeRatios.push(ratio);
                }

            }
            return listeRatios;
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
        //for (var objet=0; objet<listeObjetsTrie)
        var listeObjets = recupererListeObjets(matriceContourObjet);
        console.log("La liste objet non trié :" ,listeObjets);
        var listeObjetsTrie = listeObjets.sort(fonctionTri);
        console.log("La liste objet trié :",listeObjetsTrie);
        var listeReferences = trouverReferences(listeObjetsTrie);
        var logo = listeReferences[0];
        var boule1 = listeReferences[1];
        var boule2 = listeReferences[2];
        console.log("logo : ", logo);
        console.log("boule1 : ", boule1);
        console.log("boule2 : ", boule2);

        var centreLogo = [logo[0]+(logo[1]-logo[2])/2,logo[2]+(logo[3]-logo[2])/2];
        var angleRotation = calculerAngle(boule1,boule2);
        var matriceObjetsApresRotation = rotationEnsemble(centreLogo,matriceContourObjet,angleRotation);
        console.log("matrice Avant Filtrage",matriceObjetsApresRotation);

        var listeObjetsApresRotation = recupererListeObjets(matriceObjetsApresRotation);
        console.log("liste Objet Avant Filtrage",listeObjetsApresRotation);

        var listeObjetsFiltreApresRotation = filtreObjet(listeObjetsApresRotation,logo,boule1,boule2);
        console.log("liste Objet Apres Filtrage",listeObjetsFiltreApresRotation);

        var listeObjetsFiltreEtTrieApresRotation = listeObjetsFiltreApresRotation.sort(fonctionTri);
        console.log("liste Objet Apres trie",listeObjetsFiltreEtTrieApresRotation);

        var listeRatios = calculerLesRatios(listeObjetsFiltreEtTrieApresRotation);

        console.log(listeRatios)
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
            for (var ligne = 0; ligne < this.correspGrayCodeBarre.length; ligne++) {
                //Si la différence entre la valeur courante de liste ratio et la valeur reference de la table d'encodage est inférieur à min
                if (valeurAbsolue(listeRatios[i] - this.correspGrayCodeBarre[ligne][0]) < min) {
                    //min, indicePlusProche >> Affectation de l'indice de la TABLE_DECODAGE le plus proche de la valeur courante de listeRatios >> min, indicePlusProche
                    min = valeurAbsolue(listeRatios[i] - this.correspGrayCodeBarre[ligne][0])
                    indicePlusProche = ligne;
                }
            }
            //licenceGrayCode, indicePlusProche >>Parcours et ajout de la correspondance en gray code dans licenceGrayCode >> licenceGrayCode
            for (var bit = 0; bit < 3; bit++) {
                licenceGrayCode += this.correspGrayCodeBarre[indicePlusProche][1][bit];
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
            for (var cle in this.dictableEncodageGrayCode ) {
                if (JSON.stringify(motBinaire) == JSON.stringify(this.dictableEncodageGrayCode[cle])) {
                    // numLicence >> Ajout du caractere correspondait dans numLicence >> numLicence
                    numLicence += cle;
                }
            }
        }
        console.log("numLicence:",numLicence);
        return numLicence;
    }
  async testerLicense(numLicence)
  {
    // Envoyez la requête AJAX
      const xhr = new XMLHttpRequest();
      xhr.open("GET" , 'http://localhost:8888/SportTrack/src/codeJavaScript/st_code/src/php/api.php?license='+numLicence);
      xhr.send();
      // Attendre la réponse avant de continuer
      const response = await new Promise((resolve,reject) => {
        xhr.onreadystatechange = function () {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Parse la réponse en tant que JSON
            const response = JSON.parse(this.responseText);
            // Vérifie si la licence existe
            if (response.licenseExists == true) {
              // La licence existe
              resolve(true);
            } else {
              // La licence n'existe pas
              resolve(false);
            }
          }
        };
      });
      return response
  }
};