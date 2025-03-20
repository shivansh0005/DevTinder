 const admin=(req,res,next)=>{
    const token="xyz";

    if(token!="xyz"){
        res.status(401).send("Not Authorized");
    }
    else{
        next();
    }
}

module.exports = admin;