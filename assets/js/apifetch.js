$(document).ready(function () {
    var myTable = $('#data-table').DataTable();

    var form = document.getElementById('form')
    var search = document.querySelector("#searchBtn")

    search.addEventListener('click', displayData)

    async function loadData(country, currency, origin, destination, obd) {

        let result = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${obd}`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "x-rapidapi-key": "11a08a8211msh8578bdf05a9ed95p11e117jsnd72bdf0d38fe",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                }
            }).then(response => response.json())
            .then(response => {
                console.log("Success");
                return response
            })
            .catch(err => {
                console.error(err);
            });

        return result
    }

    function displayData() {
        // Input Variables

        var country = form.country.value
        var currency = form.currency.value
        var origin = form.origin.value
        var destination = form.destination.value
        var obd = form.obd.value

        loadData(country, currency, origin, destination, obd)
            .then(result => {
                var carrierList = {}
                result.Carriers.forEach(item => {
                    carrierList[item.CarrierId] = item.Name
                })

                result.Quotes.forEach((item, index) => {
                    var identifier = result.Quotes[index]
                    var id = identifier.OutboundLeg.CarrierIds

                    var append = [carrierList[id], identifier.MinPrice, identifier.OutboundLeg.DepartureDate, "Woohoo it works"]

                    myTable.row.add(append).draw()
                })
            })
    }
});