//MAIN


var uneLicence = new Licence("0irSYaSmn2");
var unGrayCode = new GrayCode(convertionGrayCode(uneLicence));
var uneListeBarre = new ListeBarre(conversionBarres(unGrayCode));
genererCodeBarre(uneListeBarre);