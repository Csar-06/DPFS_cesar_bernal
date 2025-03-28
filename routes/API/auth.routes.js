const express = require("express");
const router = express.Router();
const isAdmin = require('../../middlewares/auth-middleware')

router.get("/me",  (req, res) => {
    if (req.session.user) {
        return res.json({ user: req.session.user });
    }
    res.status(401).json({ message: "No autorizado" });
});

module.exports = router;
