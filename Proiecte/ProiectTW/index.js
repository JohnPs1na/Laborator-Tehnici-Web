


window.onload = function () {
    
    function addUser() {
        var newUser = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email : document.getElementById("email").value
        }
        fetch("http://localhost:3000/users", {
            method: 'post', // semnalam faptul ca vrem sa introducem ceva nou in baza de date
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            console.log(response);
        })
    }

    var signUpBox = document.getElementById("signup-box");
    var loginBox = document.getElementById("login-box");
//LOG-IN / SIGN-UP code 
    var signUp = document.getElementById("sign-up");
    var logIn = document.getElementById("log-in");
    var editSubmit = document.getElementById("edit-submit");

    editSubmit.addEventListener("click", ()=>{
        editApp();
        document.getElementById("edit").style.display = "none"
    })

    logIn.addEventListener("click", () =>{
            if(loginBox.style.display === "none"){
                if(signUpBox.style.display === "block")
                {
                    signUpBox.style.display = "none";
                    loginBox.style.display = "block";                   //Login box display on click
                }
                else{   
                    loginBox.style.display = "block";
                }
            } else{
                loginBox.style.display = "none";
            }
    })

    signUp.addEventListener("click",()=>{

        if(signUpBox.style.display === "none"){
            if(loginBox.style.display === "block"){
                loginBox.style.display = "none";
                signUpBox.style.display = "block";
            }
            else{                                                       //signup box display on click
                signUpBox.style.display = "block";
            }
        }else{
            signUpBox.style.display = "none";
        }
    })
    var h3 = document.createElement("h3");
    var p = document.createElement("p");

    p.innerText = ""

    let sign = document.getElementById("signup-box");
    
    sign.appendChild(p)
    var signUpSubmit = document.getElementById("sign-up-submit")

    signUpSubmit.addEventListener("click", () =>{
        let userSign = document.getElementById("username").value;
        let passSign = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        let confirm = document.getElementById("confirm").value;


        if(userSign == "" || passSign == "" || email == "" || confirm ==""){
            p.innerText = "Complete all spaces!";
        }
        else if(passSign!=confirm){
            p.innerText = "Passwords Dont Match";
        }

        else{
            fetch('http://localhost:3000/users',{
                method: 'get'
            }).then(response =>{
                response.json().then((data) =>{
                    var x = 0;
                    for(let i = 0;i<data.length;i++){
                        if(data[i].username === userSign){
                            p.innerText = "User with this username already exists";
                            x = 1;
                        }
                        else if(data[i].email === email){
                            p.innerText = "User with this email already registered";
                            x = 1;
                        }
                    }
                    if(x === 0){
                        p.innerText = "";
                        addUser();
                    }
                })
            })
        }
    })

    

    //AICI SE AFLA Log-in SUBMIT BUTTON
    var submit = document.getElementById("submit");
    submit.onclick = function () {
        clickLogSub();                              //onclick
    }

    document.addEventListener('keypress',(e)=>{
        if(e.key === 'Enter'){                      //enter keypress for log in
            clickLogSub();
        }
    })

    var incorrect = document.createElement("p");
    document.getElementById("login-box").appendChild(incorrect); 

    function clickLogSub(){
        let userLog = document.getElementById("username-log").value;
        let passLog = document.getElementById("password-log").value;

        if(userLog == "" || passLog == ""){
            incorrect.innerHTML = "complete all spaces";
        }

        else{
            fetch('http://localhost:3000/users',{
                method: 'get'
            }).then(response =>{
                response.json().then((data) =>{
                    for(let i = 0;i<data.length;i++){
                        console.log(data[i].username,data[i].password);
                        if(data[i].username != userLog || data[i].password != passLog ){
                            incorrect.innerHTML = "username or password incorrect";
                        }
                        if(data[i].username == userLog && data[i].password == passLog){
                            {
                                document.getElementById("login-box").removeChild(incorrect);
                                document.getElementById("login-box").style.display = "none";
                                document.getElementById("sign-up").style.display = "none";                  //Submit button changes
                                document.getElementById("log-in").style.display = "none";
                                document.getElementById("add").style.display = "block";
                                //creez si stilizez un nod
                                h3.innerHTML = "Logged in as " + userLog;
                                h3.style.color = 'cyan';            
                                h3.style.fontFamily = 'Tahoma';
                                h3.style.display = 'inline';
    
                                //inserez nodul
                                document.getElementById("quit-thing").style.display = "inline";
                                document.getElementById("left_side").insertBefore(h3,document.getElementById("quit-thing"));
                                break;
                            }
                        }
                    }
                })
            })
        }
    }
    var quit = document.getElementById("quit");
    quit.onclick = function(){
        console.log("aici");
        let leftSide = document.getElementById("left_side");
        leftSide.removeChild(h3);
        document.getElementById("quit-thing").style.display = "none";       //ONCLICK
        document.getElementById("sign-up").style.display = "inline";
        document.getElementById("log-in").style.display = "inline";
        document.getElementById("add").style.display = "none";

    }



    
