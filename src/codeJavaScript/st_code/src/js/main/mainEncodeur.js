//MAIN ENCODEUR

function mainEncodeur(){
const name = document.getElementById('name').value;
console.log(name);
var uneLicence = new Licence(name);
var unEncodeur = new Encodeur(uneLicence.getNumLicence());
var unGrayCode = new GrayCode(unEncodeur.convertionGrayCode(uneLicence.getNumLicence()));
var uneListeBarre = new ListeBarre(unEncodeur.conversionBarres(unGrayCode.getGraycode()));
unEncodeur.genererCodeBarre(uneListeBarre.getListeBarre());

};