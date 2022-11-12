
//Fichier SCANNEUR du ST_CODE

//ANALYSE DE L'IMAGE----------------------------------------------->


//MODIFICATION IMAGE
// VARIABLES GLOBALES
const TABLE_ENCODAGE_GRAY_CODE ={'a':'000000',
                    'b':'000001',
                    'c':'000011',
                    'd':'000010',
                    'e':'000110',
                    'f':'000111',
                    'g':'000101',
                    'h':'000100',
                    'i':'001100',
                    'j':'001101',
                    'k':'001111',
                    'l':'001110',
                    'm':'001010',
                    'n':'001011',
                    'o':'001001',
                    'p':'001000',
                    'q':'011000',
                    'r':'011001',
                    's':'011011',
                    't':'011010',
                    'u':'011110',
                    'v':'011111',
                    'w':'011101',
                    'x':'011100',
                    'y':'010100',
                    'z':'010101',
                    'A':'010111',
                    'B':'010110',
                    'C':'010010',
                    'D':'010011',
                    'E':'010001',
                    'F':'010000',
                    'G':'110000',
                    'H':'110001',
                    'I':'110011',
                    'J':'110010',
                    'K':'110110',
                    'L':'110111',
                    'M':'110101',
                    'N':'110100',
                    'O':'111100',
                    'P':'111101',
                    'Q':'111111',
                    'R':'111110',
                    'S':'111010',
                    'T':'111011',
                    'U':'111001',
                    'V':'111000',
                    'W':'101000',
                    'X':'101001',
                    'Y':'101011',
                    'Z':'101010',
                    0:'101110',
                    1:'101111',
                    2:'101101',
                    3:'101100',
                    4:'100100',
                    5:'100101',
                    6:'100111',
                    7:'100110',
                    8:'100010',
                    9:'100011'};

  const TABLE_DECODAGE=[[0.125,[0,0,0]],
  [0.250,[0,0,1]],
  [0.375,[0,1,1]],
  [0.500,[1,1,1]],
  [0.625,[1,1,0]],
  [0.750,[1,0,0]],
  [0.875,[1,0,1]],
  [1,[0,1,0]]]
  
  
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
    var listeRatio = photoWebcam.recuperationRatio(matriceContoursObjet);
    var graycode = photoWebcam.conversionGrayCode(listeRatio);
    var licence = photoWebcam.conversionLicence(graycode);
    console.log(licence)
    

});
