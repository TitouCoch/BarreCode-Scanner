<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPORT-TRACK</title>
</head>
<body>
    <img id="logo" alt="logo" src="images/logoSportTrackV2Noir2.png">
    <h1>Inscription</h1>
    <form id="formulaireInscription" method="post" action="traitementInscription.php">
        <label for="numLicence">Numéro de licence</label>
        <input class="inputElement" name="numLicence" type="text" placeholder="Numéro de licence">

        <label for="email">Adresse mail</label>
        <input class="inputElement" name="email" type="email" placeholder="adresse mail">

        <label for="passwd">Mot de passe</label>
        <input class="inputElement" name="passwd" type="password" placeholder="Mot de passe">

        <input type="submit" value="Inscription">
        <p id=lienVersCo> Vous avez déjà un compte ? <a href="connexion.php"> Se connecter </a></p>
    </form>
    <?php 
        if(isset($_GET['err'])){
            if($_GET['err']=='alreadyUse'){
                print("<p class='erreur'> Licence déjà utilisé </p>");
            }
            elseif($_GET['err']=='notExiste'){
                print("<p class='erreur'> Licence inexistante </p>");
            }
        }
    ?>
</body>
</html>