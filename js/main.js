var bookmarkName = document.getElementById('bookmarkName')
var websiteURL = document.getElementById('websiteURL')
var submit = document.getElementById('submit')
var data = document.getElementById('data')

var websitesList; 
if (localStorage.list != null){
    websitesList=JSON.parse(localStorage.getItem('list'))
    display()
} else{
    websitesList=[]
}
addToLocalStorage()

function addToLocalStorage(){
localStorage.setItem('list',JSON.stringify(websitesList))
}
function clearData(){
    bookmarkName.value=''
    websiteURL.value=''
}
function addURL(){
    if(nameValidation()==true && URLValidation()==true ){
        website={
            name:bookmarkName.value,
            url:websiteURL.value.toLowerCase().replace('https://',''),
        }
        websitesList.push(website);
        clearData();
        removeValidClass()
    } else {
        document.getElementById('offcanvas').classList.add('show')
            }addToLocalStorage();
display();
}
function display(){

        var list=''
        for (let i = 0; i < websitesList.length; i++) {
            list+=`<tr  class="text-center">
            <td>${i+1}</td>
            <td>${websitesList[i].name}</td>
            <td>
              <button id="visit" class="btn d-block m-auto border border-1">
                <a href="https:${websitesList[i].url}" target="_blank" rel="noopener noreferrer" class="text-decoration-none px-1">
                  <i class="fa-solid fa-eye pe-1"></i>
                  Visit</a>
                </button>
            </td>
            <td onclick="deleteURL(${i})">
              <button id="delete" class="btn px-2 d-block m-auto border border-1">
                <i class="fa-solid fa-trash px-1"></i>
                Delete</button>
            </td>
          </tr>`
            
        }
document.getElementById('data').innerHTML=list;        
    }
function deleteURL(index){
websitesList.splice(index,1);
display();
addToLocalStorage();
}



    function removeValidClass(){
        bookmarkName.classList.remove("is-valid")
        bookmarkName.classList.remove("is-invalid")
        websiteURL.classList.remove("is-valid")
        websiteURL.classList.remove("is-invalid")
    }

function nameValidation (){
    var patternName=/[a-zA-z1-9]{3,20}/g
    if(patternName.test(bookmarkName.value)){
        bookmarkName.classList.add("is-valid")
        bookmarkName.classList.remove("is-invalid")
        return true
    } else{
        bookmarkName.classList.add("is-invalid")
        bookmarkName.classList.remove("is-valid")
        return false
    }

}
function URLValidation (){
    var patternURL=/^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s]+$|www\.[^\s/$.?#]+\.[^\s]+$|[^\s/$.?#]+\.[^\s]+$/gm    
    if(patternURL.test(websiteURL.value)){
        websiteURL.classList.add("is-valid")
        websiteURL.classList.remove("is-invalid")
        return true
    } else{
        websiteURL.classList.add("is-invalid")
        websiteURL.classList.remove("is-valid")
        return false
    }

}

function closeOffcanvas(){
    document.getElementById('offcanvas').classList.remove('show')

}