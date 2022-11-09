<?php
session_start();
if(isset($_SESSION['user'])){
    header('location: landing.php');
    exit;
}
?>

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
    <h1>Connexion</h1>
    <form method="post" action="traitementConnexion.php">
        <label for="email">Adresse mail</label>
        <input class="inputElement" name="email" placeholder="Adresse mail" type="email">

        <label for="passwd">Mot de passe</label>
        <input class="inputElement" name="passwd" placeholder="Mot de passe" type="password">

        <input type="submit" value="Connexion">
        <p id=lienVersCo> Vous n'avez pas de compte ? <a href="inscription.php"> S'inscrire </a></p>
    </form>
    <?php 
        if(isset($_GET['err'])){
            if($_GET['err']=='passwd'){
                print("<p class='erreur'> Mot de passe incorrect </p>");
            }
            elseif($_GET['err']=='mail'){
                print("<p class='erreur'> Adresse mail associée à aucun compte </p>");
            }
        }
    ?>
</body>
</html>