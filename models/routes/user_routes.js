const router = require('express').Router();

const User = require('../../models/User.js');

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.status(200).json(user);
        });
    } catch (err) {
        res.status(400).json(err);
    }
}
);

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user){
        req.session.errors = ['No user with that email address!'];

        return res.redirect('/login');
    }

    const  pass_is_valid = await user.checkPassword(req.body.password);

    if (!pass_is_valid){
        req.session.errors = ['Incorrect password!'];

        return res.redirect('/login');
    }

    req.session.user_id = user.id;

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {

        res.redirect('/');
    })

    module.exports = router;