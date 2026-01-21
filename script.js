// ----------------- ELEMENTS -----------------
const heartsContainer = document.getElementById("heartsContainer");
const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const chains = document.getElementById("chains");
const mainCard = document.getElementById("mainCard");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const catRider = document.getElementById("catRider");
const celebration = document.getElementById("celebration");
const floatingContainer = document.getElementById("floating-emojis");

let heartsCollected = 0;
const totalHearts = 20;

// ----------------- DRIFTING EMOJIS -----------------
const driftingEmojis = ['💖','✨','🌸','💌','🐱','🎀','🍬'];
function spawnDriftingEmoji() {
  const el = document.createElement('div');
  el.textContent = driftingEmojis[Math.floor(Math.random()*driftingEmojis.length)];
  el.style.left = Math.random()*window.innerWidth+'px';
  el.style.top = Math.random()*window.innerHeight+'px';
  el.style.fontSize = (Math.random()*24+20)+'px';
  el.style.opacity = Math.random()*0.8+0.2;
  floatingContainer.appendChild(el);

  let posY = parseFloat(el.style.top);
  let sway = Math.random()*2-1;
  let swayDirection = Math.random()<0.5?-1:1;

  function drift(){
    posY -= 0.5;
    let posX = parseFloat(el.style.left)+sway*swayDirection;
    el.style.top = posY+'px';
    el.style.left = posX+'px';
    sway += Math.random()*0.2-0.1;
    if(posY<-50) el.remove();
    else requestAnimationFrame(drift);
  }
  drift();
}
setInterval(spawnDriftingEmoji, 500);

// ----------------- HEART MINI-GAME -----------------
function spawnHearts(){
  for(let i=0;i<totalHearts;i++){
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '💖';
    heart.style.left = Math.random()*(window.innerWidth-50)+'px';
    heart.style.top = Math.random()*(window.innerHeight/2)+'px';
    heartsContainer.appendChild(heart);

    // Heart pop animation on click
    heart.addEventListener('click', ()=>{
      heart.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      heart.style.transform = 'scale(2)';
      heart.style.opacity = '0';
      setTimeout(()=>heart.remove(), 300);

      heartsCollected++;
      document.getElementById('heartCounter').textContent = `Hearts collected: ${heartsCollected} / ${totalHearts}`;
      if(heartsCollected>=totalHearts){
        envelopeContainer.classList.remove('locked');
        chains.remove();
        envelopeContainer.querySelector('p').textContent = "Click the envelope to open your Valentine!";
      }
    });
  }
}
spawnHearts();

// ----------------- ENVELOPE OPEN -----------------
envelope.addEventListener('click', ()=>{
  if(envelopeContainer.classList.contains('locked')) return;
  envelope.classList.add('open');
  setTimeout(()=>{
    document.getElementById('gameContainer').classList.add('hidden');
    mainCard.classList.remove('hidden');
  }, 600);
});

// ----------------- NO BUTTON DODGE & CAT RIDER -----------------
const dodgeDistance = 150;
noButton.style.left = "50px";
noButton.style.top = "300px";

noButton.addEventListener('mousemove',(e)=>{
  const rect = noButton.getBoundingClientRect();
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  const btnCenterX = rect.left + rect.width/2;
  const btnCenterY = rect.top + rect.height/2;

  const dx = btnCenterX - cursorX;
  const dy = btnCenterY - cursorY;
  const distance = Math.sqrt(dx*dx+dy*dy);

  if(distance<100){
    let newX = rect.left + dx/distance*dodgeDistance;
    let newY = rect.top + dy/distance*dodgeDistance;

    newX = Math.max(10, Math.min(window.innerWidth - rect.width - 10, newX));
    newY = Math.max(10, Math.min(window.innerHeight - rect.height - 10, newY));

    noButton.style.left = newX+'px';
    noButton.style.top = newY+'px';

    // Move cat with button
    catRider.style.left = noButton.offsetLeft+'px';
    catRider.style.top = (noButton.offsetTop-25)+'px';
  }
});

// Initially position cat on NO button
catRider.style.left = noButton.offsetLeft+'px';
catRider.style.top = (noButton.offsetTop-25)+'px';

// ----------------- YES BUTTON CELEBRATION -----------------
yesButton.addEventListener('click', ()=>{
  celebration.classList.remove('hidden');
});
