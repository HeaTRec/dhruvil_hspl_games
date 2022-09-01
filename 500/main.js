
const internals = {
    running: false,
    speed: 0.075,
    audiosrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/9473/blastbeat-loop.mp3',
    timeline: null,
    audio: null,
    svg: {},
    ui: {} };
  
  
  internals.svg.characterA = document.querySelector('.character-state-a');
  internals.svg.characterB = document.querySelector('.character-state-b');
  internals.svg.chbRightArm = internals.svg.characterB.querySelector('.right-arm');
  internals.svg.chbHead = internals.svg.characterB.querySelector('.head');
  internals.svg.chbBody = internals.svg.characterB.querySelector('.body');
  internals.svg.drumBass = document.querySelector('.drum > .bass');
  internals.svg.rideCymbal = document.querySelector('.ride > .cymbal');
  internals.svg.hiHat = document.querySelector('.drum > .hi-hat');
  internals.svg.hiHatTop = document.querySelector('.drum > .hi-hat > .top');
  internals.svg.tomRight = document.querySelector('.drum > .tom-right');
  internals.svg.tomLeft = document.querySelector('.drum > .tom-left');
  internals.ui.info = document.querySelector('.info');
  
  // -------
  
  TweenLite.defaultEase = Power0.easeNone;
  TweenLite.set(internals.svg.characterA, { autoAlpha: internals.running ? 0 : 1 });
  TweenLite.set(internals.svg.characterB, { autoAlpha: internals.running ? 1 : 0 });
  TweenLite.set(internals.svg.drumBass, { transformOrigin: 'center' });
  TweenLite.set(internals.svg.tomRight, { transformOrigin: 'left center' });
  TweenLite.set(internals.svg.tomLeft, { transformOrigin: 'right center' });
  TweenLite.set(internals.svg.rideCymbal, { transformOrigin: '136px 8px' });
  TweenLite.set(internals.svg.chbRightArm, { transformOrigin: '210px 30px' });
  
  // -------
  
  internals.timeline = new TimelineMax();
  
  internals.timeline.to(internals.svg.chbHead, internals.speed * 2, { y: 20, ease: Sine.easeInOut, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.chbBody, internals.speed, { rotation: -2, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.chbRightArm, internals.speed, { rotation: 10, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.rideCymbal, internals.speed, { rotation: 8, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.drumBass, internals.speed, { scale: 1.05, rotation: 2, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.hiHat, internals.speed, { y: -0.075, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.hiHatTop, internals.speed, { y: -4, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.tomRight, internals.speed, { rotation: -2, repeat: -1, yoyo: true }, 0);
  internals.timeline.to(internals.svg.tomLeft, internals.speed, { rotation: 2, repeat: -1, yoyo: true }, 0);
  
  internals.timeline[internals.running ? 'play' : 'stop']();
  
  internals.audio = new Audio(internals.audiosrc);
  internals.audio.autoplay = internals.running;
  internals.audio.crossOrigin = 'Anonymous';
  
  // -------
  
  internals.audio.addEventListener('loadedmetadata', allowToPlay);
  internals.audio.addEventListener('timeupdate', loopAudio);
  
  // -------
  
  function allowToPlay() {
  
    internals.ui.info.classList.add('active');
  
    window.addEventListener('click', toggle);
    window.addEventListener('touchstart', toggle);
  }
  
  const audioBuffer = 0.18;
  function loopAudio() {
  
    if (internals.audio.currentTime > internals.audio.duration - audioBuffer) {
      internals.audio.currentTime = 0;
      internals.audio.play();
    }
  }
  
  function play() {
  
    internals.audio.play();
  
    TweenLite.set(internals.svg.characterA, { autoAlpha: 0 });
    TweenLite.set(internals.svg.characterB, { autoAlpha: 1 });
  
    internals.timeline.restart();
  }
  
  function pause() {
  
    internals.audio.pause();
  
    TweenLite.set(internals.svg.characterA, { autoAlpha: 1 });
    TweenLite.set(internals.svg.characterB, { autoAlpha: 0 });
  
    internals.timeline.pause();
    internals.timeline.seek(0);
  }
  
  function toggle() {
    internals.running = !internals.running;
  
    if (internals.running) {
      return play();
    }
  
    return pause();
  }