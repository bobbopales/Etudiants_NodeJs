const express = require('express');
const app = express();
app.use(express.json());

const etudiants = require('./etudiants');

app.get('/api/etudiants', (req , res) => {
     res.json(etudiants);
})

app.post('/api/etudiants', (req, res ) =>{
    if(!req.body.nom){
        res.status(400)
        return res.json({error :"nom est obligatoire..."})
    }
    const user = {
        id : etudiants.length + 1, 
        nom : req.body.nom,
        prenom: req.body.prenom,
        age : req.body.age
    }
    etudiants.push(user)
    res.json(user)
})

app.put('/api/etudiants/:id', (req, res) => {
    let id = req.params.id
    let nom = req.body.nom
    let prenom = req.body.prenom
    let age = req.body.age

    let index = etudiants.findIndex((etudiant) => {
        return (etudiant.id == Number.parseInt(id))
        console.log(id, req.body, index);
    })

    if(index >= 0){
        let etu = etudiants[index]
        etu.prenom = prenom
        etu.nom = nom
        etu.age = age
        res.json(etu)
   } else {
    res.status(404)
   }
})

app.delete("/api/etudiants/:id", (req, res) => {
    let id = req.params.id;
    let index = etudiants.findIndex((etudiant) => {
        return (etudiant.id == Number.parseInt(id))

})
if(index >= 0) {
    let etu = etudiants[index]
    etudiants.splice(index, 1)
    res.json(etu)
} else {
    res.status(404)
}
})


app.listen(3000, function(){
    console.log('application started .... listening on port 3000');
})