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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPORT-TRACK</title>
</head>
<body>
    <h1>Connexion Sport Track</h1>
    <form method="post" action="traitementConnexion.php">
        <label for="email">Adresse mail</label>
        <input name="email" placeholder="Adresse mail" type="email">

        <label for="passwd">Mot de passe</label>
        <input name="passwd" placeholder="Mot de passe" type="password">

        <input type="submit" value="Connexion">
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