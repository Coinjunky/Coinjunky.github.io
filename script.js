const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a Random Quote from apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author Field is Blank and replace with "Unknown"
  if (!quote.author) {
    authorText = 'Unknown';
  }
  else{
    authorText.textContent = quote.author;
  }
  //Check Quote Length to determin Style
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  }
  else{
    quoteText.classList.remove('long-quote');
  }
  //Set Quote and hidde Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

//Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
        getQuotes();
    }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();