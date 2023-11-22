const router = require('express').Router();
const Vent = require('../../models/Vent');
const User = require('../../models/User');

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');


next();
}

async function authenticate(req, res, next) {
   const used_id = req.session.user;

   if (user_id) {
       const user = await User.findByPk(req.session.user_id);

       req.user = user;
   }

       next();
   }

   router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const user = await User.findByPk(user_id, {
            include: [Vent]
        });
        res.render('dashboard', { user });
    } catch (err) {
        res.status(500).send('Please login or register for an account');
        });

module.exports = router;