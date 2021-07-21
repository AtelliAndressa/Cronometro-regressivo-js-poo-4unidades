class Timer {
  constructor(_time, _currentTime, _timerInterval, _callbackTimeout, _callbackTimeInterval, _internalTimer, _internalTimeout){
    this.time = _time;
    this.currentTime = _currentTime;
    this.timerInterval = _timerInterval;
    this.callbackTimeout = function () { };
    this.callbackTimeInterval = function () { }; 
    this.internalTimer = _internalTimer;
    this.internalTimeout = _internalTimeout;
  }

  setTimer(_time) {
    this.time = _time;
    this.currentTime = this.time;     
  }
  
  setTimerInterval(_timerInterval) {
    this.timerInterval = _timerInterval;
  }

   setCallbackTimeout(_callbackTimeout) {
    this.callbackTimeout = _callbackTimeout
  }

  setCallbackTimeInterval(_callbackTimeInterval) {
    this.callbackTimeInterval = _callbackTimeInterval;
  }

  getCurrentTime () {
    return this.currentTime;      
  }

  startTimer(){ 
   
    this.timerInterval = this.timerInterval || 100; 
    this.internalTimeout = setTimeout(this.callbackTimeout, this.currentTime);
    this.internalTimer = setInterval(() => { 
      this.currentTime -= this.timerInterval; 
      
      this.callbackTimeInterval();   
      if (this.currentTime <= 0){      
          clearInterval(this.internalTimer); 
      }     
    }, this.timerInterval);
  }

  stopTimer(){
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimeout);    
  }

  resetTimer() {
    this.time = 0;
    this.currentTime = 0;
    this.timerInterval = 0;
    clearInterval(this.internalTimer);
    clearTimeout(this.internalTimeout);
    this.internalTimer = 0;
    this.internalTimeout = 0;  }

  getCurrentTimeString(){
    let milliseconds = Math.floor((this.currentTime % 1000) / 10);
    let seconds = Math.floor((this.currentTime / 1000) % 60);
    let minutes = Math.floor((this.currentTime / (1000 * 60)) % 60);
    let hours = Math.floor((this.currentTime / (1000 * 60 * 60)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
}

//************************FINAL CLASS***************

const timers = [new Timer(), new Timer(), new Timer(), new Timer()];

const cronometro = [document.getElementById("relogio0"), document.getElementById("relogio1"),
  document.getElementById("relogio2"), document.getElementById("relogio3")];

const starts = [document.getElementById("start0"), document.getElementById("start1"),
  document.getElementById("start2"), document.getElementById("start3")];

const resets = [document.getElementById("reset0"), document.getElementById("reset1"),
  document.getElementById("reset2"), document.getElementById("reset3")];

const stops = [document.getElementById("stop0"), document.getElementById("stop1"),
  document.getElementById("stop2"), document.getElementById("stop3")];


function inputs(indice) {
	let input = cronometro[indice].value;
  console.log(input);
	let inputDividido = input.split(':');
  let horasEmMs 		= inputDividido[0] * 60 * 60 * 1000;
  let minutosEmMs 	= inputDividido[1] * 60 * 1000;
  //quando os segundos e milisegundos sao zeros, entao o input so vem com horas e minutos
  //nesse caso e preciso criar a string de segundos e milisegundos manualmente 
  let segundosEMilis = inputDividido[2] ? inputDividido[2] : "00,00";
  let segundosEmMs 	= segundosEMilis.split(',')[0] * 1000;  
  let milisegundos 	= (segundosEMilis.split(',')[1] * 10) || 0;
  
  let entradaVisorConvertido = horasEmMs + minutosEmMs + segundosEmMs + milisegundos
  return entradaVisorConvertido;  
}

function startTimer(indice) {
	let timer = timers[indice];
  let entradaVisorConvertido = inputs(indice);

  timer.setTimer(entradaVisorConvertido);
  timer.setTimerInterval(100)  

  timer.setCallbackTimeInterval(function(){   
    cronometro[indice].value = timer.getCurrentTimeString();
  });
    
  timer.setCallbackTimeout(function(){   
     audio();
    //alert("Fim do Timer!" );      
  });
  timer.startTimer();
}



function stopTimer(indice){
  timers[indice].stopTimer();
}

function resetTimer(indice){
  timers[indice].resetTimer();
  cronometro[indice].value = "00:00:00,00"
}

for(let i=0; i<4; i++){
  starts[i].addEventListener('click', () => startTimer(i));
  stops[i].addEventListener('click', () => stopTimer(i));
  resets[i].addEventListener('click', () => resetTimer(i));
}

const beep = new Audio('./audio/toque.mp3');

  function audio(){
    beep.play() 
  }

  function muteAudio(){
    beep.muted = !beep.muted;
}

  