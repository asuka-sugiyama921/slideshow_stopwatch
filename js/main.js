'use strict';

/*------------------スライドショー------------------*/
{
  const images = [
    'imag/8C6D91BB-E734-4738-A783-A738F0EDB4E5.JPG',
    'imag/IMG_2732.jpeg',
    'imag/IMG_2875.jpeg',
    'imag/959355A1-39AC-43C7-B62D-238586350C2C.JPG',
    'imag/IMG_5848.JPG',
    'imag/IMG_3033.jpeg',
    'imag/IMG_3041.jpeg',
    'imag/IMG_3032.jpeg',
  ];
  let currentIndex = 0;

  const mainImage = document.getElementById('main');
   mainImage.src = images[currentIndex];

   images.forEach((image,index) => {
   const img = document.createElement('img');
   img.src = image;

   const li = document.createElement('li');
   if(index === currentIndex){
    li.classList.add('current');
   }

   li.addEventListener('click',() =>{
    mainImage.src = image;
    const thumbnails = document.querySelectorAll('.thumbnails > li');
    thumbnails[currentIndex].classList.remove('current');
    currentIndex = index;
    thumbnails[currentIndex].classList.add('current');

   });
   li.appendChild(img);
   document.querySelector('.thumbnails').appendChild(li);
  
  });

  const next = document.getElementById('next');
  next.addEventListener('click',() => {
    let target = currentIndex + 1;  
    if(target === images.length){
      target = 0;
      } 
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click',() => {
    let target = currentIndex - 1;  

    if(target < 0){
      target = images.length -1;
      } 

    document.querySelectorAll('.thumbnails > li')[target].click();

  });

 let isPlaying = false //スライドショーが動いてるかを管理
 let timeoutId; //クリアタイムアウトに使う引数

  function playSlideshow(){
    timeoutId = setTimeout(() => {
      playSlideshow();
      next.click();
    },1000);
  }

  const play = document.getElementById('play');
  play.addEventListener('click',() => {
    if(isPlaying === false){//スライドショーが動いてない場合
      playSlideshow();//スライドショーを動かす
      play.textContent = 'Pause';//ボタンのテキストを変更
    }else{//スライドショーが動いてる場合
      clearTimeout(timeoutId);//タイムアウトを止める
      play.textContent = 'Play';//ボタンのテキストを変更
    }
    isPlaying =! isPlaying;//ボタンクリックを押すたびisPlayingの値変える
  });
  

}


/*------------------ストップウォッチ------------------*/
{

  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
  
  let starttime; 
  let timeoutId;
  let elapsedtime = 0;
  
  
  function countUp(){
    const d = new Date(Date.now() - starttime + elapsedtime);
    const m = String(d.getMinutes()).padStart(2,'0'); 
    const s = String(d.getSeconds()).padStart(2,'0');
    const ms = String(d.getMilliseconds()).padStart(3,'0');
  timer.textContent = `${m}:${s}.${ms}`;
    timeoutId = setTimeout(() => { 
      countUp();
    },10);
  }
  
  function setButtonStateInitial(){
    start.classList.remove('inactive')
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }
  function setButtonStateRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive')
    reset.classList.add('inactive');
  }
  function setButtonStateStopped(){
    start.classList.remove('inactive')
    stop.classList.add('inactive');
    reset.classList.remove('inactive')
  }
  
  setButtonStateInitial();
  
  start.addEventListener('click',() => {
    if(start.classList.contains('inactive') === true){
      return;
    }
    setButtonStateRunning();
    starttime = Date.now();
    countUp();
  
  });
  
  stop.addEventListener('click',() => {
    if(stop.classList.contains('inactive') === true){
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedtime += Date.now() - starttime;
  
  });
  
  reset.addEventListener('click',() => {
    if(reset.classList.contains('inactive') === true){
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedtime = 0;
  
  });
  
  }
  