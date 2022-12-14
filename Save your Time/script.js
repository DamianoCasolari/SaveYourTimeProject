/*--OPERAZIONE PRELIMINARI--*/

//PREPARIAMO UNA CHIAVE PER LO STORAGE

const STORAGE_KEY = "__bool-xmas-list__"

//RACCOGLIAMO ELEMENTI DI INTERESSE HTML DOC

const totalSlot = document.querySelector(".total-slot");
const totalSlot2 = document.querySelector(".total-slot2");
const totalSlot3 = document.querySelector(".total-slot3");
const giftListElement = document.querySelector(".gift-list");

const form = document.querySelector("#gift-form");
const Name= document.querySelector("#input-name");
const Price = document.querySelector("#input-price");
const InfoGift = document.querySelector("#input-giftInfo");

// Prepariamo la lista

let gifts = [];

// controlla eventuali elementi salvati nello storage
    const prevList = localStorage.getItem(STORAGE_KEY);

    //se trovi elementi li aggiungi

    if(prevList) {
        // 1 sostituisci la lista precedente a quella vuota
        gifts = JSON.parse(prevList);

        // 2 ricolcola il totale
        calculateTotal();
        // 3 renderizza la lista aggiornata
        renderGift();
    }

/*----- eventi dinamici-----*/

// intercettiamo l'invio del form

form.addEventListener("submit",function(event){
    //1 blocca il ricaricamento della pagina per evitare perdita dati
    event.preventDefault();
    //2 raccogli i dati
    const nameValue = Name.value.trim();
    const priceValue = Price.value.trim();
    const InfoValue = InfoGift.value.trim();
    //3 aggiungere un regalo alla lista
    addGift(nameValue,priceValue,InfoValue);
    //4 pulire il form
    form.reset();
    //5 riporta il cursore sul primo campo
    Name.focus();
});

/*----- funzioni----*/

//funzione per aggiungere elemento alla lista
function addGift(nameValue,priceValue,InfoValue) {
    //1creo nuovo OGGETTO (quindi parentesi {}) che rappresenta il ragalo
    const newGift = {
        nameGift : nameValue,
        priceGift : Number(priceValue),
        infoGift : InfoValue
    };
    
    //2aggiungiamo l'oggetto alla lista
    gifts.push(newGift);
    console.log(newGift);




    // ! aggiornare il local storage
    localStorage.setItem(STORAGE_KEY,JSON.stringify(gifts));




    //3calcola totale
    calculateTotal();
    //4 renderizziamo la lista regali
    renderGift();
}

// funzione di calcolo del totale

function calculateTotal() {
    // 1 mi preparo a calcolare = creo la variabile da 0
    let total = 0;

    // 2 per ogni regalo
    for ( let i = 0; i < gifts.length; i++) {

    // 3 aggiungiamo il prezzo al totale
    total += gifts[i].priceGift;

    // 4 calcola e renderizza attività totali
    totalSlot3.innerText = i + 1;

    }

    //4 renderizza il totale nell'header-bottom
 
    totalSlot.innerText = formatAmount(Math.floor(total / 60));
    totalSlot2.innerText = formatAmount2(total % 60);
    
    console.log(total)

}

//------ funzione per formattare in ore e minuti la cifra-----

function formatAmount (amount) {
    return amount + " ore";

}

function formatAmount2 (amount) {
    return amount + " min";

}

//funzione per renderizzare lista regali
function renderGift() {
    // svuota la lista ogni giro lasciando solo l'ultima renderizzata
    giftListElement.innerHTML = "";

    //per tutti i regali 
    for ( let i = 0; i < gifts.length; i++) {

        
    
    // creo il codice per ogni singolo elemento della lista
    const giftElement = createListElement(i);

    // lo aggangio alla lista nella pagina

    giftListElement.innerHTML += giftElement;
    }

    // rendo cliccabile i buttons

    setdeletebuttom();

}
// funzione per creare un elemento della lista
function createListElement(i) {

   
    let currentImageindex = Math.round(Math.random() * 7); ;


    //restituisci il codice di regalo HTML nella lista
    return `
    <li class="gift-elements">
        <div class="infoNote">
             <img id = "previous-image" src="background/img_${currentImageindex}.jpg" alt = "immagine-1">
             <div class="gift-info">
                <h3>${gifts[i].nameGift}</h3>
                <p>${gifts[i].infoGift}</p>
            
            </div>
            <div class="gift-price">
            ${formatAmount2(gifts[i].priceGift )} 
            </div>
        </div>
        <button class="gift-button" data-index="${i}">❌</button>
        </li>`
}

//funzione per attivare i bottoni di cancellazione

function setdeletebuttom() {
    // 1 recupera tutti i bottoni dei regali
    const deleteButtons = document.querySelectorAll(".gift-button");

    // 2 per ognuno dei bottoni 
    for ( let i = 0; i < deleteButtons.length; i++) {
    // 3 recuoera singolo bottone
        const button = deleteButtons[i];
    // 4 aggiungo l'event listener
        button.addEventListener("click",function() {
            // 5 individuo l'index corrispondente
                 const index = button.dataset.index;

            // 6 rimuovo dalla lista il regalo corrispondente
                removeGift(index);

            
        } );
    }
}

// FUNZIONE PER RIMUOVERE UN REGALO DALLA LISTA 

function removeGift(index){

     // 1 rimuovo il regalo dalla lista
     gifts.splice(index,1);
     console.log(gifts);

     //! aggiorna la lista dopo gli eventuali rimozioni di elementi
     localStorage.setItem(STORAGE_KEY,JSON.stringify(gifts));

     //2 ricalcola il totale
     calculateTotal();
     //3 renderizzare la lista con gli elementi cancellato 
     renderGift();
}
