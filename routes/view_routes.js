const router = require('express').Router();
const User = require('../models/User');
const Vent = require('../models/Vent');

function isLoggedin(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

next();

function isAuthenticated(req, res, next) {
    const user_id = req.session.user;

    if (user_id) {
        const user = await User.findByPk(req.session.user_id);

        req.user = user;
    }

    next();
}

async function authenticate(req, res, next) {
    const user_id = req.session.user;

    if (user_id) {
        const user = await User.findByPk(req.session.user_id);

        req.user = user;
    }

    next();
}

router.get('/', authenticate, async (req, res) => {
    const vents = await Vent.findAll({
        include: {
            model: User,
            as: 'user'
        }
    });

    const ventsData = vents.map((vent) => vent.get({ plain: true }));
    console.log(ventsData);

    res.render('homepage', {
        user: req.user,
        vents: ventsData,
    });
}
);

router.get('/login', isLoggedin, authenticate (req, res) => {
    res.render('login_form', {
        errors: req.session.errors,
        user: req.user,
    });

    req.session.errors = [];
    });
    
    router.get('/register', isLoggedin, authenticate (req, res) => {
        res.render('register_form', {
            errors: req.session.errors,
            user: req.user,
        });
    
        req.session.errors = [];
        });
        
        router.get('/vent', isAuthenticated, authenticate (req, res) => {
            res.render('vent_form', {
                user: req.user,
            });
        });

        req.session.errors = [];

        module.exports = router;