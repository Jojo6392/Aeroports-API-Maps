
<!doctype html>
<html lang="fr">

<meta charset="UTF-8">

<form action="api/airports.php" method="POST">
    <p>Nom de l'aéroport : <input name="airport" type="text" required></p>
    <p>Latitude : <input type="number" name="lat" step="any" required></p>
    <p>Longitude : <input type="number" name="lng" step="any" required></p>
    <p><input type="submit" value="Créer"></p>
</form>

</html>