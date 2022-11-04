//Fichier SCANNEUR du ST_CODE

//ANALYSE DE L'IMAGE----------------------------------------------->


//MODIFICATION IMAGE

//Initiation des variables
//Récupération des éléments de la page HTML par leur ID
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

//Ouverture du fichier dans les dossier de l'utilisateur
inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

//Une fois l'image charger la fonction suivante se lance
imgElement.onload = function () {
  let src = cv.imread(imgElement);  //Lecture de l'image avec la fonction imread de la bibliothèque OpenCV
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0); //Convertion de l'image en niveau de gris
  cv.threshold(src, src, 120, 200, cv.THRESH_BINARY); //Niveaux de gris convertient en binaire (blanc(0) ou noir(255)) en fonction de leurs valeurs de gris 
  let contours = new cv.MatVector();  //Création d'une variable matrice
  let hierarchy = new cv.Mat(); //Création d'une variable tableau à deux dimensions
  //Fonction qui récupère les contours de tous les objets
  cv.findContours(src, 
                  contours, 
                  hierarchy, 
                  cv.RETR_EXTERNAL/*Mode : récupère uniquement les contours extérieurs extrêmes*/ , 
                  cv.CHAIN_APPROX_SIMPLE/*Méthode : simplifie segments horizontaux/verticaux/diagonaux laisse uniquement extrémités*/);  

  
  //ANALYSE OBJET DANS L'IMAGE 

  const dicObjet = {} //Création d'une variable dictionnaire 
  //Boucle qui parcours tous les contours de l'image
  for (var i = 0; i < contours.size(); ++i) {
    var ci = contours.get(i)  //Récupération du contours courant dans une variable
    dicObjet[i] = []  //Ajout de clé dans le dictionnaire dicObjet
    //Boucle qui parcours le contours courant
    for (var j = 0; j < ci.data32S.length; j += 2) {
      var dicCoordonnee = {}  //Instanciation du dictionnaire dictTemp
      dicCoordonnee.x = ci.data32S[j] //Récupération de la coordonnée x
      dicCoordonnee.y = ci.data32S[j + 1] //Récupération de la coordonnée y
      dicObjet[i].push(dicCoordonnee);  //Ajout dans le dictionnaire dicObjet le dictionnaire p
    }
  }

  //RECUPERATION ET ORDRE DES OBJETS

  listeObjetTrie = []  //Création d'un tableau vide qui contiendra tous les objets de l'image
  listTemp = [] //Création d'un tableau vide temporaire
  //Boucle qui parcours tous les clés du dictionnaire dicObjet
  for (var i in dicObjet) {
    listTemp = dicObjet[i]; //Ajoute des informations de coordonnées (clés courante) dans la liste temporaire
    var tempYinitial = listTemp[0].y; //Récupération première coordonnée y (coorodnnée la plus basse de l'objet)
    var tempXinitial = listTemp[0].x; //Récupération première coordonnée x (permet de trié les objets selon l'axe x par la suite)
    var tempYsecond = 0;  //Création d'une variable de coordonnée Y initié à 0 
    //Boucle qui parcours la liste temporaire de coordonnée (pour chercher la coordonnée y la plus haute)
    for (let j = 0; j < listTemp.length; j++) {
      //Condition qui se vérifie si la coordonnée y courante et plus grande que la variable de coordonée la plus haute possible
      if (listTemp[j].y > tempYsecond) {
        tempYsecond = listTemp[j].y;  //Affectation de la coordonnée y la plus haute par la coordonnée y courante 
      }
    }
    var diff = tempYsecond - tempYinitial; //Hauteur de l'objet (différence entre max et min)
    var dicXetHauteur = {}  //Création d'un dictionnaire temporaire dicCoordonnee
    dicXetHauteur.x = tempXinitial  //Ajout de la coordonnée de x courant
    dicXetHauteur.y = diff  //Ajout de la hauteur de l'objet courant
    listeObjetTrie.push(dicXetHauteur);  //Ajout dans la liste objet du dictionnaire temporaire dictTemp
  }
  //Trie de la liste objet : pour  chaque objet comparaison de leurs valeur de x et trie en conséquence
  listeObjetTrie.sort(function (a, b) {
    return parseFloat(a.x) - parseFloat(b.x);
  });


  //CONVERTION DES HAUTEURS EN TAILLE STANDART

  listeHauteur = [] //Création d'une liste vide qui contiendra les hauteurs des barres

  ratio = listeObjetTrie[0].y / listeObjetTrie[1].y; //Affectation ratio : Division du premier objet (plus grand objet possible (logo)) par le deuxième (plus petit objet possible)
  
  //Notre but est maintenant de convertir grâce au ratio toutes les barres en 8 types (au maximum) de barre possible pour ensuite pouvoir les convertir en gray code
  petiteBarre = listeObjetTrie[1].y / ratio; //Division de la petite barre pour obtenir la taille standard de la barre 1
  listeConversionTypeBarre = [-1] //Création d'une liste contenant une valeur pour que la plus petite barre soit à l'indice 1

  //Boucle qui itère 8 fois en ajoutant un multiple de la variable petiteBarre comme taille standart pour les type de barre (1,2,3,4,5,6,7,8)
  for (var n = 1; n < 9; n++) {
    temp = petiteBarre * n;
    listeConversionTypeBarre.push(temp);  //Ajout du multiple de petiteBarre dans la liste listeConversionTypeBarre
  }

  //Boucle qui parcours tous les objets en commencant par le troisième (premier est le logo et le deuxième et la petite barre servant de reférence)
  for (let i = 2; i < listeObjetTrie.length; i++) {
    var temp = (listeObjetTrie[i].y / ratio);  //Création varaible temp : Divise chaque hauteur de barre par le ratio
    //Recherche à quel taille standart se rapproche le plus la variable temp
    var closest = listeConversionTypeBarre.reduce(function (prev, curr) {
      return (Math.abs(curr - temp) < Math.abs(prev - temp) ? curr : prev);
    });
    //On récupère l'indice dans la liste des type de barre 
    //qui correspond à la taille standart la plus proche de la variable temp
    //et on l'ajoute à la liste Hauteur
    listeHauteur.push(listeConversionTypeBarre.indexOf(closest));
    //On a donc convertie nos taille de barre en 8 types de barre(au maximum) allant de 1 à 8 compris
  }


  //DECODAGE EN GRAY CODE----------------------------------------------->

  
  //Fonction qui prend un tableau d'entier en entrée et qui après avoir décodé en gray code
  //retourne la chaine de caractère correspondante
  Array.prototype.decodeGrayCode = function () {
    //Type encodage en graycode
    //Initialisation de la table d'encodage en gray code pour les caractères prenant 6 bits d'encodage pour chaque caractère
    var listeEncodage = [['a', [0, 0, 0, 0, 0, 0]],
                        ['b', [0, 0, 0, 0, 0, 1]],
                        ['c', [0, 0, 0, 0, 1, 1]],
                        ['d', [0, 0, 0, 0, 1, 0]],
                        ['e', [0, 0, 0, 1, 1, 0]],
                        ['f', [0, 0, 0, 1, 1, 1]],
                        ['g', [0, 0, 0, 1, 0, 1]],
                        ['h', [0, 0, 0, 1, 0, 0]],
                        ['i', [0, 0, 1, 1, 0, 0]],
                        ['j', [0, 0, 1, 1, 0, 1]],
                        ['k', [0, 0, 1, 1, 1, 1]],
                        ['l', [0, 0, 1, 1, 1, 0]],
                        ['m', [0, 0, 1, 0, 1, 0]],
                        ['n', [0, 0, 1, 0, 1, 1]],
                        ['o', [0, 0, 1, 0, 0, 1]],
                        ['p', [0, 0, 1, 0, 0, 0]],
                        ['q', [0, 1, 1, 0, 0, 0]],
                        ['r', [0, 1, 1, 0, 0, 1]],
                        ['s', [0, 1, 1, 0, 1, 1]],
                        ['t', [0, 1, 1, 0, 1, 0]],
                        ['u', [0, 1, 1, 1, 1, 0]],
                        ['v', [0, 1, 1, 1, 1, 1]],
                        ['w', [0, 1, 1, 1, 0, 1]],
                        ['x', [0, 1, 1, 1, 0, 0]],
                        ['y', [0, 1, 0, 1, 0, 0]],
                        ['z', [0, 1, 0, 1, 0, 1]],
                        ['A', [0, 1, 0, 1, 1, 1]],
                        ['B', [0, 1, 0, 1, 1, 0]],
                        ['C', [0, 1, 0, 0, 1, 0]],
                        ['D', [0, 1, 0, 0, 1, 1]],
                        ['E', [0, 1, 0, 0, 0, 1]],
                        ['F', [0, 1, 0, 0, 0, 0]],
                        ['G', [1, 1, 0, 0, 0, 0]],
                        ['H', [1, 1, 0, 0, 0, 1]],
                        ['I', [1, 1, 0, 0, 1, 1]],
                        ['J', [1, 1, 0, 0, 1, 0]],
                        ['K', [1, 1, 0, 1, 1, 0]],
                        ['L', [1, 1, 0, 1, 1, 1]],
                        ['M', [1, 1, 0, 1, 0, 1]],
                        ['N', [1, 1, 0, 1, 0, 0]],
                        ['O', [1, 1, 1, 1, 0, 0]],
                        ['P', [1, 1, 1, 1, 0, 1]],
                        ['Q', [1, 1, 1, 1, 1, 1]],
                        ['R', [1, 1, 1, 1, 1, 0]],
                        ['S', [1, 1, 1, 0, 1, 0]],
                        ['T', [1, 1, 1, 0, 1, 1]],
                        ['U', [1, 1, 1, 0, 0, 1]],
                        ['V', [1, 1, 1, 0, 0, 0]],
                        ['W', [1, 0, 1, 0, 0, 0]],
                        ['X', [1, 0, 1, 0, 0, 1]],
                        ['Y', [1, 0, 1, 0, 1, 1]],
                        ['Z', [1, 0, 1, 0, 1, 0]]];
    //Initialisation de la table d'encodage en gray code pour les chiffres prenant 6 bits d'encodage pour chaque chiffre
    var listeEncodageInt = [[0, [1, 0, 1, 1, 1, 0]],
                            [1, [1, 0, 1, 1, 1, 1]],
                            [2, [1, 0, 1, 1, 0, 1]],
                            [3, [1, 0, 1, 1, 0, 0]],
                            [4, [1, 0, 0, 1, 0, 0]],
                            [5, [1, 0, 0, 1, 0, 1]],
                            [6, [1, 0, 0, 1, 1, 1]],
                            [7, [1, 0, 0, 1, 1, 0]],
                            [8, [1, 0, 0, 0, 1, 0]],
                            [9, [1, 0, 0, 0, 1, 1]]];
    //Initialisation de la table de correspondance entre les type de barre (1 à 8) et leurs valeurs binaire
    var typeBarre = [[1, [0, 0, 0]],
                    [2, [0, 0, 1]],
                    [3, [0, 1, 1]],
                    [4, [1, 1, 1]],
                    [5, [1, 1, 0]],
                    [6, [1, 0, 0]],
                    [7, [1, 0, 1]],
                    [8, [0, 1, 0]]];

    //Initialisation des variables
    var listeHauteur = this, license = "", listeGrayCodeTemp = [], temp = []

    //Convertion entier en gray code
    //Boucle qui parcours la liste des hauteurs de barre version standart (1 à 8)
    for (var i = 0; i < listeHauteur.length; i++) {
      //Boucle qui parcours la table de correspondance typeBarre
      for (var j = 0; j < typeBarre.length; j++) {
        //Condition qui se vérifie quand la valeurs courante de la liste hauteur est égale à une ddes valeurs de type barre
        if (listeHauteur[i] == typeBarre[j][0]) {
          //Ajoute des bits correspondant à la type de barre standart trouvée
          listeGrayCodeTemp.push(typeBarre[j][1][0]);  
          listeGrayCodeTemp.push(typeBarre[j][1][1]);
          listeGrayCodeTemp.push(typeBarre[j][1][2]);
          break;  //Sort de la boucle quand la correspondance est trouvée
        }
      }
    }

    //Convertion gray code en chaine de caractères
    //Boucle qui parcours la liste gray code complète 
    for (var c = 0; c < listeGrayCodeTemp.length+1; c++) {
      //Boucle qui itère 6 fois 
      for (var d = 0; d < 6; d++) {
        temp.push(listeGrayCodeTemp[d]); //Récupère la valeur courante de la liste listeGrayCode dans la liste temp
      }
        //Parcour de la table d'encodage des caractères
        for (var y = 0; y < listeEncodage.length; y++) {
          //Condition qui se vérifie si la liste temp et égale à la liste correspondante au caractère courant
          if (JSON.stringify(temp) === JSON.stringify(listeEncodage[y][1])) {
            license=license+listeEncodage[y][0]  //Si condition vérifiée on ajoute le caractère à la chaine de caractère license
            break;  //Sort de la boucle quand la correspondance est trouvée
          }
        }
        //Parcour de la table d'encodage des entiers
        for (var u = 0; u < listeEncodageInt.length; u++) {
          //Condition qui se vérifie si la liste temp et égale à la liste correspondante au chiffre courant
          if (JSON.stringify(temp) === JSON.stringify(listeEncodageInt[u][1])) {
            license= license+listeEncodageInt[u][0];  //Si condition vérifiée on ajoute le caractère à la chaine de caractère license
            break;  //Sort de la boucle quand la correspondance est trouvée
          }
        }
        //Boucle qui itère 6 fois
        for (var s = 0; s < 6; s++) {
          listeGrayCodeTemp.shift();  //On retire de la liste listeGrayCodeTemp la première valeur 
        }
        temp=[];  //Temp est remis en tant que liste vide
    }

    return license  //Retourne la chaine de caractère license décodée 
  }

    
    //Appelle de la fonction
    console.log(listeHauteur.decodeGrayCode())

    src.delete(); contours.delete(); hierarchy.delete();
  };


