//MAIN ENCODEUR


var uneLicence = new Licence("1caZ9LuoKW");
var unEncodeur = new Encodeur(uneLicence.getNumLicence());
var unGrayCode = new GrayCode(unEncodeur.convertionGrayCode(uneLicence.getNumLicence()));
var uneListeBarre = new ListeBarre(unEncodeur.conversionBarres(unGrayCode.getGraycode()));
unEncodeur.genererCodeBarre(uneListeBarre.getListeBarre());