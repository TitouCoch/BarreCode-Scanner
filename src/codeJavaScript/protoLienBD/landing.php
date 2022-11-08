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

//On récupère donc les données du joueur via la licence
$req = "SELECT * FROM joueur WHERE licence=:licence";
$req = $conn->prepare($req);
$req->execute(['licence'=>$licence]);
$res = $req->fetch();
$nom = $res['nom'];
$prenom = $res['prenom'];
$mail = $_SESSION['user'];
$poste = $res['poste'];
$idEquipe = $res['id_equipe'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing page</title>
</head>
<body>
    <div id="carteDeProfil">   
        <?php
        print("<p class='infoJoueur'> $nom </p>");
        print("<p class='infoJoueur'> $prenom </p>");
        print("<p class='infoJoueur'> $licence </p>");
        print("<p class='infoJoueur'> $mail </p>");
        print("<p class='infoJoueur'> $poste </p>");
        print("<p class='infoJoueur'> $idEquipe </p>");
        ?>
    </div>

    <a href="deconnexion.php">Déconnexion</a>
</body>
</html>
