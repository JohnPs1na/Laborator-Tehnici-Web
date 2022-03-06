const fs = require("fs");

function readJSONFileApps() {
  return JSON.parse(fs.readFileSync("db.json"))["apps"];
}
module.exports.readJSONFileApps = () => {
  return JSON.parse(fs.readFileSync("db.json"))["apps"];
}

function readJSONFileUsers() {
  return JSON.parse(fs.readFileSync("db.json"))["users"];
  }

module.exports.readJSONFileUsers = () =>{
  return JSON.parse(fs.readFileSync("db.json"))["users"];
}


  
module.exports.writeJSONFileApps = (content) => {
    let contentU = readJSONFileUsers();
    fs.writeFileSync(
      "db.json",
      JSON.stringify({ apps: content,users:contentU }, null, 3),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

module.exports.writeJSONFileUsers = (content) =>{
  let contentA = readJSONFileApps();
  fs.writeFileSync(
    "db.json",
    JSON.stringify({apps:contentA,users:content},null,3),
    "utf8",
    err =>{
      if(err){
        console.log(err);
      }
    }
  )
}