const express = require("express");
const router = express.Router();
module.exports = router;
const { addCoins, getAllMinMaxCoins, updateCoins, deleteCoins } = require("../controllers/coins")

// Buscar todas los coins
router.get("/", async (_req, res) => {
    try {
        const [bool, msj] = await getAllMinMaxCoins();

        bool ? res.send(msj) : res.send(msj);

    } catch (e) {
        res.status(500).send("Error al buscar los coins: " + e);
    }

});

// Agregar nuevas coins
router.post("/", async (req, res) => {
    try {
        const [bool, msj] = await addCoins(req.body);
        bool ? res.send(msj) : res.send(e);
    } catch (e) {
        res.status(500).send("Error an agregar coins: " + e);
    }
});

// Modificar coins
router.put("/", async (req, res) => {
    try {

        const [bool, msj] = await updateCoins(req.body);

        bool ? res.send(msj) : res.send(msj);

    } catch (e) {
        res.status(500).send("Error al actualizar: " + e);
    }
});

// Eliminar una coins
router.delete("/", async (req, res) => {
    try {
        const [bool, msj] = await deleteCoins(req.body);

        bool ? res.send(msj) : res.send(msj);

    } catch (e) {
        res.status(500).send("Error al eliminar un coinst: " + e);
    }
})