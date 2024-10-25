Restaurant API
Ce projet est une API REST permettant de créer, lire, mettre à jour et supprimer des éléments dans une base de données MySQL. L'API est connectée à une base de données "restaurant" (ou "restaurant2") via un serveur Node.js et permet de gérer les éléments et leur association avec des catégories.

Prérequis
Avant de démarrer, assurez-vous d'avoir les éléments suivants :

Node.js et npm - pour exécuter le serveur.
MySQL - pour gérer la base de données "restaurant" ou "restaurant2".
phpMyAdmin - pour visualiser et manipuler la base de données.
Postman - pour tester les endpoints de l'API.
Installation
Clonez le projet et accédez au dossier.

Installez les dépendances avec la commande suivante :

bash
Copier le code
npm install express mysql
Configuration
Assurez-vous que MySQL est configuré pour accepter les connexions locales avec les paramètres suivants :

user = root
password = root
database = restaurant (ou restaurant2)
port = 3306
Si ces informations diffèrent, modifiez la configuration dans le fichier index.js :

javascript
Copier le code
const dataBase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'root',
  database: 'restaurant' // ou 'restaurant2'
});
Démarrage du serveur
Lancez le serveur avec la commande suivante :

bash
Copier le code
npm start
Le serveur sera opérationnel sur le port 3000.

Utilisation de l'API
Voici une liste des routes disponibles et leur utilisation via Postman :

1. Récupérer des items par catégorie
URL : GET /items/:id_category
Description : Récupère les éléments associés à une catégorie donnée par son id.
Exemple : GET http://localhost:3000/items/1
2. Créer un item
URL : POST /create

Description : Crée un nouvel item avec un nom, un prix, une description, et une catégorie associée.

Body JSON :

json
Copier le code
{
  "name": "Nom de l'item",
  "prix": 10.99,
  "id_category": 1,
  "description": "Description de l'item"
}
Exemple : POST http://localhost:3000/create

3. Mettre à jour un item
URL : PUT /update/:id

Description : Met à jour les informations d'un item en fonction de son id.

Body JSON :

json
Copier le code
{
  "name": "Nom mis à jour",
  "prix": 12.99,
  "id_category": 2,
  "description": "Nouvelle description"
}
Exemple : PUT http://localhost:3000/update/1

4. Supprimer les items d'une catégorie
URL : DELETE /delete/:id_category
Description : Supprime tous les items associés à une catégorie en fonction de son id.
Exemple : DELETE http://localhost:3000/delete/1
