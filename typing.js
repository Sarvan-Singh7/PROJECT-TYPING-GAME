// CHANGES ADDED SECONDS FUNCTIONALITY -----------document.getElementById('info').innerHTML=(gameTime/1000) + ' seconds'; 
//THERE ARE ALSO SOME OF THE MINOR CHANGES IN THE CODE LIKE ADDING CLASS TO THE CURRENT WORD AND LETTER

const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');

const wordsCount=words.length;
  //timer  15 seconds as reprented in milliseconds
const gameTime=15*1000;  //TIMER-1-----
window.timer=null;
window.gameStart=null;   //on the beggining used to add class
function addClass(el,name){   
  el.className += ' ' + name;
}

function removeClass(el,name){   //when want to remove class
  el.className = el.className.replace(name,'');
}

function randomWord(){  //this function will return a random word from the words array
  const randomIndex=Math.ceil(Math.random()* wordsCount)
  return words[randomIndex-1];
}

function formatWord(word){    // wrap each word in a div and than wrap each letter in a span 
  return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame(){       //this function shows the words
  document.getElementById('words').innerHTML=' ';
  for(let i=0;i<200;i++){
    document.getElementById('words').innerHTML+=formatWord(randomWord());
  }   
  addClass(document.querySelector('.word'),'current');  //both used to get current word
  addClass(document.querySelector('.letter'),'current');//both used to get current letter
  //these upper both made just to know that at a given letter we are typing right or not by comparing these arraytext value to below wali key value

  document.getElementById('info').innerHTML=(gameTime/1000) + ' seconds';    //yahan se time set kar skte hai  ki kitne seconds dena hai

  window.timer=null;//TIMER -2-----
}

///////WPM COUNTER////////////////////////////////

function getWpm(){
  const words=[...document.querySelectorAll('.word')]; //getting all words so spread operator
  const lastTypedWord=document.querySelector('.word.current'); //getting current word as to calculate previous typed
  const lastTypedWordIndex=words.indexOf(lastTypedWord);//get index of last typed word.
  const typedWords=words.slice(0,lastTypedWordIndex); //get all words before the current wordor last typed word
  
  const correctWords= typedWords.filter(word => {
    const letters=[...word.children];  //get all the letters means span wale all alpha.
    const incorrectLetters=letters.filter(letter=>letter.className.includes('incorrect')); //filter out all the incorrect letters
    const correctLetters=letters.filter(letter=>letter.className.includes('correct')); //filter out all the correct letters
    return incorrectLetters.length===0 && correctLetters.length===letters.length; //if no incorrect letters and all letters are correct then only return true
  })
  
  return correctWords.length/gameTime*60000;  //return the count of correct words

}


/////////////TIMER-4-----------------
function gameOver(){
  clearInterval(window.timer);
  addClass(document.getElementById('game'),'over');  //game stops
  document.getElementById('info').innerHTML=`WPM: ${getWpm()}`///see that getWpm function called here so whwnever timer hit 0 it will be triggered.
}

//MAGIC HAPPENS HERE  ALL THINGS COVERED
document.getElementById('game').addEventListener('keyup', (ev) => {//In each Enter we get value in key   all things done in this
  const Key=ev.key;
  const currentWord=document.querySelector('.word.current');
  const currentLetter=document.querySelector('.letter.current');
  const expected=currentLetter?.innerHTML|| ' ';  //if we do not have current element in html so get empty space so in order to shift to another word.
  const isLetter=Key.length===1 && Key!==' ';     //this is used to get single letter and exclude space as key is pressed
  const ifSpace=Key===' ';   //need to check if space in the way.

  if(document.querySelector('#game.over')){///TIMER--5-----

    return;   //GAME STOPS
  }


  console.log({Key,expected});   //KEY WALE MEIN TYPED AND EXPECTED WALE MEIN ORIGINAL LETTER HAI


  if(!window.timer && isLetter){   /////TIMER-3------
    window.timer = setInterval(() => {
      if(!window.gameStart){
         window.gameStart=(new Date()).getTime();  //it will give time after 30 sec from now
      }
      const currentTime=(new Date()).getTime();
      const msPassed=currentTime-window.gameStart;
      const sPassed=Math.round(msPassed/1000);
      const sLeft=(gameTime /1000) - sPassed;
      if(sLeft <=0 ){
        gameOver();
        return;     //return is mendatory because it is last point of calculating WPM.
      }
      document.getElementById('info').innerHTML=sLeft +'';  //update the ui info element with the elapsed time
    }, 1000);
    
  }


  if(isLetter){       //main work of red or green work here
    if(currentLetter){
      addClass(currentLetter, Key === expected ? 'correct' : 'incorrect');  //this alone gives either red or green color on incorrect and correct  also it is not moving to next span so inorder to move do following steps
      removeClass(currentLetter, 'current');  //this will remove current class from the current letter
      if(currentLetter.nextElementSibling){
      addClass(currentLetter.nextElementSibling, 'current');  //this will add current class to the next letter
    }}
    else{  // this is for handling incorrect letters as after space if typed wrong so in order to make it red it works
      const incorrectLetter=document.createElement('span');
      incorrectLetter.innerHTML=Key;
      incorrectLetter.className='letter incorrect extra';
      currentWord.appendChild(incorrectLetter);
    }
  }   

  ///OPERATIONS IF SPACE ENTERED BY USER
  if(ifSpace){   
    if(expected!==' '){
      const lettersToInvalidate=[...document.querySelectorAll('.word.current .letter:not(.correct)')]; //CONTAINS ALL LETTERS THAT ARE INCORRECT
      lettersToInvalidate.forEach(letter=>{
        addClass(letter,'incorrect');
      });
    }
    removeClass(currentWord, 'current');
    addClass(currentWord.nextElementSibling, 'current');

    if(currentLetter){
      removeClass(currentLetter,'current');
    }
    addClass(currentWord.nextElementSibling.firstChild, 'current');
  }


  //////MOVE CURSOR TO NEXT WORD
   const nextLetter=document.querySelector('.letter.current');
   const cursor=document.getElementById('cursor');
   if(nextLetter){
    cursor.style.top=nextLetter.getBoundingClientRect().top + 'px';
    cursor.style.left=nextLetter.offsetLeft+'px';
   }
});

//////setting new game button functionality

const buttons = document.getElementsByClassName('newGameBtn');
for (let btn of buttons) {
  btn.addEventListener('click', () => {
    location.reload();
  });
}
newGame();
