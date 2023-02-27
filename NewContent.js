const baseEndpoint = "http://localhost:8000"
const champ = document.getElementById('ListChamp')
const mots = document.getElementById('mots')



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

            data1+= `<option value="${data[i].id_ChampLexicale}">${data[i].NomChamp}</option>`
    i=i+1
            } 
            champ.innerHTML=data1

        }}


        
        
        function getMots() {
            const endpoint = `http://localhost:8000/formation/Niveau/Mots/`;
            const options = {
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                }
            }
            fetch(endpoint, options)
            .then(response=>response.json())
            .then(das=>{
                console.log(das);
                writeMotsTocontainer(das);
            })
        }
        
        // fonction qui ecrit dans le champ approprié
        function writeMotsTocontainer(das) {
        if (mots) {
            let data2=""
            var i=0  
            console.log(das.length)     
            while ( i < das.length) {
                
                 
                //data.map((values)=>{
        
                    data2+= `<option value="${das[i].id_Mot}">${das[i].ecriture}</option>`
            i=i+1
                    } 
                    mots.innerHTML=data2
        
                }}
        


                const DataForm = document.getElementById('contenuForm')

                if (DataForm) {
                    DataForm.addEventListener('submit', addMot)
                }
                
                function addMot(e) {
                    e.preventDefault();
                    const endpoint = `http://localhost:8000/formation/champ/create`
                    let DataFormData = new FormData(DataForm);
                    let ChampObjectData = Object.fromEntries(DataFormData)
                    let bodyJsonData = JSON.stringify(ChampObjectData) 
                    console.log(bodyJsonData)
                
                    const options = {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                
                        body: bodyJsonData,
                    }
                
                    fetch(endpoint, options)
                    .then(response =>{
                        console.log('reponse',response)
                        return response.json()
                    }).then(x=>{
                        console.log('x',x)
                    }).catch(error => {
                        console.log('erreur', error)
                    })
                }
getChamp()
getMots()