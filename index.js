import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, update, orderByChild, query } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { language_liste_all } from "./language.js";
import { reference_liste_all } from "./reference.js"


const appSettings = {
    databaseURL: "https://project-wiki-clicker-default-rtdb.europe-west1.firebasedatabase.app/"

}
const click_bt = document.getElementById("click_bt")
const click_nb = document.getElementById("click_nb")
let wikiLinks = document.querySelectorAll(".wiki_link");

const language_add_price_html = document.getElementById('language_add_price')
const Money_Gen_display_nb = document.getElementById('Money_Generated_Display')
const reference_add_price = document.getElementById('reference_add_price')

const start_game = document.getElementById('start_game')
const first_message = document.getElementById('first_message')
const app = initializeApp(appSettings);
const database = getDatabase(app);
const leaderboardDB = ref(database, "leaderboardDB");

//language
const languageDropdown = document.getElementById('language_dropdown')
const languageDropdownContainer = document.getElementById('language_dropdown_container')
const languageAdd = document.getElementById('language_add')
const listeLanguage = document.getElementById('liste_language')
const language_v = document.getElementById('language_v')
let language_nb = +localStorage.getItem('languageData')

if (language_nb === 0) {
    language_nb = 1
    language_add_price_html.innerText = (1.15**language_nb).toFixed(2)+"$"
}   
else {
    language_v.innerText = language_nb + ' languages ⮛'
    for(let i = 0;i < language_nb;i++){
        listeLanguage.innerHTML += `<li>${language_liste_all[i]}</li>`

    }
    language_add_price_html.innerText = (1.15**language_nb).toFixed(2)+"$"+"$"
}   






start_game.addEventListener('click', function(){
    first_message.style.display = "none"
})


const username_display = document.getElementById('username_display')
const Change_username_HTML = document.getElementById('Change_username')
const Change_username_bt = document.getElementById('Change_username_bt')

let username = localStorage.getItem('username')
if (username === null) {
    username = "User Name"
}
username_display.innerText = username



Change_username_bt.addEventListener('click', function(){
    const NewName = Change_username_HTML.value
    username_display.innerText = NewName
    localStorage.setItem('username',NewName)
    Change_username_HTML.value = ""
    username = localStorage.getItem('username')
})


const timeSendHTML = document.getElementById('Time_played_html')
const user_container = document.getElementById('user_container')

let startTime = localStorage.getItem('startTime');

if (startTime === null) {
    startTime = new Date()
    localStorage.setItem('startTime', startTime) // Save the start time in local storage
} else {
    startTime = new Date(startTime) // Convert the stored string back to a Date object
}

user_container.addEventListener('mouseover', function() {
});

function logTimeSpent() {
    const endTime = new Date();
    const timeSpent = (endTime - startTime) / 1000; // Convert milliseconds to seconds

    const hour_timer = Math.floor(timeSpent/3600)
    const minute_spend = Math.floor((timeSpent % 3600) / 60)
    const second = Math.floor(timeSpent % 60)
    timeSendHTML.innerText = hour_timer + ":"+minute_spend + ":"+second
}



let cursor_price_html = document.getElementById('Cursor_Price')
let cursorData = +localStorage.getItem("cursorNB")
if (cursorData === 0) {
    cursor_price_html.innerText = "1.00$"
} 

let AllwikiLinkClicked =0
//ici
wikiLinks.forEach(function(element) {
    AllwikiLinkClicked++
    if (!element.hasClickListener) {
        element.addEventListener("click", function() {
        if (this.classList.contains("wiki_link")) {
            this.classList.remove("wiki_link")
            this.classList.add("wiki_link_clicked")
            wiki_article = wiki_article + 10
            displayWikiNb();
            AllwikiLinkClicked = AllwikiLinkClicked-1
            if (AllwikiLinkClicked === 0) {
                const Activate_bt3 = document.getElementById('NOC_button_3')
                Activate_bt3.classList.remove('NOC_button_off')
                Activate_bt3.classList.remove('NOC_3')
                Activate_bt3.classList.add('NOC_button')
                Activate_bt3.classList.add('NOC_3')
                localStorage.setItem('wikiLinkData',"yes")
            }
        }
    
    });
    element.hasClickListener = true
    }
})

