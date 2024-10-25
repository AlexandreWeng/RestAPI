const express = require('express');
const mysql = require('mysql');
const app = express();
const expressPort = 3000;

app.use(express.json());

const dataBase = mysql.createConnection({
    host: 'localhost', 
    port: '3306',
    user: 'root',
    password: 'root', 
    database: 'restaurant2'
});

dataBase.connect((err) => {
    if (err)
    {
        console.log('ERREUR SE CONNEXTION A LA DATABASE !');
    }else{
        console.log('BRAVO, VOUS ÊTES CONNECTE SUR LA DATABASE [RESTAURANT2] !');
    }
});

app.listen(expressPort, ()=>{
    console.log('MON SERVEUR TOURNE SUR LE PORT : ', expressPort)
});



app.get('/items', (req, res) => {
    const sql = `
        SELECT * FROM items
    `;

    dataBase.query(sql, (err, result) => { 
        if (err) {
            return res.status(500).json({ error: 'ERREUR DU SERVEUR' });
        } else if (result.length === 0) {
            return res.status(404).json({ error: 'Aucun item trouvé' });
        } else {
            return res.status(200).json(result); 
        }
    });
});



app.post('/items', (req, res) => {
    const { name, price, description, category_id } = req.body;
    const sqlItem = "INSERT INTO items (name, price, description) VALUES (?, ?, ?)";

    dataBase.query(sqlItem, [name, price, description], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        const itemId = result.insertId;
        const sqlItemCategory = "INSERT INTO items_category (itemId, category_id) VALUES (?, ?)";

        dataBase.query(sqlItemCategory, [itemId, category_id], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ message: "Item et catégorie ajoutés avec succès", itemId });
        });
    });
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, category_id } = req.body;

    const sqlUpdateItem = "UPDATE items SET name = ?, price = ?, description = ? WHERE id = ?";
    const sqlUpdateCategory = "UPDATE items_category SET category_id = ? WHERE itemId = ?";

    dataBase.query(sqlUpdateItem, [name, price, description, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "ERREUR DU SERVEUR" });
        }

        dataBase.query(sqlUpdateCategory, [category_id, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "ERREUR DU SERVEUR" });
            }
            return res.status(200).json({ message: "Item et catégorie mis à jour avec succès" });
        });
    });
});


app.delete('/items/:id', (req, res) => {
    const { id } = req.params;

    const sqlDeleteItemCategory = "DELETE FROM items_category WHERE itemId = ?";
    const sqlDeleteItem = "DELETE FROM items WHERE id = ?";
    
    dataBase.query(sqlDeleteItemCategory, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'ERREUR DU SERVEUR' });
        }

        dataBase.query(sqlDeleteItem, [id], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            } else if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Item non trouvé" });
            } else {
                return res.status(200).json({ message: 'Item supprimé avec succès' });
            }
        });
    });
});









