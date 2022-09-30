//-----------------------------------------------------------------------------------
//VERSION UNICODE 

var key = ['0', '1', '000','001','010','100','110','101','011','111']

String.prototype.encodeUnicode = function() {

  var chaineCaractere = this, result = [],encryped_string=[]

  for (var i=0; i<chaineCaractere.length;i++) result.push(chaineCaractere[i].charCodeAt(0).toString(2).match(/.{1,3}/g));
  for (var i=0; i<result.length; i++) 
  for (var j=0; j<result[i].length; j++) encryped_string.push(key.indexOf(result[i][j]));


  for (var a=0; a<encryped_string.length; a++) {
    temp=document.getElementById('vertical'+a);
    temp2 = 10*encryped_string[a]
    temp.style.height=`${temp2}px`
    temp.style.borderLeft="4px solid white"
    temp.style.display="inline-block"
    temp.style.marginLeft="5px"
    temp.style.borderRadius="5px"
  }

  return encryped_string
}


var chaineCaractere = 'aaaaaaaaa';
chaineCaractere.encodeUnicode()



//-------------------------------------------------------------------------------------
//VERSION BASE 36 - TABLE DE CRYPTAGE 

String.prototype.encodeBaseTrenteSix = function() {

  var chaineCaractere = this

  var tableCryptage = [['a',1,1],
                       ['b',1,2],
                       ['c',1,3],
                       ['d',1,4],
                       ['e',1,5],
                       ['f',1,6],
                       ['g',1,7],
                       ['h',1,8],
                       ['i',1,9],
                       ['j',2,0],
                       ['k',2,1],
                       ['l',2,2],
                       ['m',2,3],
                       ['n',2,4],
                       ['o',2,5],
                       ['p',2,6],
                       ['q',2,7],
                       ['r',2,8],
                       ['s',2,9],
                       ['t',3,0],
                       ['u',3,1],
                       ['v',3,2],
                       ['w',3,3],
                       ['x',3,4],
                       ['y',3,5],
                       ['z',3,6],
                      ];

var tableCryptageInt=[[0,3,7],
                      [1,3,8],
                      [2,3,9],
                      [3,4,0],
                      [4,4,1],
                      [5,4,2],
                      [6,4,3],
                      [7,4,4],
                      [8,4,5],
                      [9,4,6]];
  

  var compteur = 0
  for (var i=0; i<chaineCaractere.length;i++) {
    for(var a=0; a<tableCryptage.length;a++){
      if(chaineCaractere[i]==tableCryptage[a][0])
      {
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptage[a][1];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid white";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptage[a][2];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid white";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        break;
      }
    }
    for(var a=0; a<tableCryptageInt.length;a++){

      if(chaineCaractere[i]==tableCryptageInt[a][0])
      {
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptageInt[a][1];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid black";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptageInt[a][2];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid black";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        break;
      }
    }

  } 
  return chaineCaractere
}


var chaineCaractere = 'VT0410532';
//chaineCaractere.encodeBaseTrenteSix()




const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');

const constraints = {
  audio:true,
  video: {
    width:{min:1024, ideal:1200,max:1920},
    height:{min:576, ideal:720,max:1000}
  }
}


async function startWebCam() {
  try{
    const stream= await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    window.stream = stream;
  }catch(e){
    console.log(e.toString());
  }
}


var context = canvas.getContext('2d');

snap.addEventListener('click', () =>{
  context.drawImage(video,0,0,640,480);
});

startWebCam();