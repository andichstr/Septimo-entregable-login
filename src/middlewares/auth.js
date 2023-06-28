export function checkUser(req, res, next) {
    if (!!req.session.email) {
        return next();
    }
    return res.status(401).render('errorPage', { msg: 'Please log in' });
}

export function checkAdmin(req, res, next) {
    if (!!req.session.email && req.session.role == "admin") {
        return next();
    }
    return res.status(401).render('errorPage', { msg: 'No tenes acceso a esta vista. Solo para administradores' });
}