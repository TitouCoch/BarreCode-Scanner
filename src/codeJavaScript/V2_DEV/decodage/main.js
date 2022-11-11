
//Fichier SCANNEUR du ST_CODE

//ANALYSE DE L'IMAGE----------------------------------------------->


//MODIFICATION IMAGE

//Initiation des variables
//Récupération des éléments de la page HTML par leur ID
const parametres = { video:true, audio:false};
var video = document.getElementById("player");
const photo = document.getElementById('canvas');
const hiddenCanva = document.getElementById('hiddenCanvas');
const context = photo.getContext('2d');
const boutonPhoto = document.getElementById('photo');
navigator.mediaDevices.getUserMedia(parametres).then(function(stream){player.srcObject = stream;});
// affichage de la video de la webcam

function drawImg(){
  var videoCanvas = document.getElementById("videoCanvas");
  var ctx = videoCanvas.getContext('2d');
  videoCanvas.width = video.videoWidth;
  videoCanvas.height = video.videoHeight;
  
  ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);  
  ctx.lineWidth = 2;
  let hauteur = 300
  let largeur = 150 // ratio 2:1
  ctx.moveTo(180,130);
  ctx.lineTo(190,130);
  ctx.stroke();
  
  ctx.moveTo(180, 130);
  ctx.lineTo(180,140);
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
  
  setTimeout(drawImg , 100)
  };
  
// 
  video.onplay = function() {
  setTimeout(drawImg , 300)};

// evenement photo
boutonPhoto.addEventListener('click', () => {
    // Canva a partir de la video
    context.drawImage(player, 0, 0,photo.width, photo.height);

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
    let photoWebcam = new Photo(matriceImage);
    var matriceContoursObjet = photoWebcam.recuperationContourObjets();
    photoWebcam.recuperationRatio(matriceContoursObjet);

});

