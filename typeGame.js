const Api_TEXT = 'https://api.quotable.io/random';

let textRenderContainer = document.getElementById('textRender');
let inputRenderText = document.getElementById('quoteInput');
let timer = document.getElementById('counter');

let rightGuessDiv = document.getElementsByClassName('rightGuessDivClass')[0];

inputRenderText.addEventListener('input', ()=>{
    let arrayText = textRenderContainer.querySelectorAll('span');
    let inputedText = inputRenderText.value.split('');
    let quote = true;
    
    arrayText.forEach((charSpan, index)=>{
        const char = inputedText[index];
        if(char == null){
           charSpan.classList.remove('correct');  
           charSpan.classList.remove('incorrect');
           quote = false;
        } else if(char === charSpan.innerText){
           charSpan.classList.add('correct'); 
           charSpan.classList.remove('incorrect'); 
        } else {
           charSpan.classList.remove('correct'); 
           charSpan.classList.add('incorrect');
           quote = false;
        }
    });
 
    if(quote){
        renderText()
        outputCorrectText()
        startTimer()
    } 
    
});
// prihvatanje podataka sa API-ja
function init(){
    return fetch(Api_TEXT)
     .then(res => res.json())
        .then(data =>{ 
           return data;
    });
}
// prvo pokretanje tajmera 
let timeing = inputRenderText.addEventListener('keypress', ()=>{
    return startTimer()
}, {once:true});

// dodavanje i resetovanje citata direktno iz API-ja u centralni blok
let render;
async function renderText(){
    render = await init();
    let content = render.content;

    textRenderContainer.innerHTML = '';
   // rastavljanje svakog karaktera i zatim stavljanje u odvojene spanove
    content.split('').forEach((quote)=>{
        let quoteSpan = document.createElement('span');
        quoteSpan.innerHTML = quote;
        textRenderContainer.appendChild(quoteSpan);
    });
    
    inputRenderText.value = null;   
}

// resetovanje i dodela podataka u desni blok
async function outputCorrectText(){
    rightGuessDiv.innerHTML = '';
    
    let content = render.content;
    let author  = render.author;
    let length  = render.length;

    let contentPar = document.createElement('p');
    contentPar.classList.add('par');
    contentPar.innerHTML = `<b>Quote:</b> ${content}`;
    
    let authorPar = document.createElement('p');
    authorPar.classList.add('par');
    authorPar.innerHTML = `<b>Author:</b> ${author}`;
    
    let lengthPar = document.createElement('p');
    lengthPar.classList.add('par');
    lengthPar.innerHTML = `<b>Quote length:</b> ${length} characters`;
    
    let timerPar = document.createElement('p');
    timerPar.classList.add('par');
    timerPar.innerHTML = `<b>Time elapsed: ${timeNow} sec</b>`;
    
    rightGuessDiv.appendChild(contentPar);
    rightGuessDiv.appendChild(authorPar);
    rightGuessDiv.appendChild(lengthPar);
    rightGuessDiv.appendChild(timerPar);
    
    rightGuessDiv.style.display = 'block';
}
// funkcija za vreme
let startTime;
let timeNow;
function startTimer(){
    timer.innerText = 0;
    startTime = new Date();
    setInterval(()=>{
     timeNow = timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000); 
}

renderText();








