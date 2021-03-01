// history dataset
let searchHistoryList = []
const country = form.country.value
const currency = form.currency.value
const origin  = form.origin.value
const destination = form.destination.value
const obd = form.obd.value

const btn = document.querySelector('button')
const historyList = document.querySelector('#loadDataHistory')
var search = document.querySelector("#searchBtn")


onload = displayHistory()

function saveSearchRecord(searchCountry, searchCurrency, searchOrigin, searchDestination, searchObd, searchDate) {
    let shJSON
    if (localStorage.getItem('searchHistory') == null)
        localStorage.setItem('searchHistory', "{}")
        
    if (searchCountry == '' || searchCurrency == '' || searchOrigin == '' || searchDestination == '' || searchObd == '')
        return
    
        shJSON = localStorage.getItem('searchHistory')
    let searchHistory = JSON.parse(shJSON)


    searchHistory[searchDate] = {
        searchCountry : searchCountry,
        searchCurrency : searchCurrency,
        searchOrigin : searchOrigin,
        searchDestination : searchDestination,
        searchObd : searchObd
    }
    
    shJSON = JSON.stringify(searchHistory)
    localStorage.setItem('searchHistory', shJSON)
    displayHistory()
}

function displayHistory() {
    if (localStorage.getItem('searchHistory') == null)
        localStorage.setItem('searchHistory', "{}")

    let shJSON = localStorage.getItem('searchHistory')
    let searchHistory = JSON.parse(shJSON)
    let output = []
    let i = 0

    for (var key in searchHistory) {
        searchHistoryList.push([])
    
        searchHistoryList[i].push(searchHistory[key]['searchCountry'])
        searchHistoryList[i].push(searchHistory[key]['searchCurrency'])
        searchHistoryList[i].push(searchHistory[key]['searchOrigin'])
        searchHistoryList[i].push(searchHistory[key]['searchDestination'])
        searchHistoryList[i].push(searchHistory[key]['searchObd'])
        searchHistoryList[i].push(key)
        
        i += 1
    }
}

historyList.addEventListener('click', enterIntoForm)
function enterIntoForm(e){
    let searchTD = e.target.parentElement
    form.country.value = searchTD.children[0].textContent
    form.currency.value = searchTD.children[1].textContent
    form.origin.value = searchTD.children[2].textContent
    form.destination.value = searchTD.children[3].textContent
    form.obd.value = searchTD.children[4].textContent
    form.scrollIntoView()
    form.focus()
    search.focus()
}
    
// $('table').DataTable({
// });