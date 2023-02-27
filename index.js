const url_Delete = window.location.search.split("?").join("")

const loginForm = document.getElementById('login-form');
const baseEndpoint = "http://localhost:8000"
const champ = document.getElementById('champ')

const url = document.getElementById('url')

if (loginForm) {
    loginForm.addEventListener('submit', getChamp)
}   

//fonction mère qui envoi les données au server d'api
function handleLogin(event) {
    event.preventDefault();
    const loginEndpoint = `${baseEndpoint}/api/token/`;
    let loginFormData = new FormData(loginForm);

    let loginObjectData = Object.fromEntries(loginFormData);

    let bodyJsonData = JSON.stringify(loginObjectData)

    const options ={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: bodyJsonData
    } 

    fetch(loginEndpoint, options)
    .then(response => {

        console.log(response)
        return response.json()
    }).then(authData=>{
        handleAuthData(authData, getChamp)
    })
    .catch(err=>{
        console.log('erreur', err)
    })


}

//fonction qui recupère le token d'authentification
function handleAuthData(authData, callback) {
    localStorage.setItem('access', authData.access);
    localStorage.setItem('refresh', authData.refresh);

    if (callback) {
        callback();
    }
}


//fonction qui récupère les données
function getChamp() {
        const endpoint = `${baseEndpoint}/formation/champ_List/`;
        const options = {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
            }
        }
        fetch(endpoint, options)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            writeTocontainer(data);
        })
}

// fonction qui ecrit dans le champ approprié
function writeTocontainer(data) {
    if (champ) {
        let data1=""
        var i=0  
        console.log(data.length)     
        while ( i < data.length) {
            
             
            //data.map((values)=>{

                data1+= `<a href="contenu.html?url=${data[i].url}">
                ${data[i].NomChamp}</a> 
                <a href="editChamp.html?${data[i].url_update}">
                $update</a>
                <a href="index.html?${data[i].url_Delete}">
                Delete</a>

                <br>`
        i=i+1
                }
                champ.innerHTML=data1

            }
    //i=i+1
      //  }

    }


getChamp()



function SupChamp(e) {
    const endpoint = `http://localhost:8000/${url_Delete}`
    const options = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
    }

    fetch(endpoint, options)
    .then(response =>{
        console.log('reponse',response)
        //return response.json()
        if (response.ok==true) {
            alert('object supprimer')
        }  
    }).then(x=>{
        console.log('x',x)
    }).catch(error => {
        console.log('erreur', error)
    })
}

SupChamp()