const express = require('express');
const router = express.Router();
module.exports = router;
const { createBDGameRoom, updateAddBDGameRoom, updateGameRoomConfig, updateDeleteBDGameRoom, seachAllBDGameRoom, deletByIdGameRoom } = require("../controllers/gameRoom");

// 1110

// const funSend = (res, [bool, msj])=> bool ? res.send(msj) : res.send(msj)


// Ruta para crear una nueva sala
router.post('/', async (req, res) => {
    try {
        const [bool, msj] = await createBDGameRoom(req.body);
        if (bool) {
            res.send(msj);
        } else {
            res.send('No se pudo crear la sala');
        }
    } catch (e) {
        res.status(500).send('Error al crear una sala: ' + e);
    }
});

// Ruta para agregar un usuario a la Sala
router.put("/", async (req, res) => {
    try {
        const [bool, msj] = await updateAddBDGameRoom(req.body);
        if (bool) {
            res.send(msj);
        } else {
            res.send(msj)
        }

    } catch (e) {
        console.log("Error al agregar un Usuario a una sala:", e)
        res.status(500).send("Error al agregar un Usuario a una sala: " + e);
    }


});


// Ruta para eliminar un usuario de la sala
router.put("/delete", async (req, res) => {

    try {
        const [bool, msj] = await updateDeleteBDGameRoom(req.body);
        if (bool) {
            res.send(msj);
        } else {
            res.send(msj)
        }

    } catch (e) {
        res.status(500).send("Error al eliminar un usuario de la sala: " + e);
    }


});

// Ruta para configurar la sala
router.put("/config", async (req, res) => {
    try {
        const [bool, msj] = await updateGameRoomConfig(req.body);
        if (bool) {
            res.send(msj);
        } else {
            res.send(msj)
        }

    } catch (e) {
        console.log("Error al agregar un Usuario a una sala:", e)
        res.status(500).send("Error al agregar un Usuario a una sala: " + e);
    }


})



// Ruta para eliminar una sala
router.delete("/:id", async (req, res) => {
    try {
        const [bool, msj] = await deletByIdGameRoom(req.params)
        if (bool) {
            res.send(msj);
        } else {
            res.send(msj)
        }
    } catch (e) {
        res.status(500).send("Error al eliminar una sala: " + e)
    }
})

// Ruta para obtener todas las salas
router.get("/", async (req, res) => {
    const { idRoom } = req.query
    try {
        const data = await seachAllBDGameRoom(idRoom);

        res.send(data);
    } catch (e) {
        res.status(500).send('Error al buscar una sala: ' + e);
    }
});
