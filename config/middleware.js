
//Middleware has been used te set flash message in reponse locals so that it can be accessed in ejs template.
module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}