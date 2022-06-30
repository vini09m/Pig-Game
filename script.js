'use strict';
//selecting elements
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const scoreE0=document.querySelector('#score--0');
const scoreE1=document.getElementById('score--1'); 
const currentE1=document.getElementById('current--0');
const currentE2=document.getElementById('current--1');

const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

//starting conditions
let scores;
let currentScore,activePlayer,playing;
const init=function(){
    scores=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

    scoreE0.textContent=0;
    scoreE1.textContent=0;
    currentE1.textContent=0;
    currentE2.textContent=0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


btnRoll.addEventListener('click',function(){
    if(playing){//1.generating random number
        const dice=Math.trunc(Math.random()*6)+1;
    
        //2.Display dice
        diceEl.classList.remove('hidden');
        diceEl.src=`dice-${dice}.png`;
    
        //check for rolled 1:if true,switch to next player
        if(dice != 1){
            //add dice to current score
            currentScore+=dice;
            //currentScore=9;
            console.log(currentScore);
            document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
             
        }else{
            //switch to next player
            switchPlayer();
        }}
    
});

btnHold.addEventListener('click',function(){
    if(playing){scores[activePlayer]+=currentScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    
        //check if score>=100 
        if(scores[activePlayer]>=20){
            playing=false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{switchPlayer();}}
   
});

btnNew.addEventListener('click',init);