const finishGame = document.getElementById('finish_game')
const felicitation_message = document.getElementById('felicitation_message')


finishGame.addEventListener('click',function(){
    felicitation_message.style.visibility = "hidden"
    window.open("https://en.wikipedia.org/wiki/Tarrare", "_blank")

})

const listeContributors = document.querySelectorAll('.NOC_button');

listeContributors.forEach(function (element) {
    // Use a unique identifier for each contributor, for example, class name
    const contributorKey = element.classList[1]

    // Retrieve the stored count from local storage or default to 0
    element.nb = parseInt(localStorage.getItem(contributorKey)) || 0 //retrieve NOCE_1/2/3/4/5
    element.addEventListener('mouseover',function(){
        if (!element.classList.contains("NOC_button_off")){
            let numberClassContributor = element.classList[1].slice(4)
            let selectDropDown = document.getElementById('NOC_dropdown'+element.classList[1].slice(4))
            selectDropDown.style.display = "block"; // Si oui, change le en 'block' pour le montrer
            selectDropDown.innerHTML = `<h3>Price:</><br><span class="number"> 
            ${((1+ numberClassContributor/10)**((3+numberClassContributor/10)*element.nb)).toFixed(2)+"$"}</span></h3>`        
        }
    })

    element.addEventListener('mouseleave', function() {
        if (!element.classList.contains("NOC_button_off")){
            let selectDropDown = document.getElementById('NOC_dropdown' + element.classList[1].slice(4))
            selectDropDown.style.display = "none"; // Hide the element when mouse leaves
        }  
    })
    element.addEventListener("click", function () {
        let selectSecondClass = element.classList[1]
        let numberClassContributor = +selectSecondClass.slice(4)
        let priceClassContributor = (1+ numberClassContributor/10)**((3+numberClassContributor/10)*element.nb)
        let addContributor = document.getElementById(selectSecondClass)
        if (element.nb < 100 && money_nb >= priceClassContributor) {
            money_nb = money_nb - priceClassContributor
            element.nb = element.nb + 1
            addContributor.innerText = element.nb

            // Save the updated count in local storage
            localStorage.setItem(contributorKey, element.nb)
        }
        let selectDropDown = document.getElementById('NOC_dropdown'+element.classList[1].slice(4))
        selectDropDown.innerHTML = `<h3>Price:</><br><span class="number"> 
        ${((1+ numberClassContributor/10)**((3+numberClassContributor/10)*element.nb)).toFixed(2)+"$"}</span></h3>`
    });
    element.classList.remove('NOC_button')
    element.classList.add('NOC_button_off')
    

});
//this code is to make sure that a button stayed active after f5
const Activate_bt1 = document.getElementById('NOC_button_1')
Activate_bt1.classList.remove('NOC_button_off')
Activate_bt1.classList.remove('NOC_1')
Activate_bt1.classList.add('NOC_button')
Activate_bt1.classList.add('NOC_1')
if (+language_nb > 1){
    const Activate_bt2 = document.getElementById('NOC_button_2')
    Activate_bt2.classList.remove('NOC_button_off')
    Activate_bt2.classList.remove('NOC_2')
    Activate_bt2.classList.add('NOC_button')
    Activate_bt2.classList.add('NOC_2')
}
if (localStorage.getItem('wikiLinkData') === "yes") {
    const Activate_bt3 = document.getElementById('NOC_button_3')
    Activate_bt3.classList.remove('NOC_button_off')
    Activate_bt3.classList.remove('NOC_3')
    Activate_bt3.classList.add('NOC_button')
    Activate_bt3.classList.add('NOC_3')
}
if (cursorData > 9){
    const Activate_bt4 = document.getElementById('NOC_button_4')
    Activate_bt4.classList.remove('NOC_button_off')
    Activate_bt4.classList.remove('NOC_4')
    Activate_bt4.classList.add('NOC_button')
    Activate_bt4.classList.add('NOC_4')
}
if (localStorage.getItem("ActivateNOC5") === "yes") { 
    const Activate_bt5 = document.getElementById('NOC_button_5')
    Activate_bt5.classList.remove('NOC_button_off')
    Activate_bt5.classList.remove('NOC_5')
    Activate_bt5.classList.add('NOC_button')
    Activate_bt5.classList.add('NOC_5')
}
if (localStorage.getItem("ActivateNOC6") === "yes") { 
    const Activate_bt6 = document.getElementById('NOC_button_6')
    Activate_bt6.classList.remove('NOC_button_off')
    Activate_bt6.classList.remove('NOC_6')
    Activate_bt6.classList.add('NOC_button')
    Activate_bt6.classList.add('NOC_6')
}
if (+localStorage.getItem("reference") > 4) { 
    const ActivateNOC7 = document.getElementById('NOC_button_7')
    ActivateNOC7.classList.remove('NOC_button_off')
    ActivateNOC7.classList.remove('NOC_7')
    ActivateNOC7.classList.add('NOC_button')
    ActivateNOC7.classList.add('NOC_7')
}
if (localStorage.getItem("ActivateNOC6") === "yes" && localStorage.getItem("ActivateNOC5") === "yes" && cursorData > 9 && +language_nb > 1 && localStorage.getItem('wikiLinkData') === "yes" && +localStorage.getItem("reference") > 4){
    const ActivateNOC8 = document.getElementById('NOC_button_8')
    ActivateNOC8.classList.remove('NOC_button_off')
    ActivateNOC8.classList.remove('NOC_8')
    ActivateNOC8.classList.add('NOC_button')
    ActivateNOC8.classList.add('NOC_8')

}


