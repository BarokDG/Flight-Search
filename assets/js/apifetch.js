var form = document.getElementById('form')
var result = document.getElementById('result')
var search = document.querySelector("#searchBtn")
// form.addEventListener('submit',getData)
var jsonData






search.addEventListener("click",searchFlights )
function searchFlights(){
    var country = form.country.value
    var currency = form.currency.value
    var origin  = form.origin.value
    var destination = form.destination.value
    var obd = form.obd.value

    var data = loadData(country, currency, origin, destination, obd)
    displayResults(data)
    
}

function displayResults(data){
    data.then((flights) => { jsonData = flights }) 
    // jsonData contains returned json data
}




async function loadData(country,currency,origin,destination,obd){

    let result =  await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${obd}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d064331107msh09cdb17875f4ce2p120f58jsnf9fbfec77964",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
    .then(response => {
        return response
    })
    .catch(err => {
        console.error(err);
    });

    let data =result.json()
    return data
}



