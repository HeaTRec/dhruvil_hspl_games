const app = document.querySelector("#app");


const drums = [
{
  id: "Tom_1",
  keyCode: 81,
  keyTrigger: "Q",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/tom1.1.wav",
  // img: "https://i2.wp.com/welovefingerdrumming.com/wp-content/uploads/2017/04/tom-tom-drums.png?resize=740%2C589",
  img: "https://i.postimg.cc/ZnQNDb0T/tom.png" },

{
  id: "Tom_2",
  keyCode: 87,
  keyTrigger: "W",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/tom2.1.wav",
  // img: "https://i2.wp.com/welovefingerdrumming.com/wp-content/uploads/2017/04/tom-tom-drums.png?resize=740%2C589",
  img: "https://i.postimg.cc/ZnQNDb0T/tom.png" },

{
  id: "Tom_3",
  keyCode: 69,
  keyTrigger: "E",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/tom3.1.wav",
  // img: "https://i2.wp.com/welovefingerdrumming.com/wp-content/uploads/2017/04/tom-tom-drums.png?resize=740%2C589",
  img: "https://i.postimg.cc/ZnQNDb0T/tom.png" },

{
  id: "Cymball",
  keyCode: 65,
  keyTrigger: "A",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/cymball.wav",
  img: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/cymball.jpg" },

{
  id: "Siren",
  keyCode: 83,
  keyTrigger: "S",
  //url: "https://speakpipe.s3.amazonaws.com:443/msg%2Fs31373%2F2018%2F7%2F27%2F60z0xc8em13m56wy.mp3?Expires=1532722979&AWSAccessKeyId=AKIAIB7MCJCSYSVIGQZQ&Signature=jU%2Fhj4%2B0KDv5POdZdEz%2FGomSQGI%3D",
  // url: "https://instaud.io/_/2tZ3.mp3",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/siren.wav",
  // img: "https://s15.postimg.cc/ciwnzqva3/tomica.jpg",
  img: "https://polizei-news-agenturbelmediag.netdna-ssl.com/wp-content/uploads/2018/05/shutterstock_263594966-528x317.jpg" },

{
  id: "Bong",
  keyCode: 68,
  keyTrigger: "D",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/bong.wav",
  img: "https://s15.postimg.cc/vp9v2ytsb/bong.jpg" },

{
  id: "Kick",
  keyCode: 90,
  keyTrigger: "Z",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/kick.wav",
  img: "https://s15.postimg.cc/nwj7b0qe3/kick.jpg" },

{
  id: "Snare",
  keyCode: 88,
  keyTrigger: "X",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/snare.wav",
  img: "https://images-na.ssl-images-amazon.com/images/I/61VUOQzsooL._SL1000_.jpg" },

{
  id: "Hat",
  keyCode: 67,
  keyTrigger: "C",
  url: "https://larioivankovic.com/Projects/12%20-%20StaxDrumMachine/pics%20and%20sounds/hat.wav",
  img: "https://media.guitarcenter.com/is/image/MMGS7/A-Series-New-Beat-Hi-Hat-Cymbal-Pair-13-in./441801000000078-00-500x500.jpg" }];




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumKit: drums,
      display: "Start Playing!" };

    this.displayName = this.displayName.bind(this);
  }

  displayName(name) {
    this.setState({
      display: name });

  }


  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, "Stax Drum Machine"), /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.state.display), /*#__PURE__*/
      React.createElement("div", { id: "drums" }, /*#__PURE__*/
      React.createElement(DrumKit, {
        drums: this.state.drumKit,
        updateDisplay: this.displayName
        // onClick={this.handleClick} 
      }))));



  }}


class DrumKit extends React.Component {
  render() {
    const drums = this.props.drums.map((drum, i, drumsArr) => /*#__PURE__*/
    React.createElement(DrumPart, {
      key: drum.i,
      id: drumsArr[i].id,
      audio: drumsArr[i].url,
      keyTrigger: drumsArr[i].keyTrigger,
      keyCode: drumsArr[i].keyCode,
      img: drumsArr[i].img,
      updateDisplay: this.props.updateDisplay }));


    return /*#__PURE__*/(
      React.createElement("div", { className: "drumKit" },
      drums));


  }}


class DrumPart extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyboard);
  }

  handleKeyboard(key) {
    if (key.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound(e) {
    const audio = document.getElementById(this.props.keyTrigger);
    audio.currentTime = 0;
    audio.play();
    this.props.updateDisplay(this.props.id.replace(/_/g, ' '));
  }

  render() {
    const { id, audio, keyCode, keyTrigger, img, updateDisplay } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        id: id,
        onClick: this.playSound }, /*#__PURE__*/

      React.createElement("div", { className: "triggerDisplay" }, keyTrigger), /*#__PURE__*/
      React.createElement("img", { src: img, alt: id, className: "img" }), /*#__PURE__*/
      React.createElement("audio", { className: "clip", id: keyTrigger, src: audio })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), app);

displayName();