listeContributors.forEach(function (element) {
    // Use a unique identifier for each contributor, for example, class name
    const contributorKey = element.classList[1]

    // Retrieve the stored count from local storage or default to 0
    element.nb = parseInt(localStorage.getItem(contributorKey)) || 0

    let selectSecondClass = element.classList[1]
    let addContributor = document.getElementById(selectSecondClass)
    if (element.nb > 0){
        addContributor.innerText = element.nb
    }

})


const reference_add = document.getElementById('references_add_bt')
const referenceOl= document.getElementById('references_ol')

let referenceDATA = +localStorage.getItem('reference')

if (referenceDATA === null) {
    referenceDATA = 0;
    reference_add_price.innerText = 'Price : ' +(50+ 100*referenceDATA*4)
}   

else {
    reference_add_price.innerText = 'Price : ' +(50+ 100*referenceDATA*4)
    for(let i = 0;i < referenceDATA;i++){
        referenceOl.innerHTML += `<li class="reference_liste">${reference_liste_all[i]}</li>`
        wikiLinks = document.querySelectorAll(".wiki_link")
        localStorage.setItem("reference",referenceDATA)
        wikiLinks.forEach(function(element) {
            if (!element.hasClickListener) {
                element.addEventListener("click", function() {
                if (this.classList.contains("wiki_link")) {
                    this.classList.remove("wiki_link")
                    this.classList.add("wiki_link_clicked")
                    wiki_article = wiki_article + 10
                    displayWikiNb();
                }
            })
            }
        })

    }
}


setInterval(dayChange,1000)
let dayCount = 0

function dayChange() {
    if (dayCount === 0) {NewsHolidaysRefresh()}
    let daySelector = document.querySelectorAll(".LDS"+dayCount)

    daySelector.forEach(function(element){
        element.style.border = "1px solid rgb(162,169,177)"
    })
    dayCount++
    
    daySelector = document.querySelectorAll(".LDS"+dayCount)
    daySelector.forEach(function(element){
        element.style.border = "2px solid black"
    })
    if (dayCount === 8) {
        dayCount=0 
        once_a_week =0
    }
}

function NewsHolidaysRefresh() {

const news = document.querySelectorAll('.news')

news.forEach(function(cell){
    if (Math.random()*100 < 7){
        cell.innerText = "yes"
    }
    else {cell.innerText = "no"}
})

const holiday = document.querySelectorAll('.holiday')

holiday.forEach(function(cell){
    if (Math.random()*100 < 25){
        cell.innerText = "yes"
    }
    else {cell.innerText = "no"}
})
}

// selection the ligne calender that you want to activate
const daySelector = document.querySelectorAll(".day_selector");
let daySelectorCounter = 0

let daySelected = 0
let once_a_week = 0 //only change once a week

