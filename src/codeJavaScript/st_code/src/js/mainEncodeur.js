//MAIN


var uneLicence = new Licence("3");
var unGrayCode = new GrayCode(convertionGrayCode(uneLicence));
var uneListeBarre = new ListeBarre(conversionBarres(unGrayCode));
genererCodeBarre(uneListeBarre);