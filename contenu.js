//recuperation de l'addresse dans l'url
const url = window.location.search.split("?url=").join("");

//recuperation des champs html
const content = document.getElementById('content')
const NomChamp = document.getElementById('NomChamp')
 const mot = document.getElementById('mots')
//fonction qui récupère les données
function getChamp() {
        const endpoint = `http://localhost:8000/${url}`;
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
    
                    data1+= `<li class="list-group-item">
                    ${data[i].mots['ecriture']}
                    
                    <span>${data[i].mots.Traduction[0].motTraduit}</span> <br>
                    <audio src="${data[i].mots.Traduction[0].audio}" controls></audio>
                    <p >${data[i].corpus}</p></li>
                    `
            i=i+1
                    }
                    content.innerHTML=data1
                    NomChamp.innerHTML=data[0].champ
                }
    
    }
    //i=i+1
      //  }

    }


getChamp()