module.exports.home = async function(req, res){

    try{
         
        //Rendering Home Page
        return res.render('home', {
            title: "Login | Home"
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}