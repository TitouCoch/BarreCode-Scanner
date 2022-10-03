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


var chaineCaractere = 'VT0410532';
chaineCaractere.encodeUnicode()