daySelector.forEach(function(element) {
    element.addEventListener("click", function() {
        if (daySelectorCounter < 1  && once_a_week === 0) {
            daySelectorCounter++
            once_a_week = 1
            daySelected = element.classList[1]
            document.querySelectorAll("."+daySelected).forEach(function(elem){
                elem.style.backgroundColor = 'rgb(188, 202, 230)'
            })
        }
        else if (element.style.backgroundColor === 'rgb(188, 202, 230)'){
            daySelectorCounter = 0
            document.querySelectorAll("."+element.classList[1]).forEach(function(elem){
                elem.style.backgroundColor = '#f2f4f7'
            })
            //element.style.backgroundColor = 'rgb(218, 223, 235)'
        }
    });
});

const calenderContainer = document.getElementById('calender_container')
const calenderClick = document.getElementById('calender_click')

calenderClick.addEventListener('click', function(){
    if (calenderContainer.style.display === "table"){
        calenderContainer.style.display = "none"
    }
    else {calenderContainer.style.display = "table"} 
})

const NocContainer = document.getElementById('NOC_container')
const NocClick = document.getElementById('NOC_click')

NocClick.addEventListener('click', function(){
    if (NocContainer.style.display === "block"){
        NocContainer.style.display = "none"
    }
    else {NocContainer.style.display = "block"}
    
})

const resetcontainer = document.getElementById('reset_container')
const GameReset = document.getElementById('GameReset')
GameReset.addEventListener('click', function(){
    
    if (resetcontainer.style.visibility === "visible"){
        resetcontainer.style.visibility = "hidden"
    }
    else {resetcontainer.style.visibility = "visible"}

    
})

const NOU_Display= document.getElementById('NOU_Display')

//NOU Number of user /day

let NOU_nb = 0
let MGD_nb = 0
function displayNou(){
    NOU_nb = Math.floor(wiki_article * (Math.floor(Math.random()*3+1)/10*222))
    NOU_nb = NOU_nb *(1.1**+referenceDATA+1)
    if (daySelected && dayCount) { // Make sure both variables are defined
        const dayNumber = +daySelected.slice(3); // Extract the day number from the daySelected string
    
        if (dayNumber === +dayCount) { // Only proceed if the correct day is selected
            const dayElements = document.querySelectorAll("." + daySelected); // Select all elements with the class name equal to the selected day
            
            let newsYes = false; // Initialize variables to track if news and holiday are present
            let holiYes = false;
    
            dayElements.forEach(function(element) {
                if (element.innerText === "yes") { // Check if the element contains "yes"
                    if (element.classList.contains("news")) { // Check if it's a news element
                        NOU_nb *= 2.6; // Update NOU_nb
                        newsYes = true; // Set newsYes flag to true
                    }                
                    if (element.classList.contains("holiday")) { // Check if it's a holiday element
                        NOU_nb *= 1.5; // Update NOU_nb
                        holiYes = true; // Set holiYes flag to true
                    }
                }
            
            });
    
            if (newsYes && holiYes) { // Check if both news and holiday flags are true
                const Activate_bt5 = document.getElementById('NOC_button_5')
                Activate_bt5.classList.remove('NOC_button_off')
                Activate_bt5.classList.remove('NOC_5')
                Activate_bt5.classList.add('NOC_button')
                Activate_bt5.classList.add('NOC_5')
                localStorage.setItem("ActivateNOC5",'yes')
            }
        }
    }
    if (NOU_nb>100000000) { // Check if both news and holiday flags are true
        const Activate_bt6 = document.getElementById('NOC_button_6')
        Activate_bt6.classList.remove('NOC_button_off')
        Activate_bt6.classList.remove('NOC_6')
        Activate_bt6.classList.add('NOC_button')
        Activate_bt6.classList.add('NOC_6')
        localStorage.setItem("ActivateNOC6","yes")
    }


 
    NOU_Display.innerText = Math.round(NOU_nb).toLocaleString('en-US')

    MGD_nb = NOU_nb /55555 //+ 0.06*cursorData

    

    Money_Gen_display_nb.innerText = MGD_nb.toFixed(2)+"$"
}



let money_nb = +localStorage.getItem('money_nb')

if (money_nb === null) {
    money_nb = 0;
}

