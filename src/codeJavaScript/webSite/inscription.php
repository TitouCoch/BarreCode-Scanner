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
            <section class="sectionTitre">
                <h2 class="titrePage">Inscription</h2>
            </section>
            <section class="sectionPage">
                <form class="formulaire" action="traitementInscription.php" method="post">
                    <input class="inputElement" type="email" name="email" placeholder="Email*">
                    <input class="inputElement" type="password" name="passwd" placeholder="Mot de passe*">
                    <input class="inputElement" type="text" name="numLicence" placeholder="N° Licence*">
                    <div class="validConditionContainer">
                        <input class="checkBox" type="checkbox" name="validCondition">
                        <label for="validCondition">Accepter les <a href="#" >conditions générales d'utilisations</a></label>
                    </div>
                    <input class="buttonFormulaire" type="submit" value="S'INSCRIRE">
                </form>
                <p class="messageLinkToAnother">Vous avez déjà un compte ?</p>
                <p class="linkToAnother"><a href="connexion.php">Connexion</a></p>
            </section>
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
    </body>
</html>