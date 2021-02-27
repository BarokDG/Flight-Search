var form = document.getElementById('form')
var result = document.getElementById('loadData')
var search = document.querySelector("#searchBtn")
// form.addEventListener('submit',getData)
var jsonData

async function loadData(country,currency,origin,destination,obd){

    let result =  await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${obd}`, {
        "method": "GET",
        "headers": {
            "content-type" : "application/json",
            "x-rapidapi-key": "d064331107msh09cdb17875f4ce2p120f58jsnf9fbfec77964",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })

    let data = await result.json()
    return data
}

search.addEventListener("click",searchFlights )
function searchFlights(){
    var country = form.country.value
    var currency = form.currency.value
    var origin  = form.origin.value
    var destination = form.destination.value
    var obd = form.obd.value
    
    displayResults(country, currency, origin, destination, obd)
    
}

function displayResults(country, currency, origin, destination, obd){
    loadData(country, currency, origin, destination, obd).then( function(flights) { 
        jsonData = flights 
        console.log(flights);
        
        // jsonData contains returned json data
        let output = ''
        let table = []
        let carriers = {}
        let rowCount = 0
        for(let item in flights["Carriers"]){
            carriers[(flights["Carriers"][item]["CarrierId"])] = (flights["Carriers"][item]["Name"])
            // table[rowCount].push(flights["Quotes"][item]["MinPrice"])
        }
        
        for(let item in flights["Quotes"]){
            table.push([])
            table[rowCount].push(flights["Quotes"][item]["OutboundLeg"]["CarrierIds"][0])
            table[rowCount].push(flights["Quotes"][item]["MinPrice"])
            table[rowCount].push(flights["Quotes"][item]["OutboundLeg"]["DepartureDate"])
            rowCount += 1
        }

        console.log(table);

        for(let item in table){
            output += `
                    <tr>
                        <td>${carriers[table[item][0]]}</td>
                        <td>${table[item][1]}${form.currency.value}</td>
                        <td>${table[item][2]}</td>
                        <td>---</td>
                    </tr>
                    `
        }
        result.innerHTML = output;
    })
    .catch(function(err) {
        console.log(err);
    });
}