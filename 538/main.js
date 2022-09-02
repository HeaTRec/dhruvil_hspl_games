
const addMysteryBlock = (text) => {
    const target = document.querySelector('.stage');  
    const mysteryBlock = document.createElement('div');
    mysteryBlock.className = "block mystery-block";
    mysteryBlock.innerText = text || null;
    mysteryBlock.addEventListener('click', handleBlockClick, false);
    target.appendChild(mysteryBlock);  
  }
  
  const addBrickBlock = () => {
    const target = document.querySelector('.stage');  
    const brickBlock = document.createElement('div');
    brickBlock.className = "block brick-block";
    brickBlock.addEventListener('click', handleBlockClick, false);
    target.appendChild(brickBlock);  
  }
  
  const handleBlockClick = (e) => {
    const {target} = e;
    target.removeEventListener('click', handleBlockClick, false);
    target.className = ('block spent-block');
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.addEventListener('animationend', () => target.removeChild(coin), false);
    target.appendChild(coin);
  }
  
  const deleteLastBlock = () => {
    const stage = document.querySelector('.stage');
    const lastBrick = stage.lastChild;
    stage.removeChild(lastBrick);
  }
  
  const handleKeyPress = (e) => {
    //this could probably be smarter, but I'd rather work on styling...
    e.preventDefault();
    const key = e.which;
    const keyCodes = {
      brick: [
        9,  //tab
        13, //enter
        32  //space          
      ],
      delete: [
        8,  //delete
        46  //backspace
      ]
    }
  
    if( key > 47 && key < 91 || key > 185 && key < 223){
      addMysteryBlock(e.key)
    };
  
    if( keyCodes.brick.find(code => code === key) ){ 
      addBrickBlock() 
    };
  
    if( keyCodes.delete.find(code => code === key) ){ 
      deleteLastBlock() 
    };
  
    const stage = document.querySelector('.stage');
    stage.scrollTop = stage.scrollHeight;  
  };
  
  window.addEventListener('keydown', handleKeyPress, false);
  
  const clearStage = () => {
    const stage = document.querySelector('.stage');
    stage.innerHTML = "";
  }
  
  const clearStageButton = document.querySelector('.clear-stage-button');
  clearStageButton.addEventListener('click', clearStage, false);
  
  
  const getParameterByName = (name, url) => {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  //look for a 'text' query param or supply some default text
  const populateEmptyStage = () => {
    const defaultString = 'Mystery  Block    Text   Styling';
    const string = getParameterByName('text') || defaultString;
    const stage = document.querySelector('.stage');
    string.split('').forEach( character => {
      character === ' ' ? addBrickBlock() : addMysteryBlock(character);
    });  
  }
  
  populateEmptyStage();