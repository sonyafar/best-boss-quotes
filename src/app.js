const refresh_button = document.getElementById('refresh_btn');
const share_button = document.getElementById('share_btn');

const api_link = document.getElementById('api_link');

const quote_list_toggle = document.getElementById('quote-list-wrapper');
const arrow = document.getElementById('arrow');
const quote_list = document.getElementById('quote-list');
const menu = document.getElementById('menu');


const popup_btn = document.getElementById('popup-btn');
const popup = document.getElementById('popup');
const close_btn = document.getElementById('close-btn');

let counter = 0;

let api = 'https://dunder-mifflin-api.vercel.app';

addAllEventListeners();

window.onload = () => {
    counter = 0;
    getQuote();
};


function getQuote() {
    let selector = (counter == 0) ? 0 : Math.floor(Math.random() * 2);
    switch(selector) {
        case 0: {
            getQuote_bestBossQuotesAPI();
            api = 'https://best-boss-quotes-api.sonyafar.workers.dev';
            api_link.innerHTML = '/ best-boss-quotes-api';
            break;
        }
        case 1: {
            getQuote_dunderMifflinAPI();
            api = 'https://dunder-mifflin-api.vercel.app'
            api_link.innerHTML = '/ dunder-mifflin-api';
        }
    }

    counter = counter + 1;
}

async function getQuote_bestBossQuotesAPI() {
    //Call the API
    const res = await fetch('https://best-boss-quotes-api.sonyafar.workers.dev', 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const quote = await res.json();

    //Set a random quote
    document.getElementById('quote').innerHTML = quote.quote;
}


async function getQuote_dunderMifflinAPI() {
    //Call the API
    const res = await fetch('https://dunder-mifflin-api.vercel.app/api/characters/one?find=MichaelScott&quotes', 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const quote = await res.json();

    //Set a random quote
    document.getElementById('quote').innerHTML = quote[0].quotes[Math.floor(Math.random() * quote[0].quotes.length)];
}


async function getQuote_theOfficeAPI() {
    //Call the API
    const res = await fetch('https://dunder-mifflin-api.vercel.app/api/characters/one?find=MichaelScott&quotes', 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const quote = await res.json();

    //Set a random quote
    document.getElementById('quote').innerHTML = quote[0].quotes[Math.floor(Math.random() * quote[0].quotes.length)];
}



async function getAll() {
    //Call the API
    const res = await fetch('https://best-boss-quotes-api.sonyafar.workers.dev/quotes', 
    {
        headers: {
            accept: 'application/json'
        }
    });

    const quotes = await res.json();

    //Fill the menu
    for( var i = 0; i < quotes.length; i++ )
    { 
        var obj = quotes[i];
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(obj));
        menu.appendChild(li);     
    } 
}

// Share the best quote
function share() {

    const url = encodeURI(window.location.href);
    let text = encodeURIComponent(`${document.getElementById('quote').innerHTML} - ${url}`);

    window.open(
        `https://twitter.com/intent/tweet?text=${text}`, 
        '_blank'
    );
}


// Add Event Listener to buttons and links
function addAllEventListeners() {
    refresh_button.addEventListener('click', getQuote );
    share_button.addEventListener('click', () => {
        share();
    })
    api_link.onclick = api_link.addEventListener('click', () => {
        window.open(api, '_blank');
    })
    quote_list_toggle.addEventListener('click', () => {
        if(quote_list.classList.contains('opened')) {
            quote_list_toggle.classList.remove('opened');
            arrow.innerHTML = '⬇️';
            quote_list.classList.remove('opened');
            menu.classList.remove('opened');
        }
        else {
            quote_list_toggle.classList.toggle('opened');
            arrow.innerHTML = '⬆️';
            quote_list.classList.toggle('opened');
            menu.classList.toggle('opened');
            getAll();
        }
    });

    popup_btn.addEventListener('click', () => {
        popup.classList.toggle('active');
    })

    close_btn.addEventListener('click', () => {
        popup.classList.remove('active');
    })

    window.addEventListener('click', ({target}) => {
        if(target == popup) {
            popup.classList.remove('active');
        }
    })
}