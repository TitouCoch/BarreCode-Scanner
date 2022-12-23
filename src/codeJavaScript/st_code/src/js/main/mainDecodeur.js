//Main decodeur

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
var contx2 = output2.getContext('2d');

const output3 = document.getElementById('output3');
var contx3 = output3.getContext('2d');
// affichage de la video de la webcam

async function drawImg() {
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

video.onplay = async function () {
  setInterval(drawImg, 300);
};

// evenement photo
boutonPhoto.addEventListener('click', async () => {
  var trouve = false;
  while (true) {
    try {
      // on enleve les dessin du canvas
      contx3.fillRect(XRepereOrigine,YRepereOrigine, 1, 1);
      // Canva a partir de la video
      await context.drawImage(player, 0, 0, photo.width, photo.height);
      // arrete la video    
      //player.srcObject.getVideoTracks().forEach(track=> track.stop());
      var hidden_ctx = await hiddenCanvas.getContext('2d');

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
      let ledecodeur = new Decodeur(matriceImage);
      var matriceContoursObjet = new ContoursObjets(ledecodeur.recuperationContourObjets());
      var uneListeRatio = new ListeRatios(ledecodeur.recuperationRatio(matriceContoursObjet.getContoursObjets()));
      var unGraycode = new GrayCode(ledecodeur.conversionGrayCode(uneListeRatio.getListeRatios()));
      var numLicence = new Licence(ledecodeur.conversionLicence(unGraycode.getGraycode()));
      const estValide = await ledecodeur.testerLicense(numLicence.getNumLicence());
      trouve = estValide;
    }
    catch (error) {
      // s'il y a une erreur, on met trouve a false 
      console.log(error);
      console.dir(error);
      trouve = false;
    }
    if (trouve == true) {
      console.log("LICENCE TROUVE ! FIN");
      var text = document.getElementById('text');
      text.innerHTML = numLicence.getNumLicence(); //Afficher le numéro de licence sur la page
      const container = document.getElementById('container');
      container.innerHTML = "<a href='../../../src/php/joueur.php?license="+ numLicence.getNumLicence() + "'>Voir Joueur</a>";
      break;
    }
  };

});