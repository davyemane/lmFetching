
const DataForm = document.getElementById('ChampData')

if (DataForm) {
    DataForm.addEventListener('submit', addChamp)
}

function addChamp(e) {
    e.preventDefault();
    const endpoint = `http://localhost:8000/formation/champ_create/`
    let DataFormData = new FormData(DataForm);
    let ChampObjectData = Object.fromEntries(DataFormData)
    let bodyJsonData = JSON.stringify(ChampObjectData) 
    console.log(ChampObjectData)

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
        //return response.json()
        if (response.ok==true) {
            alert('insertion reussit')
            response.redirected = true
        }
    }).then(x=>{
        console.log('x',x)
    }).catch(error => {
        console.log('erreur', error)
    })
}