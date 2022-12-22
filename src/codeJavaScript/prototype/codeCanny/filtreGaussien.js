const parametres = { video:true, audio:false};
var video = document.getElementById("player");
const photo = document.getElementById('canvas');
const hiddenCanva = document.getElementById('hiddenCanvas');
const context = photo.getContext('2d');
const boutonPhoto = document.getElementById('photo');
navigator.mediaDevices.getUserMedia(parametres).then(function(stream){player.srcObject = stream;});
console.log("ok");



const kernel =[[1,4,7,4,1],
    [4,16,26,16,4],
    [7,26,41,26,7],
    [4,16,26,16,4],
    [1,4,7,4,1]];



function filtreGaussian(img,dest){
    // recuperer la hauteur et largeur de la matrice
    let hauteur = img.rows;
    let largeur = img.cols;
    function changerPixel(i,j,val){
    dest.data[dest.step[0]*i + dest.step[1]*j] = val;
    };

    function matriceVoisins(Xpixel,Ypixel)
    {
        matriceResult = new Array();
        for(var i = 0; i <5; i ++)
            {   
                    matriceResult[i]= new Array(null,null,null,null,null)
            }
        var x = -1;
        var y = -1;
        for(var ligne =Xpixel-2; ligne <= Xpixel+2; ligne++)
        {
            y=-1;
            x++;
            for(var colonne =Ypixel-2;colonne <= Ypixel+2; colonne++)
            {
                y++;
                if(ligne >= 0 && colonne >= 0 && ligne <= hauteur && colonne <= largeur)
                {
                    //console.log(ligne,colonne);
                    matriceResult[x][y]=img.ucharAt(ligne,colonne);
                }
            }
            
        }
        return matriceResult;
    }


    // creer matrice des pixels voisin 
    //parcours complet la matrice img avec traitement systematique sur la matrice dest
    for(let i = 0; i < hauteur; i++)
        {
            for(let j = 0; j < largeur; j++)
            {
                // RECUPERER LES PIXELS AUTOUR DU PIXEL COURANT
                var matVoisin = matriceVoisins(i,j);
                // CALCULER LA NOUVELLE VALEUR DU PIXEL COURANT
                nouvelleValeur = CalculerValeurPixel(matVoisin);
                changerPixel(i,j,nouvelleValeur);
            };
        
        };
    
    return dest;
};
  
    
  function drawImg(){
    var videoCanvas = document.getElementById("videoCanvas");
    var ctx = videoCanvas.getContext('2d');
    videoCanvas.width = video.videoWidth;
    videoCanvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);  
    ctx.fillStyle = "#ffcc00";  
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


function scanner(){
    let imgElement = document.getElementById('hiddenCanvas');
    // scanne l'image
    let src = cv.imread(imgElement);
    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8U);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.imshow('canvasOutput2',src);
    let dest = src.clone();
    filtreGaussian(src,dest);
    cv.imshow('canvasOutput3',dest);
}



// TOUJOURS ACTIF
//--------------------------------------

    video.onplay = function() {
        setTimeout(drawImg , 300)};

//--------------------------------------

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
    scanner();
    
});
 
function countValueExceptNull(matrice)
{
    var result=0;
    for(let row=0;row<5; row++)
    {
        for(var column=0; column<5; column++)
        {
            if(!!matrice[row][column])
            { 
                result += kernel[row][column];
            }
        }
    }
    return result;
}
   
function CalculerValeurPixel(matricePixelsVoisins){
    var somme = 0;
    
    for(let row=0;row < kernel.length; row++)
        {
        for(var column=0; column < kernel[row].length; column++)
        {   
            somme += kernel[row][column]*matricePixelsVoisins[row][column];
        }
        }
    var nbValue = countValueExceptNull(matricePixelsVoisins);
    var pixelModifie = somme/nbValue;
    return pixelModifie;
    
};