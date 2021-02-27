var form = document.getElementById('form')
var result = document.getElementById('result')
var search = document.querySelector("buttton")
// form.addEventListener('submit',getData)



var country = "US"
var currency = "USD"
var origin  = "SFO-sky"
var destination = "ORD-sky"
var obd = "2021-02-27"

fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${obd}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d064331107msh09cdb17875f4ce2p120f58jsnf9fbfec77964",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response.json());
})
.catch(err => {
	console.error(err);
});



