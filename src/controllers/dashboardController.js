exports.index = (req, res) => {
    if(!req.session.user) return  res.redirect('/login/index');
    res.render('dashboard');
}