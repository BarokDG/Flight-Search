const input = document.querySelector('#searchKey')
const btn = document.querySelector('button')
const historyList = document.querySelector('#history')


onload = displayHistory()

btn.addEventListener('click', searchFunction)
function searchFunction(){
    saveSearchRecord(input.value, Date())
}

function saveSearchRecord(searchKey, searchDate){
    let shJSON
    if (localStorage.getItem('searchHistory') == null)
        localStorage.setItem('searchHistory', "{}")
    
    shJSON = localStorage.getItem('searchHistory')
    let searchHistory =  JSON.parse(shJSON)
    searchHistory[searchKey] = searchDate
    shJSON = JSON.stringify(searchHistory)    
    localStorage.setItem('searchHistory', shJSON)
    displayHistory()
}

function displayHistory(){
    while(historyList.childElementCount != 0){
        historyList.removeChild(historyList.firstChild)
    }

    if (localStorage.getItem('searchHistory') == null)
        localStorage.setItem('searchHistory', "{}")

    let shJSON = localStorage.getItem('searchHistory')
    let searchHistory = JSON.parse(shJSON)
    let searchHistoryList = []
    console.log(searchHistory);
    
    for (var key in searchHistory){
        let a = document.createElement('a')
        a.className = 'list-group-item list-group-item-action'
        a.textContent = `${key} \t\t\t\t${searchHistory[key]}`
        searchHistoryList.push(a)
    }

    for(const element of searchHistoryList.reverse())
        historyList.appendChild(element)
}