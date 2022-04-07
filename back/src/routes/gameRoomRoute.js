const express = require('express');
const router = express.Router();
module.exports = router;
const {
    createBDGameRoom,
    updateAddBDGameRoom,
    updateGameRoomConfig,
    updateDeleteBDGameRoom,
    startGameRoom,
    seachAllBDGameRoom,
    deletByIdGameRoom } = require("../controllers/gameRoom");

// 1110

// Rutas post


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


// Rutas put

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

// Ruta para configurar la sala
router.put("/starRoot", async (req, res) => {
    try {
        const [bool, msj] = await startGameRoom(req.body);

        if (bool) {
            res.send(msj);
        } else {
            res.send(msj)
        }

    } catch (e) {
        res.status(500).send("Error al iniciar la sala: " + e);
    }


})

// Rutas delete

// Ruta para eliminar una sala
router.delete("/:idRoom", async (req, res) => {
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


// Rutas get

// Ruta para obtener todas las salas
router.get("/", async (req, res) => {
    try {
        const [bool, data] = await seachAllBDGameRoom(req.query);

        if (bool) {
            res.send(data);
        } else {
            res.send(data);
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('Error al buscar una sala: ' + e);
    }
});