const moneyDisplay = document.getElementById('money_Display')
let gameAlreadyfinishTrue = true


setInterval(generator,1000)

function generator(){
    generateWikiArticle()
    displayNou()
    money_nb_display()
    logTimeSpent()
    if (wiki_article > 6781547 && gameAlreadyfinishTrue){
        gameAlreadyfinishTrue = false
        felicitation_message.style.visibility = "visible"
        if (localStorage.getItem("fini") === null){
            console.log("cbon")
            const endTime = new Date();
            const timeSpent = (endTime - startTime) / 1000; // Convert milliseconds to seconds
            // Define new profile data
            const newProfile = {
                name: username,
                timestamp: timeSpent,
            }
            localStorage.setItem("fini","yes")
            // Add a new profile to the "testprofile" node
            push(leaderboardDB, newProfile)
        }
    }

    if (localStorage.getItem("ActivateNOC6") === "yes" && localStorage.getItem("ActivateNOC5") === "yes" && cursorData > 9 && +language_nb > 1 && localStorage.getItem('wikiLinkData') === "yes" && +localStorage.getItem("reference") > 4){
        const ActivateNOC8 = document.getElementById('NOC_button_8')
        ActivateNOC8.classList.remove('NOC_button_off')
        ActivateNOC8.classList.remove('NOC_8')
        ActivateNOC8.classList.add('NOC_button')
        ActivateNOC8.classList.add('NOC_8')

    }
}

function generateWikiArticle() {
    wiki_article = wiki_article + +localStorage.getItem("NOC_1")//dès le début
    +localStorage.getItem("NOC_2")/0.1*1.1 //achat 1 langue
    +localStorage.getItem("NOC_3")/0.1*4.6  // click on all the link
    +localStorage.getItem("NOC_4")/0.1*8.1 // achat 10 pointer 
    +localStorage.getItem("NOC_5")/0.1*12.6 // double yes 
    +localStorage.getItem("NOC_6")/0.1*16.1 // 1 000 000 viewer
    +localStorage.getItem("NOC_7")/0.1*20.6 // 10 reference
    +localStorage.getItem("NOC_8")/0.1*30 //tout acheter 5 exemplaire
    displayWikiNb()
}


function money_nb_display() {
    money_nb = money_nb + MGD_nb 
    localStorage.setItem('money_nb',money_nb)
    moneyDisplay.innerText = money_nb.toFixed(2)+"$"
}







let language_click_visibilite = true


languageDropdown.addEventListener('click', function(){
    if (languageDropdownContainer.style.display === "block" && language_click_visibilite === false) {
        languageDropdownContainer.style.display = "none"
    }
    else {languageDropdownContainer.style.display = "block"
    language_click_visibilite = false}
})

languageAdd.addEventListener('click',function(){
    if (money_nb > 1.15**language_nb){
        money_nb = money_nb- 1.15**language_nb
        listeLanguage.innerHTML += `<li>${language_liste_all[language_nb]}</li>`
        languageDropdownContainer.style.display = "block"
        language_click_visibilite = true
        language_nb++
        language_v.innerText = language_nb + ' languages ⮛'
        localStorage.setItem("languageData",language_nb)
        if (language_nb++ === 2){
            const Activate_bt2 = document.getElementById('NOC_button_2')
            Activate_bt2.classList.remove('NOC_button_off')
            Activate_bt2.classList.remove('NOC_2')
            Activate_bt2.classList.add('NOC_button')
            Activate_bt2.classList.add('NOC_2')
        }
    }
    language_add_price_html.innerText = (1.15**language_nb).toFixed(2)+"$"
})

//const cursorArray = [cursor]
let cursor_vitesse = 10


//click wikipedia article
let wiki_article = +localStorage.getItem('wikiArticle')

displayWikiNb()

click_bt.addEventListener('click',function(){
    wiki_article = wiki_article + +language_nb

    displayWikiNb()
})





function displayWikiNb() {
    click_nb.textContent = wiki_article.toLocaleString('en-US')
    localStorage.setItem('wikiArticle',wiki_article)
    displayNou()
}

const buyCrusor = document.getElementById('buy_cursor')
const moreCursor = document.getElementById('more_cursor')
//const cursorVitesse = document.getElementById('cursor_vitesse')

