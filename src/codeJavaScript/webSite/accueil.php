<?php
//On démarre la session
session_start();
//On verifie qu'une session est active
if(!isset($_SESSION['user'])){
    header('location: connexion.php');
    exit;
}
//On se connect à la base de donnée
$conn = new PDO('mysql:host=localhost;dbname=bd_sporttrack;charset=utf8','root','');

//On récupère les données de l'user 
$req = "SELECT * FROM inscrit WHERE mail=:mail";
$req = $conn->prepare($req);
$req->execute(['mail'=>$_SESSION['user']]);
$res = $req->fetch();
$licence = $res['licence'];
?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <!-- En-tête de la page -->
        <meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="style.css" />
        <title>Sport Track</title>
    </head>
    <body>
        <!-- Corps de la page -->
        <header>
            <img id="logoPage" alt="Logo de Sport Track" src="img/logoSportTrack.svg">
            <hr id="sepHeader">
            <nav id="barreNav">
                <ul>
                    <li class="elementBarreNav"><a href="accueil.php">Accueil</a></li>
                    <li class="elementBarreNav"><a href="#">Calendrier</a></li>
                    <li class="elementBarreNav"><a href="#">Profil</a></li>
                    <li class="elementBarreNav"><a href="#">Message</a></li>
                </ul>
            </nav>
        </header>
        
        <main>
            <!-- ICI CODER LA PAGE -->
            <section class="sectionTitre">
                <h2 class="titrePage">Bienvenue !</h2>
            </section>
            <section id = "sectionSTCODE">
            <div class="divBarres">
                <img id="imageLogoST" src="img/logoWhiteSTCODE.png">
                <span id="vertical0"></span>
                <span id="vertical1"></span>
                <span id="vertical2"></span>
                <span id="vertical3"></span>
                <span id="vertical4"></span>
                <span id="vertical5"></span>
                <span id="vertical6"></span>
                <span id="vertical7"></span>
                <span id="vertical8"></span>
                <span id="vertical9"></span>
                <span id="vertical10"></span>
                <span id="vertical11"></span>
                <span id="vertical12"></span>
                <span id="vertical13"></span>
                <span id="vertical14"></span>
                <span id="vertical15"></span>
                <span id="vertical16"></span>
                <span id="vertical17"></span>
                <span id="vertical18"></span>
                <span id="vertical19"></span>
                <span id="vertical20"></span>
            </div>
                <p id="licenceHiding"><?php print($licence) ?></p>
                <button id="buttonStCode"> Agrandir le STCODE</button>
            </section>
            <a href="deconnexion.php">Déconnexion</a>
        </main>
        
        <footer>
            <section id="sectionMention">
                <a class="lienFooter" href="#"><p>Mentions légales</p></a>
                <a class="lienFooter" href="#"><p>Conditions d'utilisations</p></a>
            </section>
            <section id="sectionLogoFooter">
                <img alt="logoSportTrack" src="img/logoSportTrackWhite.svg" id="footerLogo">
            </section>
            <section id="newsLetterSection">
                <p id="titreNewsLetter">Rejoindre le Club Sport Track !</p>
                <form action="" method="post">
                    <input class="inputNewsLetter" name="mailNewsLetter" placeholder="Adresse e-mail">
                    <div class="validConditionContainer"  >
                        <input class="checkBox" type="checkbox" name="validConditionNews">
                        <p class="texteConditionNewsLetter">J'accepte de recevoir chaque mois les nouveautés sportives de la part de Sport Track. 
                        </p>
                    </div>
                    <div class="validConditionContainer"  >
                        <input class="checkBox" type="checkbox" name="validConditionAds">
                        <p class="texteConditionNewsLetter">J'accepte de recevoir des publicités de nos partenaires.</p>
                    </div>
                    <p class="texteConditionNewsLetter">Vous affirmez avoir pris connaissance de notre <a href="#">Politique de confidentialité.</a></br> Vous pouvez à tout moment vous désinscrire en utilisant le lien de désabonnement intégré dans nos emails.</p>
                    <input id="buttonFormulaireNewsLetter" type="submit" value="S'ABONNER">
                </form>           
            </section>
        </footer>
        <script src="scripts/licence.js"></script>
        <script src="scripts/photo.js"></script>
        <script src="scripts/main.js"></script>
    </body>
</html>