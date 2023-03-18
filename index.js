var xValues = ["lingala", "bulu", "tété", "Kituba", "Éton"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Langue en cours d'apprentissage"
    }
  }
});




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

                data1+= `<div class="col " style="height: 25%; width: 25%;">
                <button style="border: none; background: none;" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getContent(${data[i].id_ChampLexicale})">
                    <img src="img/house.png" class="p-3 btn-circle img-thumbnail " id="img" style=" height: 80%; width: 40%; margin-bottom: 0%;" alt="img" >
                    <p class="text-center" style="color: black;">${data[i].NomChamp}</p>
                </button>
            </div>
`
        i=i+1
                }
                champ.innerHTML=data1

            }
    //i=i+1
      //  }

    }

getChamp()

function getContent(urls) {


    const endpoint = `http://localhost:8000/formation/champ/?NomChamp=${urls}`;
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
        writeToModal(data);
    })
}

// fonction qui ecrit dans le champ approprié
function writeToModal(data) {

if (data.length==0 ) {
    alert('ce champ est vide')
} else {
    if (content) {
        let data1=""
        let data2 =""
        var i=0  
        console.log(data.length)     
        while ( i < data.length) {
            
             
            //data.map((values)=>{

                data1+= `<div>
                <h3>Mot Francais :${data[i].mots.ecriture}</h3>
                <p>${data[i].mots.Traduction[0].motTraduit}</p>
                <p style="font-style: italic;">${data[i].corpus}</p>
                <audio src="${data[i].mots.Traduction[0].audio}" controls></audio>
              </div>
    
                `
        i=i+1
                }
                content.innerHTML=data1
                if (NomChamps) {
                    NomChamps.innerHTML= data[0].champ
                }
            }

}
//i=i+1
  //  }

}


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