buyCrusor.addEventListener('click', addCursor);


if (cursorData > 0) {
    for (let i =0; i < +cursorData; i++){
        const newCursor = document.createElement('img')
        newCursor.src = 'images/cursosCookie.png'
        newCursor.style.transform = `rotate(${Math.random() * 320}deg)`
        newCursor.classList.add('cursors')
        moreCursor.appendChild(newCursor)
        newCursor.rotation = Math.random() * 360
    }
    cursor_price_html.innerText = (1.15**cursorData).toFixed(2) +"$"
}
function addCursor(){
    if (money_nb >= 1.15**cursorData){
        money_nb = money_nb- 1.15**cursorData
        const newCursor = document.createElement('img')
        newCursor.src = 'images/cursosCookie.png'
        newCursor.style.transform = `rotate(${Math.random() * 320}deg)`
        newCursor.classList.add('cursors')
        moreCursor.appendChild(newCursor)
        cursorData++
        localStorage.setItem("cursorNB",cursorData)
        newCursor.rotation = Math.random() * 360
    }
    cursor_price_html.innerText = (1.15**cursorData).toFixed(2) +"$"
    if (cursorData === 10){
        const Activate_bt4 = document.getElementById('NOC_button_4')
        Activate_bt4.classList.remove('NOC_button_off')
        Activate_bt4.classList.remove('NOC_4')
        Activate_bt4.classList.add('NOC_button')
        Activate_bt4.classList.add('NOC_4')
    }
}

setInterval(functRotate, cursor_vitesse)

function functRotate() {
    const cursors = document.querySelectorAll('.cursors')

    cursors.forEach(cursor => {
        cursor.rotation++
        if (cursor.rotation === 360) {
            cursor.rotation = 0
        }
        cursor.style.transform = 'rotate(' + cursor.rotation + 'deg)'
    })
}

reference_add.addEventListener('click',function(){
    if (referenceDATA<22 && money_nb > 50+100*referenceDATA*4){
        referenceOl.innerHTML += `<li class="reference_liste">${reference_liste_all[referenceDATA]}</li>`
        referenceDATA++
        wikiLinks = document.querySelectorAll(".wiki_link")
        localStorage.setItem("reference",referenceDATA)
        wikiLinks.forEach(function(element) {
            if (!element.hasClickListener) {
                element.addEventListener("click", function() {
                if (this.classList.contains("wiki_link")) {
                    this.classList.remove("wiki_link")
                    this.classList.add("wiki_link_clicked")
                    wiki_article = wiki_article + 10
                    displayWikiNb();
                }
            })
            element.hasClickListener = true
            }
        element.hasClickListener = true
        localStorage.clear()
        wiki_article = 0
        money_nb =0
        localStorage.setItem('startTime', startTime)
        localStorage.setItem("reference",referenceDATA)
        localStorage.setItem("wikiArticle",0)
        localStorage.setItem('money_nb',0)
        // Refresh the page
        location.reload()
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        })

        })
    }
})




const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');
const checkbox3 = document.getElementById('checkbox3');
const resetgame = document.querySelector('.reset_game_bt');

resetgame.addEventListener('click', function() {
    if (checkbox1.checked && checkbox2.checked && checkbox3.checked) {
        localStorage.clear();
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
        location.reload();
    }
});

// Create a reference to the testprofile node
const testProfileRef = ref(database, "leaderboardDB");
const leaderboard_list = document.getElementById('leaderboard_list')


const orderedLeaderboardDB = query(leaderboardDB, orderByChild("timestamp"));

onValue(orderedLeaderboardDB, (snapshot) => {
    if (snapshot.exists()) {
        console.log("Leaderboard:")
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key
            const childData = childSnapshot.val()

            const hour_timer = Math.floor(childData.timestamp/3600)
            const minute_spend = Math.floor((childData.timestamp % 3600) / 60)
            const second = Math.floor(childData.timestamp % 60)
            const ftime = hour_timer + ":"+minute_spend + ":"+second

            console.log(`${childData.name}: ${ftime}`)
            
            leaderboard_list.innerHTML += `<li>${childData.name} : ${ftime}</li>`
        });
    } 
})
