var express = require("express");
var router = express.Router();

const dbRepository = require("../repository/dbRepository");
const dbService = require("../service/dbService");

router.get("/apps",(req,res)=>{
    const appList = dbService.getAllApps();
    if(appList!=undefined && appList!=0){
        res.status(200).send(appList);
    } else {
        res.status(404).send("No apps");
    }
});

router.get("/users",(req,res) =>{
    let userList = dbService.getAllUsers();
    if(userList!=undefined && userList.length != 0){
        res.status(200).send(userList);
    }
    else{
        res.status(404).send("user not found")
    }
})


router.post("/apps", (req,res)=>{
    let newApp = dbService.addApp(req.body);
    res.status(200).send(newApp);
})

router.post("/users",(req,res)=>{
    let newUser = dbService.addUser(req.body);
    res.status(200).send(newUser);
})

router.get("apps/:id",(req,res)=>{
    let id = req.params.id;
    let app = dbService.getAppById(id);
    if(app === null){
        res.status(404).send("No app");
    } else {
        res.status(200).send(app);
    }
});



router.put("/apps/:id",(req,res)=>{
    let id = req.params.id;
    let app = dbService.updateApp(id,req.body);
    if(app !== null){
        res.status(200).send(app);
    }
    else {
        res.status(404).send("No app found");
    }
});

router.put("/users/:id",(req,res)=>{
    let id = req.params.id;
    let user = dbService.updateUser(id,req.body);
    if(user!==null){
        res.status(200).send(user)
    }
    else {
        res.status(404).send("No user found");
    }
})

router.delete("/apps/:id",(req,res) =>{
    let id = req.params.id;
    let flag = dbService.deleteApp(id);
    if(flag == true)
    {
        res.status(200).send("app deleted!");
    }
    else{
        res.status(404).send("No app found")
    }
})
module.exports = router;