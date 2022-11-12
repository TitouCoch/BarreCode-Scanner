class Photo {
    CONSTRUCTEU
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
        // matriceImage >> conversion image en niveaux de gris >> matriceImageNiveauDeGris
        cv.cvtColor(matriceImage, matriceImageNiveauDeGris, cv.COLOR_RGBA2GRAY, 0);
        //matriceImageNiveauDeGris >>detection des bords des objets >> matriceImageAvecContours
        cv.Canny(matriceImageNiveauDeGris,matriceImageAvecContours, 50, 200, 3, false);
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
            var xpos = matriceContourObjet[objetCourant][0][0];

            //ymin, ymax, xpos >> Parcours complet des points de contours de l'objet courant avec traitement systématique >> listeObjet
            for (var point = 0; point < matriceContourObjet[objetCourant].length; point++) {
                //ymin, ymax >> Recherche des coordonnée Ymin et Ymax >> ymin, ymax
                if (matriceContourObjet[objetCourant][point][1] > ymax) {
                    ymax = matriceContourObjet[objetCourant][point][1];
                }
                if (matriceContourObjet[objetCourant][point][1] < ymin) {
                    ymin = matriceContourObjet[objetCourant][point][1];
                }
            }
            // ymin, ymax, hauteur >> Calcule de la hauteur de la barre >> hauteur
            var hauteur = ymax - ymin;
            // listeObjets, hauteurn xpos >> Ajout de la hauteur et de posx dans la listeObjets >> listeObjets
            listeObjets.push([xpos, hauteur]);
        }

        // listeObjet >> TRIE DE LA LISTEOBJETS PAR POSX >> listeObjetTrie
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

    conversionGrayCode(listeRatios) {
        var licenceGrayCode = "";
        function valeurAbsolue(a) {
            if (a < 0) { return -a }
            else { return a };
        }
        //Parcours complet de listeRatios avec traitement systématique
        for (var i = 0; i < listeRatios.length; i++) {
            //Recherche de la première occurence du ratio dans la variable global TABLE_DECODAGE
            //recherche de la valeur la plus proche du ratio
            // initialisation
            var min = 1;
            var indicePlusProche;
            for (var ligne = 0; ligne < TABLE_DECODAGE.length; ligne++) {
                if (valeurAbsolue(listeRatios[i] - TABLE_DECODAGE[ligne][0]) < min) {
                    min = valeurAbsolue(listeRatios[i] - TABLE_DECODAGE[ligne][0])
                    indicePlusProche = ligne;
                }
            }
            for (var bit = 0; bit < 3; bit++) {
                licenceGrayCode += TABLE_DECODAGE[indicePlusProche][1][bit];
            }
        }
        console.log(licenceGrayCode);
        return licenceGrayCode;
    };
    conversionLicence(licenceGreyCode) {
        var numLicence = "";
        // recuperation d'un mot binaire de 6bits de longueurs
        for (var bit = 0; bit < licenceGreyCode.length - 1; bit += 6) {
            var motBinaire = "";
            if (licenceGreyCode.length - bit < 6) {
                break;
            }
            for (var decalage = 0; decalage < 6; decalage++) {
                motBinaire += licenceGreyCode[bit + decalage];
            }

            // insertion du caractere correspondant au motBinaire dans numLicence
            for (var cle in TABLE_ENCODAGE_GRAY_CODE) {
                if (JSON.stringify(motBinaire) == JSON.stringify(TABLE_ENCODAGE_GRAY_CODE[cle])) {
                    numLicence += cle;
                }
            }
        }
        return numLicence;
    }
    testerLicence(numLicence) {

    }
    decodage() {
        var matriceContourObjet = this.recuperationContourObjets(this.matriceImage);
        var listeRatios = this.recuperationRatio(matriceContourObjet);
        var licenceGrayCode = this.conversionGrayCode(listeRatios);
        var numLicence = this.conversionLicence(licenceGrayCode);
        this.testerLicence(numLicence);
        //afficher info joueurs
    }
};