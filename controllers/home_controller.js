module.exports.home=function(req,res){
    if(req.isAuthenticated()){ //if logged in sign up page shouldnt be shown
        return res.render('home', {title:'Home'});
     }
     return res.redirect('/users/sign-up');
}
// module.exports.actionName = function(req,res){}