var appId;
    function fetchApps(){

        var playTerrainSection = document.getElementById("play-terrain-section");

        let applications = document.getElementById("applications");

        
        fetch("http://localhost:3000/apps",{
            method:'get'
        }).then(response => {
            response.json().then((data)=>{
                for(let i = 0; i < data.length; i++){
                    let app = document.createElement("div");
                    app.setAttribute("class","joc");
                    applications.appendChild(app);
                    
                    let i1 = document.createElement("div");
                    i1.setAttribute("class","i1");
                    i1.style.backgroundImage = `url("${data[i].img}")`
                    app.appendChild(i1);

                    let h1 = document.createElement("h1");
                    h1.setAttribute("id","gt");
                    h1.style.color = "white";
                    h1.innerHTML = `${data[i].name}`;
                    app.appendChild(h1);

                    let lis = document.createElement("div");
                    let li = document.createElement("li");
                    lis.setAttribute("class","lis");
                    let knop = document.createElement("button");

                    knop.onclick = function(){
                        deleteApp(data[i].id);
                    }

                    knop.innerHTML = "Delete me pls"
                    knop.setAttribute("class","inbtn");
                    li.appendChild(knop);
                    lis.appendChild(li);

                    let li1 = document.createElement("li");
                    let editBtn = document.createElement("button");
                    editBtn.setAttribute("class","inbtn");
                    editBtn.innerText = "Edit";

                    editBtn.onclick = function () {
                        document.getElementById("edit").style.display = "block";
                        document.getElementById("appName").value = data[i].name;
                        document.getElementById("appImg").value = data[i].img;
                        appId = data[i].id
                    }
                    li1.appendChild(editBtn)
                    lis.appendChild(li1)

                    app.appendChild(lis);

                }
            })
        })
    }

    var addSbm = document.getElementById("addsbm");
    addSbm.addEventListener("click",()=>{
        addApp();
    })
    fetchApps();

    function deleteApp(id){
        fetch("http://localhost:3000/apps/" + id,{
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response){
            window.location.reload();
        })
    }

    function editApp(){
        var name = document.getElementById("appName").value;
        var img = document.getElementById("appImg").value;
        var newApp ={
            name:name,
            img:img
        }
        fetch("http://localhost:3000/apps/" + appId,{
            method:'put',
            headers: {
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify(newApp)
        }).then(function(response) {

        })
    }

    function addApp(){
        var name = document.getElementById("app-name").value;
        var img = document.getElementById("app-img").value;

        if(name!="" && img!=""){
            console.log("aici");
            var newApp = {
                name: name,
                img:img
            }

            fetch("http://localhost:3000/apps",{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newApp)
            }).then(function(response){

            })
        }
    }
}

