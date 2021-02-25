const input = document.querySelector('#searchKey')
const btn = document.querySelector('button')
const historyList = document.querySelector('.list-group')

var searchHistoryIndex = 0

onload = displayHistory()

btn.addEventListener('click', searchFunction)

function searchFunction(){
    saveSearchRecord(input.value, Date())
}
function saveSearchRecord(searchKey, searchDate){
    searchHistoryIndex += 1
    let searchItem = {searchKey: searchKey, searchDate: searchDate}
    let siJSON = JSON.stringify(searchItem)
    localStorage.setItem(`searchItem${searchHistoryIndex}`, siJSON)
    displayHistory()
}

function displayHistory(){
    if(historyList.childElementCount == 0){
        for(let i = 0; i < localStorage.length; i++){
            let a = document.createElement('a')
            a.className = 'list-group-item list-group-item-action'
            
            let siJSON = localStorage.getItem(localStorage.key(i))
            let searchItem = JSON.parse(siJSON)
            
            a.textContent = `${searchItem.searchKey}                ${searchItem.searchDate}`

            historyList.appendChild(a)
        }
    }
    else{
        let a = document.createElement('a')
        a.className = 'list-group-item list-group-item-action'
        
        let siJSON = localStorage.getItem(localStorage.key(0))
        let searchItem = JSON.parse(siJSON)
        
        a.textContent = `${searchItem.searchKey}                ${searchItem.searchDate}`

        historyList.appendChild(a)
    }
}