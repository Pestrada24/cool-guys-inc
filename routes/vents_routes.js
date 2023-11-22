const router = require('express').Router();

const User = require('./User');
const Vent = require('./Vent');

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

next();

async function authenticate(req, res, next) {
    const user_id = req.session.user;

    if (user_id) {
        const user = await User.findByPk(req.session.user_id);

        req.user = user;
    }

    next();
}

router.post('/vent', isAuthenticated, async (req, res) => {
    try {
        const vent = await Vent.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.json(vent);
    } catch (err) {
        res.status(500).json(err);
    }
}')

module.exports = router;