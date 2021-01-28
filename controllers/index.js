exports.getHomePage = (req,res)=>{
    res.render('main',{layout:'layouts/main'});
};

exports.getDashboard = (req,res)=>{
    res.render('dashboard',{layout:'layouts/login'});
};