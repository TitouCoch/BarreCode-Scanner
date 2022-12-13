
//Fichier SCANNEUR du ST_CODE

//ANALYSE DE L'IMAGE----------------------------------------------->


//MODIFICATION IMAGE
// VARIABLES GLOBALES
const TABLE_ENCODAGE_GRAY_CODE = {
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

const TABLE_DECODAGE = [[0.125, [0, 0, 0]],
[0.250, [0, 0, 1]],
[0.375, [0, 1, 1]],
[0.500, [1, 1, 1]],
[0.625, [1, 1, 0]],
[0.750, [1, 0, 0]],
[0.875, [1, 0, 1]],
[1, [0, 1, 0]]]


//Initiation des variables
//Récupération des éléments de la page HTML par leur ID
const parametres = { video: true, audio: false };
var video = document.getElementById("player");
const photo = document.getElementById('canvas');
const hiddenCanvas = document.getElementById('hiddenCanvas');
const context = photo.getContext('2d');
const boutonPhoto = document.getElementById('photo');
navigator.mediaDevices.getUserMedia(parametres).then(function (stream) { player.srcObject = stream; });
//
const output2 = document.getElementById('output2');
var contx = output2.getContext('2d');
// affichage de la video de la webcam

function drawImg() {
  var videoCanvas = document.getElementById("videoCanvas");
  var ctx = videoCanvas.getContext('2d');
  videoCanvas.width = video.videoWidth;
  videoCanvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
  ctx.lineWidth = 2;
  let hauteur = 300
  let largeur = 150 // ratio 2:1
  ctx.moveTo(180, 130);
  ctx.lineTo(190, 130);
  ctx.stroke();

  ctx.moveTo(180, 130);
  ctx.lineTo(180, 140);
  ctx.stroke();
  //
  ctx.moveTo(480, 130);
  ctx.lineTo(470, 130);
  ctx.stroke();

  ctx.moveTo(480, 130);
  ctx.lineTo(480, 140);
  ctx.stroke();

  //
  ctx.moveTo(180, 280);
  ctx.lineTo(190, 280);
  ctx.stroke();

  ctx.moveTo(180, 280);
  ctx.lineTo(180, 270);
  ctx.stroke();
  //
  ctx.moveTo(480, 280);
  ctx.lineTo(470, 280);
  ctx.stroke();

  ctx.moveTo(480, 280);
  ctx.lineTo(480, 270);
  ctx.stroke();

  setTimeout(drawImg, 100)
};

// 
video.onplay = function () {
  setTimeout(drawImg, 300)
};

// evenement photo
boutonPhoto.addEventListener('click', () => {
  var erreur;
  erreur = true;

  /*while (erreur == true) {
    try {*/
  // Canva a partir de la video
  context.drawImage(player, 0, 0, photo.width, photo.height);

  // arrete la video    
  //player.srcObject.getVideoTracks().forEach(track=> track.stop());
  var hidden_ctx = hiddenCanvas.getContext('2d');

  hidden_ctx.drawImage(
    photo,
    90, //x debut
    65, //y debut
    150,// largeur (ratio 2:1)
    75,// hauteur
    0,
    0,
    300,
    150
  )


  let matriceImage = document.getElementById('hiddenCanvas');
  let desContoursObjets = new ContoursObjets(recuperationContourObjets(matriceImage));
  var uneListeRatios = new ListeRatios(recuperationRatio(desContoursObjets));
  var licenceEnGrayCode = new GrayCode(conversionGrayCode(uneListeRatios));
  var uneLicence = new Licence(conversionLicence(licenceEnGrayCode));
  //testerLicence(uneLicence);
  /*    erreur = false;
    }
    catch (e) {
      // s'il y a une erreur, on met erreur a vrai 
      erreur = true;
    }
  }*/

});



function recuperationContourObjets(uneMatriceImage) {
  // Methode: matriceImage >> recuperationContourObjets >> matriceContoursObjet
  // INITIALISATION
  let matriceImage = cv.imread(uneMatriceImage);
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
function recuperationRatio(matriceContourObjet) {
  //matriceContoursObjet >> RECUPERATION DES HAUTEURS ET POSITIONS DES OBJETS >> listeObjet
  // listeObjets >> Initialisation >> listeObjets
  var listeObjets = [];
  //listeObjets >> Parcours complet de la matrice des contours objets avec traitement systématique >> listeObjets
  for (var objetCourant = 0; objetCourant < matriceContourObjet.getContoursObjets().length; objetCourant++) {
    //ymin, ymax, xpos >> Intialisation des variables avec le premier point de contours de lo'objet >> ymin, ymax, ypos
    var ymin = matriceContourObjet.getContoursObjets()[objetCourant][0][1];
    var ymax = matriceContourObjet.getContoursObjets()[objetCourant][0][1];
    var xmin = matriceContourObjet.getContoursObjets()[objetCourant][0][0];
    var xmax = matriceContourObjet.getContoursObjets()[objetCourant][0][0];
    for (var point = 0; point < matriceContourObjet.getContoursObjets()[objetCourant].length; point++) {
      if (matriceContourObjet.getContoursObjets()[objetCourant][point][1] > ymax) {
        ymax = matriceContourObjet.getContoursObjets()[objetCourant][point][1];
      }
      if (matriceContourObjet.getContoursObjets()[objetCourant][point][1] < ymin) {
        ymin = matriceContourObjet.getContoursObjets()[objetCourant][point][1];
      }
      if (matriceContourObjet.getContoursObjets()[objetCourant][point][0] > xmax) {
        xmax = matriceContourObjet.getContoursObjets()[objetCourant][point][0];
      }
      if (matriceContourObjet.getContoursObjets()[objetCourant][point][0] < xmin) {
        xmin = matriceContourObjet.getContoursObjets()[objetCourant][point][0];
      }
    }
    // calcule de la hauteur de la barre
    var hauteur = ymax - ymin;
    var largeur = xmax - xmin;
    // ajout de la hauteur et de posx dans la listeObjets
    listeObjets.push([xmin, xmax, ymin, ymax, hauteur, largeur]);
  }

  //Fonction qui trouve les objets références dans l'image
  function trouverReferences(listeObjets = []) {
    var listeReferences = [];
    for (var i = 0; i < listeObjets.length; i++) {
      var marge = 3;
      var hauteurTemp = listeObjets[i][4];
      if (hauteurTemp - marge <= listeObjets[i][5] && listeObjets[i][5] <= hauteurTemp + marge) {
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


  //Appel de la fonction trouverReferences
  var listeObjReference = trouverReferences(listeObjetsTrie);
  var logo = listeObjReference[0];
  var boule1 = listeObjReference[1];
  var boule2 = listeObjReference[2];

  function filtrerObjet(listeObjets = []) {
    var marge = 10
    var valeurXmin = boule1[0];
    var valeurXmax = boule2[0];
    var valeurYmin = logo[2];
    var valeurYmax = logo[3];

    for (var i = 1; i < listeObjets.length; i++) {
      if (listeObjets[i][0] <= valeurXmin) {
        //console.log(i,"L'objet est avant le logo sur l'axe x")
        listeObjets.splice(i, 1);
      }
      else if (listeObjets[i][0] >= valeurXmax) {
        //console.log(i,"L'objet est après le logo sur l'axe x")
        listeObjets.splice(i, 1);
      }
      else if (listeObjets[i][2] < valeurYmin - 10) {
        //console.log(i,"L'objet est avant le logo sur l'axe y")
        listeObjets.splice(i, 1);
      }
      else if (listeObjets[i][3] > valeurYmax + 10) {
        //console.log(i,"L'objet est après le logo sur l'axe y")
        listeObjets.splice(i, 1);
      }
    }
    //listeObjets.splice(0,1);
    return listeObjets
  }

  var listeObjet2 = filtrerObjet(listeObjets)
  function distance(a, b) {
    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)
  }
  function calculerAngle(boule1, boule2) {
    // initialisation des points
    var pointA = [boule1[0] + boule1[4] / 2, boule1[2] + boule1[5] / 2];
    var pointB = [boule2[0] + boule2[4] / 2, boule2[2] + boule2[5] / 2];
    var pointVirtuel = [pointB[0], pointA[1]];
    //
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
    if (Math.sin(angle) > 0) {
      console.log("angle positif")
    }
    else {
      console.log("angle negatif")
    }
    return angle;
  }
  console.log(calculerAngle(boule1, boule2));

  function rotationEnsemble(centre, matrice) {
    function rotation(angle, point) {
      return [point[0] * Math.cos(angle) + point[1] * Math.sin(angle), -(point[0] * Math.sin(angle)) + point[1] * Math.cos(angle)]
    }
  }
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
function conversionGrayCode(listeRatios) {
  //licenceGrayCode >> INITIALISATION VARIABLE >> licenceGrayCode
  var licenceGrayCode = "";
  function valeurAbsolue(a) {
    if (a < 0) { return -a }
    else { return a };
  }
  //listeRatios, licenceGrayCode >> Parcours complet de listeRatios avec traitement systématique >> licenceGrayCode
  for (var i = 0; i < listeRatios.getListeRatios().length; i++) {

    //listeRatios, licenceGrayCode >> Recherche de la valeur la plus proche du ratio >> licenceGrayCode
    // min, inidicePlusProche >> Initialisation variable >> min, indicePlusProche
    var min = 1;
    var indicePlusProche;
    //licenceGrayCode, listeRatios, min, indicePlusProche >> Recherche de la première occurence du ratio dans la variable global TABLE_DECODAGE >> licenceGrayCode
    for (var ligne = 0; ligne < TABLE_DECODAGE.length; ligne++) {
      //Si la différence entre la valeur courante de liste ratio et la valeur reference de la table d'encodage est inférieur à min
      if (valeurAbsolue(listeRatios.getListeRatios()[i] - TABLE_DECODAGE[ligne][0]) < min) {
        //min, indicePlusProche >> Affectation de l'indice de la TABLE_DECODAGE le plus proche de la valeur courante de listeRatios >> min, indicePlusProche
        min = valeurAbsolue(listeRatios.getListeRatios()[i] - TABLE_DECODAGE[ligne][0])
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


function conversionLicence(licenceGreyCode) {
  // licenceGrayCode >> conversion licenceGrayCode en chaine de caracteres >> numLicence
  // initialisation des variables >> numLicence, motBinaire
  var numLicence = "";
  var motBinaire = "";
  // licenceGrayCode, motBinaire >> Parcours complet de licenceGrayCode avec traitement systematique
  // licenceGrayCode, motBinaire >> recuperation de 6 bits de la liste dans un motBinaire temporaire >> motBinaire
  console.log(licenceGreyCode.getGraycode().length)
  for (var bit = 0; bit < licenceGreyCode.getGraycode().length - 1; bit += 6) {
    //motBinaire >> remise de mot binaire en liste vide >> motBinaire
    motBinaire = "";
    if (licenceGreyCode.getGraycode().length - bit < 6) {
      break;
    }
    for (var decalage = 0; decalage < 6; decalage++) {
      motBinaire += licenceGreyCode.getGraycode()[bit + decalage];
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


function testerLicence(numLicence) {
  // Crée un nouvel objet XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Définit l'URL du fichier PHP à appeler
  const url = '../php/api.php';

  // Définit la méthode HTTP à utiliser (POST dans ce cas)
  xhr.open('POST', url);

  // Définit les en-têtes de la requête
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Définit les données à envoyer au fichier PHP
  const data = 'license=' + numLicence.getNumLicence();

  console.log(data)
  // Envoie la requête
  xhr.send(data);

  // Traite la réponse
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Parse la réponse en tant que JSON
      const response = JSON.parse(this.responseText);
      console.log(response.licenseExists)
      // Vérifie si la licence existe
      if (response.licenseExists) {
        // La licence existe
        console.log("Existe")
      } else {
        // La licence n'existe pas
        console.log("Existe pas")

      }
    }
  };
}