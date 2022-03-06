const dbRepository = require("../repository/dbRepository");
const uuid = require("uuid");

module.exports.getAllApps = () => {
    let appList = dbRepository.readJSONFileApps();
    return appList;
}

module.exports.getAllUsers = () =>{
    let userList = dbRepository.readJSONFileUsers();
    return userList;
}

module.exports.addApp = (newApp) =>{
    const appList = dbRepository.readJSONFileApps();
    newApp.id = uuid.v4.apply();

    appList.push(newApp);
    dbRepository.writeJSONFileApps(appList);

    return newApp;
}

module.exports.addUser = (newUser)=>{
    const userList = dbRepository.readJSONFileUsers();
    newUser.id = uuid.v4.apply();

    userList.push(newUser);
    dbRepository.writeJSONFileUsers(userList);

    return newUser;
}

module.exports.getAppById = (id) =>{
    const appList = dbRepository.readJSONFileApps();
    let foundApp = null;
    appList.forEach(app =>{
        if(app.id === id){
            foundApp = app;
        }
    });
    return foundApp;
}

module.exports.getAppByName = (name) =>{
    const appList = dbRepository.readJSONFileApps();
    let foundApp = null;
    appList.forEach(app =>{
        if(app.name === name){
            foundApp = app;
        }
    });
    return foundApp;
}

module.exports.updateApp = (id,app) =>{
    const appList = dbRepository.readJSONFileApps();
    let updateApp = null;
    for(let i = 0;i<appList.length;i++){
        if(appList[i].id === id){
            if(app.name)
            {
                appList[i].name = app.name;
            }

            if(app.img){
                appList[i].img = app.img;
            }
            updateApp = appList[i];
            break;
        }
    }
    dbRepository.writeJSONFileApps(appList);
    return updateApp;
}
module.exports.deleteApp = (id) => {
    const appList = dbRepository.readJSONFileApps();
    let checkApp = false;
    for(let i = 0; i < appList.length; i++) {
        if(appList[i].id === id) {
            checkApp = true;
            appList.splice(i, 1);
            break;
        }
    }
    dbRepository.writeJSONFileApps(appList);
    return checkApp;
}