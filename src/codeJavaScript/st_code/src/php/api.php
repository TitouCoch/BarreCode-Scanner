<?php
// Récupération du numéro de licence dans les données de la requête
$license = $_POST['license'];

// Requête à la base de données pour vérifier si le numéro de licence existe
$conn = new PDO('mysql:host=localhost;dbname=bd_sporttrack;charset=utf8','root','root');
$req = "SELECT * FROM Joueur WHERE licence = :licence";
$req = $conn->prepare($req);
$req->execute(['licence'=>$license]);
$res = $req->fetchAll();

// Vérification si le numéro de licence existe
if (count($res) > 0) {
  // Le numéro de licence existe
  $response = ['licenseExists' => true];
} else {
  // Le numéro de licence n'existe pas
  $response = ['licenseExists' => false];
}

// Retourne la réponse sous forme d'objet JSON
print(json_encode($response)); ?>