const searchCountry = document.querySelector('#country')
const searchCurrency = document.querySelector("#currency")
const searchOrigin = document.querySelector("#origin")
const searchDestination = document.querySelector("#destination")

const spinner = document.querySelector('#spinner')

searchCountry.addEventListener('keydown', () => autocomplete(searchCountry, country_names))
searchCurrency.addEventListener('keydown', () => autocomplete(searchCurrency, unique_currencies))
searchOrigin.addEventListener('keydown', () => autocomplete(searchOrigin, cities))
searchDestination.addEventListener('keydown', () => autocomplete(searchDestination, cities))

var countries_dict = {}
var cities_dict = []

var cities = []

const country_names = []
const currencies = []

var unique_currencies = []

function loadData() {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/assets/jsonData/places.json')

        xhr.onload = function () {
            if (this.status === 200) {
                const places = JSON.parse(this.responseText);
                places.Continents.forEach((continent) => {
                    continent.Countries.forEach(country => {
                        countries_dict[country.Name] = country.Id

                        country_names.push(country.Name)
                        currencies.push(country.CurrencyId)

                        country.Cities.forEach(city => {
                            cities_dict[city.Name] = city.Id

                            cities.push(city.Name)
                        })
                    });
                });
                unique_currencies = [...new Set(currencies)]

                res(
                    console.log("Success")
                )
            }
        }

        xhr.send()
    })
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;

    /*execute a function when someone writes in the text field:*/

    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/

        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /*append the DIV element as a child of the autocomplete container:*/

        this.parentNode.appendChild(a);
        /*for each item in the array...*/

        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/

            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/

                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/

                if (inp == searchCountry || inp == searchCurrency){
                    b.innerHTML += "<input type='hidden' value='" + (countries_dict[arr[i]] ? countries_dict[arr[i]] : arr[i]) + "'>";
                }
                else {
                    let city = cities_dict[arr[i]]
                    b.innerHTML += "<input type='hidden' value='" + city.slice(0, (city.length - 1)) + "'>";
                }

                /*execute a function when someone clicks on the item value (DIV element):*/

                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/

                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/

            currentFocus++;
            /*and and make the current item more visible:*/

            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/

            currentFocus--;
            /*and and make the current item more visible:*/

            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/

            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/

                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/

        if (!x) return false;
        /*start by removing the "active" class on all items:*/

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/

        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/

        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/

        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

loadData().then(() => {
    spinner.style.display = "none";
})