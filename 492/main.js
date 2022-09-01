function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Synth extends React.Component {
    constructor(props) {
      super(props);_defineProperty(this, "handleKey",
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
      e => {
        let data = {
          event: e.type,
          target: "",
          key: "" };
  
  
        if (data.event == "keypress") {
          const keys = document.querySelectorAll(".key");
          keys.forEach(key => {
            if (key.getAttribute("data-key") == e.key.toLowerCase())
            data.target = key;
          });
          data.key = e.key;
        } else {
          data.target = e.currentTarget;
          data.key = data.target.getAttribute("data-key");
        }
  
        this.playSound(data);
        this.animate(data);
      });_defineProperty(this, "playSound",
  
      ({ key }) => {
        Object.entries(this.state.keys).forEach(entry => {
          if (entry[0] == key.toLowerCase()) {
            const audio = new Audio(entry[1]);
            audio.play();
          }
        });
      });_defineProperty(this, "animate",
  
      ({ target }) => {
        const tl = gsap.timeline();
        try {
          tl.to(target, {
            duration: 0.18,
            ease: "power3.out",
            scale: 0.95,
            transformOrigin: "top" });
  
  
          tl.to(target, {
            duration: 0.18,
            ease: "power3.out",
            scale: 1,
            transformOrigin: "top" });
  
  
          const tl2 = gsap.timeline();
  
          tl2.to(".speakers circle", {
            duration: 0.18,
            ease: "back.out",
            scale: 1.15,
            transformOrigin: "center" });
  
  
          tl2.to(".speakers circle", {
            duration: 0.3,
            ease: "back.out",
            scale: 1,
            transformOrigin: "center" });
  
        } catch {}
      });_defineProperty(this, "handlePreset",
  
      e => {
        if (e) {
          const data = {
            target: e.currentTarget,
            presets: e.currentTarget.parentElement.querySelectorAll(".preset"),
            paths: e.currentTarget.querySelectorAll("path"),
            preset: e.currentTarget.getAttribute("data-preset") };
  
  
          Object.entries(this.state.presets).forEach(entry => {
            if (entry[0] == data.preset) {
              data.paths.forEach(path => {
                gsap.set(path, { fill: "#FF79E6", stroke: "white" });
                try {
                  gsap.set(".top", { fill: "white" });
                } catch {}
              });
            } else {
              data.presets.forEach(preset => {
                if (preset.getAttribute("data-preset") == entry[0]) {
                  preset.querySelectorAll("path").forEach(path => {
                    gsap.set(path, {
                      fill: "white",
                      stroke: "#FF79E6" });
  
                  });
                }
              });
            }
  
            data.presets.forEach(preset => {
              gsap.set(data.path, { fill: "white" });
            });
          });
  
          if (data.preset == "piano") this.togglePiano();else
          if (data.preset == "guitar") this.toggleGuitar();else
          if (data.preset == "drums") this.toggleDrums();
        } else this.togglePiano();
      });this.state = { presets: { piano: true, guitar: false, drums: false }, keys: { q: "", 2: "", w: "", 3: "", e: "", r: "", 4: "", t: "", 5: "", y: "", u: "", i: "", 6: "" } };this.handlePreset = this.handlePreset.bind(this);}
  
    togglePiano() {
      this.state.keys.q =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-c5.mp3";
      this.state.keys["2"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-c5b.mp3";
      this.state.keys.w =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-d5.mp3";
      this.state.keys["3"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-d5b.mp3";
      this.state.keys.e =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-e5.mp3";
      this.state.keys.r =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-f5.mp3";
      this.state.keys["4"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-f5b.mp3";
      this.state.keys.t =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-g5.mp3";
      this.state.keys["5"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-g5b.mp3";
      this.state.keys.y =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-a5.mp3";
      this.state.keys["6"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-a5b.mp3";
      this.state.keys.u =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-b5.mp3";
      this.state.keys.i =
      "https://raw.githubusercontent.com/xLerida/synth/master/piano-c6.mp3";
    }
  
    toggleGuitar() {
      this.state.keys.q =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-c5.mp3";
      this.state.keys["2"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-c5b.mp3";
      this.state.keys.w =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-d5.mp3";
      this.state.keys["3"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-d5b.mp3";
      this.state.keys.e =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-e5.mp3";
      this.state.keys.r =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-f5.mp3";
      this.state.keys["4"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-f5b.mp3";
      this.state.keys.t =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-g5.mp3";
      this.state.keys["5"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-g5b.mp3";
      this.state.keys.y =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-a5.mp3";
      this.state.keys["6"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-a5b.mp3";
      this.state.keys.u =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-b5.mp3";
      this.state.keys.i =
      "https://raw.githubusercontent.com/xLerida/synth/master/guitar-c6.mp3";
    }
  
    toggleDrums() {
      this.state.keys.q =
      "https://raw.githubusercontent.com/xLerida/synth/master/drums-snare.mp3";
      this.state.keys["2"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/drums-kick.mp3";
      this.state.keys.w =
      "https://raw.githubusercontent.com/xLerida/synth/master/drums-808.mp3";
      this.state.keys["3"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/drum-clap.mp3";
      this.state.keys.e =
      "https://raw.githubusercontent.com/xLerida/synth/master/drums-crash.mp3";
      this.state.keys.r =
      "https://raw.githubusercontent.com/xLerida/synth/master/drums-hat-c.mp3";
      this.state.keys["4"] =
      "https://raw.githubusercontent.com/xLerida/synth/master/drums-hat-o.mp3";
    }
  
    componentDidMount() {
      this.togglePiano();
  
      window.addEventListener("keypress", e => {
        this.handleKey(e);
      });
    }
  
    render() {
      return /*#__PURE__*/(
        React.createElement("svg", { className: "Synth", viewBox: "0 0 401 203.6" }, /*#__PURE__*/
        React.createElement("path", {
          className: "base st0",
          d: "M388.6,192.1H12.4c-6.5,0-11.9-5.3-11.9-11.9V34.5c0-18.8,15.2-34,34-34l332.1,0 c18.8,0,34,15.2,34,34v145.8C400.5,186.8,395.2,192.1,388.6,192.1z" }), /*#__PURE__*/
  
  
        React.createElement("path", {
          className: "st1",
          d: "M378.3,192.1H21.5c-1.4,0-2.6-1.2-2.6-2.6v-79.7c0-6.6,5.4-12,12-12h338.1c6.6,0,12,5.4,12,12v79.7 C380.9,191,379.8,192.1,378.3,192.1z" }), /*#__PURE__*/
  
  
        React.createElement("g", { className: "speakers" }, /*#__PURE__*/
        React.createElement("circle", { className: "st2", cx: "52.8", cy: "48.2", r: "32.9" }), /*#__PURE__*/
        React.createElement("circle", { className: "st2", cx: "349.5", cy: "48.2", r: "32.9" })), /*#__PURE__*/
  
        React.createElement("g", { className: "keys" }, /*#__PURE__*/
        React.createElement("g", { className: "key", "data-key": "i", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M335.3,98.3H370c5.8,0,10.4,4.7,10.4,10.4v85.8c0,4.7-3.8,8.5-8.5,8.5h-28.1c-4.7,0-8.5-3.8-8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", { className: "st2", d: "M359.2,186.1h-2.8v-14.9h2.8V186.1z" }))), /*#__PURE__*/
  
  
        React.createElement("path", {
          className: "st4",
          d: "M379.6,132.1c0,0,0.4-26.9-18.6-26.9h-25v-6.4h33.7c5.5,0,9.9,4.4,9.9,9.9V132.1z" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st4",
          d: "M361.8,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C379.7,184.4,375,202.1,361.8,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "u", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M335.2,98.3h-45.1v96.2c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M315.5,183.2v-12h2.8v13.1c-1.4,1.4-3.5,2.2-6.2,2.2c-2,0-3.5-0.5-4.6-1.5c-1.1-1-1.6-2.4-1.6-4.4v-9.4h2.8 v7.8c0,1.9,0.3,3.2,0.8,3.9c0.5,0.7,1.5,1.1,3,1.1C313.7,184,314.7,183.7,315.5,183.2z" }))), /*#__PURE__*/
  
  
  
  
        React.createElement("rect", { x: "307.4", y: "98.8", className: "st4", width: "27", height: "6.4" }), /*#__PURE__*/
        React.createElement("path", {
          className: "st4",
          d: "M316.6,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C334.5,184.4,329.8,202.2,316.6,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "y", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M290.1,98.3H245v96.2c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M269,186.1h-2.8v-6.1l-5.6-8.9h3.1l3.9,6.4l3.9-6.4h3.1l-5.7,8.9V186.1z" }))), /*#__PURE__*/
  
  
  
        React.createElement("rect", {
          x: "262.3",
          y: "98.8",
          className: "st4",
          width: "10.4",
          height: "6.4" }), /*#__PURE__*/
  
        React.createElement("path", {
          class: "st4",
          d: "M271.5,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C289.4,184.4,284.7,202.2,271.5,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "t", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M245,98.3h-45.1v96.2c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M223.7,186.1h-2.8v-12.4h-4.4v-2.5h11.6v2.5h-4.4V186.1z" }))), /*#__PURE__*/
  
  
  
        React.createElement("rect", {
          x: "216.2",
          y: "98.8",
          className: "st4",
          width: "11.4",
          height: "6.4" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st4",
          d: "M226.3,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C244.3,184.4,239.5,202.2,226.3,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "r", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M199.9,98.3h-45.1v96.2c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M184,186.1h-3.9l-5.6-5.6h-0.3v5.6h-2.8v-14.9h3.1c4.5,0,6.7,1.5,6.7,4.6c0,2.4-1.2,3.9-3.6,4.5L184,186.1z M174.2,178h0.9c2.1,0,3.1-0.7,3.1-2.2c0-1.4-1-2.1-3-2.1h-1V178z" }))), /*#__PURE__*/
  
  
  
  
        React.createElement("rect", { x: "155.6", y: "98.8", className: "st4", width: "26", height: "6.4" }), /*#__PURE__*/
        React.createElement("path", {
          class: "st4",
          d: "M181.2,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C199.1,184.4,194.4,202.2,181.2,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "e", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M154.8,98.3h-45.1v96.2c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M137.2,186.1h-9.5v-14.9h8.9v2.5h-6.1v3.2h4.9v2.5h-4.9v4.1h6.7V186.1z" }))), /*#__PURE__*/
  
  
  
        React.createElement("rect", { x: "127", y: "98.8", className: "st4", width: "26.9", height: "6.4" }), /*#__PURE__*/
        React.createElement("path", {
          className: "st4",
          d: "M136.1,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C154,184.4,149.3,202.2,136.1,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "w", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M109.6,98.3H64.5v96.2c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M91.8,186.8l-4.6-10l-4.5,10l-6.3-15.6h3.1l3.4,9.1l4.4-9.8l4.4,9.7l3.4-9.1H98L91.8,186.8z" }))), /*#__PURE__*/
  
  
  
        React.createElement("rect", { x: "81.9", y: "99", className: "st4", width: "10.4", height: "6.4" }), /*#__PURE__*/
        React.createElement("path", {
          className: "st4",
          d: "M91,202.3h10.3c0,0,7.3-0.3,7.6-7.5v-10.3C108.9,184.4,104.2,202.2,91,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "q", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st3",
          d: "M64.5,98.3H29.6c-5.6,0-10.2,4.6-10.2,10.2v86c0,4.7,3.8,8.6,8.6,8.6h28c4.7,0,8.5-3.8,8.5-8.5V98.3z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st2",
          d: "M47.4,188.3l-2.9-2.7c-1.1,0.6-2.3,0.9-3.8,0.9c-2.3,0-4.2-0.8-5.8-2.3c-1.6-1.5-2.4-3.3-2.4-5.5 c0-2.1,0.8-4,2.4-5.5c1.6-1.5,3.5-2.3,5.8-2.3c2.3,0,4.2,0.8,5.8,2.3c1.6,1.5,2.4,3.4,2.4,5.6c0,1-0.2,2-0.7,2.9s-1,1.8-1.8,2.5 l2.9,2.1L47.4,188.3z M45.9,178.7c0-1.5-0.5-2.8-1.5-3.8c-1-1-2.2-1.5-3.6-1.5c-1.4,0-2.7,0.5-3.7,1.5c-1,1-1.5,2.2-1.5,3.7 c0,1.4,0.5,2.7,1.5,3.7c1,1.1,2.2,1.6,3.6,1.6c1.5,0,2.7-0.5,3.7-1.5C45.4,181.4,45.9,180.2,45.9,178.7z" }))), /*#__PURE__*/
  
  
  
  
  
  
        React.createElement("path", {
          className: "st4",
          d: "M20.2,132.1c0,0-1.2-26.9,19-26.9h8.1v-6.4H30c-5.5,0-9.9,4.4-9.9,9.9V132.1z" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st4",
          d: "M45.8,202.3h10.3c0,0,7.2-0.3,7.6-7.5v-10.3C63.8,184.4,59,202.2,45.8,202.3z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "6", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st5",
          d: "M307.4,98.8h-34.7V154c0,4.7,3.8,8.5,8.5,8.5h17.6c4.7,0,8.5-3.8,8.5-8.5V98.8z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st6",
          d: "M291.1,135.5l1.8,1.6c-0.1,0.1-0.3,0.3-0.6,0.7s-0.7,0.8-1,1.1c-0.3,0.3-0.6,0.7-1,1.2 c-0.4,0.5-0.7,0.9-1,1.3c0.6-0.2,1.1-0.3,1.7-0.3c1.4,0,2.5,0.5,3.3,1.4c0.8,1,1.3,2.1,1.3,3.5c0,1.3-0.5,2.5-1.5,3.4 c-1,1-2.3,1.4-3.8,1.4c-1.6,0-2.8-0.5-3.9-1.5s-1.5-2.2-1.5-3.6c0-0.7,0.2-1.6,0.6-2.5c0.4-0.9,0.8-1.8,1.3-2.6 c0.5-0.8,1.1-1.6,1.8-2.4c0.7-0.9,1.2-1.5,1.5-1.8C290.4,136.2,290.8,135.8,291.1,135.5z M288.4,148c0.5,0.5,1.1,0.8,1.9,0.8 c0.7,0,1.3-0.3,1.8-0.8c0.5-0.5,0.7-1.1,0.7-1.9c0-0.8-0.2-1.4-0.7-2c-0.5-0.5-1.1-0.8-1.9-0.8c-0.8,0-1.4,0.3-1.9,0.8 c-0.5,0.5-0.7,1.2-0.7,2C287.6,146.8,287.9,147.5,288.4,148z" }))), /*#__PURE__*/
  
  
  
  
  
  
  
  
        React.createElement("rect", {
          x: "272.7",
          y: "98.8",
          className: "st2",
          width: "34.7",
          height: "6.4" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st7",
          d: "M289.6,162.8h10.1c0,0,7.5-0.8,7.8-8v-9.9C307.5,144.9,306.4,162.8,289.6,162.8z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "5", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st5",
          d: "M262.3,98.8h-34.7V154c0,4.7,3.8,8.5,8.5,8.5h17.6c4.7,0,8.5-3.8,8.5-8.5V98.8z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st6",
          d: "M239.6,149.7l0.9-2.2c0.4,0.3,0.8,0.6,1.4,0.8s1.1,0.4,1.7,0.4c1,0,1.8-0.3,2.3-0.8c0.5-0.5,0.8-1.2,0.8-2 c0-0.8-0.3-1.5-0.8-2.1c-0.5-0.6-1.3-0.8-2.4-0.8c-0.8,0-1.8,0.2-2.8,0.5l2-7.5h6.4l-0.7,2.1h-4l-0.8,3.2c0.3-0.1,0.7-0.1,1-0.1 c1.3,0,2.5,0.5,3.5,1.4c1,0.9,1.4,2,1.4,3.3c0,1.5-0.5,2.7-1.4,3.7s-2.3,1.5-4.1,1.5c-0.9,0-1.8-0.1-2.6-0.4 S240.1,150,239.6,149.7z" }))), /*#__PURE__*/
  
  
  
  
  
  
        React.createElement("rect", {
          x: "227.6",
          y: "98.8",
          className: "st2",
          width: "34.7",
          height: "6.4" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st7",
          d: "M244.4,162.8h10.1c0,0,7.5-0.8,7.8-8v-9.9C262.4,144.9,261.2,162.8,244.4,162.8z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "4", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          class: "st5",
          d: "M216.2,98.8h-34.7V154c0,4.7,3.8,8.5,8.5,8.5h17.6c4.7,0,8.5-3.8,8.5-8.5V98.8z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st6",
          d: "M203.4,150.8h-2.6v-2.5h-7.1v-1.7l7.8-11.4h1.8v10.9l2.1,0v2.1h-2.1V150.8z M200.8,146.1v-6l-4.1,6 L200.8,146.1z" }))), /*#__PURE__*/
  
  
  
  
        React.createElement("rect", {
          x: "181.6",
          y: "98.8",
          className: "st2",
          width: "34.7",
          height: "6.4" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st7",
          d: "M198.3,162.8h10.1c0,0,7.5-0.8,7.8-8v-9.9C216.3,144.9,215.1,162.8,198.3,162.8z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "3", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st5",
          d: "M127,98.8H92.3V154c0,4.7,3.8,8.5,8.5,8.5h17.6c4.7,0,8.5-3.8,8.5-8.5V98.8z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st6",
          d: "M111.4,142.4L111.4,142.4c0.9,0.4,1.6,1,2,1.7c0.4,0.8,0.7,1.6,0.7,2.5c0,1.1-0.5,2.1-1.5,3 c-1,0.9-2.3,1.3-3.9,1.3c-1.1,0-2-0.2-2.8-0.5c-0.8-0.3-1.3-0.7-1.7-1.1l1.1-1.9c0.2,0.3,0.7,0.6,1.3,0.9s1.3,0.4,2,0.4 c0.9,0,1.6-0.2,2-0.7s0.7-1.1,0.7-1.7c0-0.8-0.3-1.6-1-2.1c-0.7-0.6-1.5-0.9-2.6-0.9c-0.1,0-0.3,0-0.6,0v-1.6 c0.2,0,0.5,0.1,0.7,0.1c0.8,0,1.5-0.2,2-0.7c0.5-0.5,0.8-1,0.8-1.5c0-1.1-0.7-1.7-2-1.7c-0.4,0-0.8,0.1-1.2,0.2 c-0.5,0.1-0.8,0.3-1.1,0.5l-0.8-1.9c0.3-0.3,0.8-0.5,1.5-0.7c0.7-0.2,1.4-0.3,2.2-0.3c1.2,0,2.2,0.4,3,1.1s1.2,1.6,1.2,2.5 C113.5,140.6,112.8,141.7,111.4,142.4z" }))), /*#__PURE__*/
  
  
  
  
  
  
  
  
        React.createElement("rect", { x: "92.3", y: "98.8", className: "st2", width: "34.7", height: "6.4" }), /*#__PURE__*/
        React.createElement("path", {
          className: "st7",
          d: "M109.1,162.8h10.1c0,0,7.5-0.8,7.8-8v-9.9C127,144.9,125.9,162.8,109.1,162.8z" })), /*#__PURE__*/
  
  
        React.createElement("g", { className: "key", "data-key": "2", onClick: this.handleKey }, /*#__PURE__*/
        React.createElement("path", {
          className: "st5",
          d: "M81.8,98.8H47.2V154c0,4.7,3.8,8.5,8.5,8.5h17.6c4.7,0,8.5-3.8,8.5-8.5V98.8z" }), /*#__PURE__*/
  
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("g", null, /*#__PURE__*/
        React.createElement("path", {
          className: "st6",
          d: "M70,150.7H59.2V149c0.7-0.3,1.5-0.8,2.5-1.6s1.8-1.5,2.5-2.2c0.9-0.9,1.5-1.8,1.8-2.6 c0.4-0.8,0.6-1.6,0.6-2.5c0-0.6-0.2-1.2-0.6-1.6c-0.4-0.5-0.9-0.7-1.5-0.7c-1.1,0-2.2,0.5-3.1,1.6l-1.3-1.8 c1.4-1.4,3-2.1,4.7-2.1c1.4,0,2.5,0.4,3.4,1.3c0.9,0.9,1.3,2,1.3,3.2c0,1.8-1.1,3.9-3.3,6.2c-0.6,0.6-1.3,1.3-2.3,2.1l6.2,0 V150.7z" }))), /*#__PURE__*/
  
  
  
  
  
  
        React.createElement("rect", { x: "47.2", y: "98.8", className: "st2", width: "34.7", height: "6.4" }), /*#__PURE__*/
        React.createElement("path", {
          className: "st7",
          d: "M64,162.8h10.1c0,0,7.5-0.8,7.8-8v-9.9C81.9,144.9,80.8,162.8,64,162.8z" }))), /*#__PURE__*/
  
  
  
        React.createElement("g", { className: "presets" }, /*#__PURE__*/
        React.createElement("path", {
          className: "base st6",
          d: "M269.4,15.2l-136.5,0c-18.3,0-33,14.8-33,33v0c0,18.3,14.8,33,33,33h136.5c18.3,0,33-14.8,33-33 v0C302.4,30,287.6,15.2,269.4,15.2z" }), /*#__PURE__*/
  
  
        React.createElement("path", {
          className: "st4",
          d: "M99.8,48.2c0,0,6.7,26.5,33.6,26.8c22.5,0.2,136.7,0.1,136.7,0.1s23.8,1.3,32.2-26.9c0,0,0.7,13.9-9.7,23.4 c-10.4,9.5-20,9.7-22.6,9.7c-2.6,0-137.3,0-137.3,0s-21.5,1.4-30.5-20.4C102.3,60.9,99.8,56.1,99.8,48.2z" }), /*#__PURE__*/
  
  
        React.createElement("g", { className: "preset", "data-preset": "drums", onClick: this.handlePreset }, /*#__PURE__*/
        React.createElement("path", {
          className: "base st8",
          d: "M268,39.3c-1.9-0.6-7.7-0.6-7.7-0.6c-18.5,0-17.5,7-17.5,7c0,0.1,0,0.2,0,0.2v11.4 c0,0,0,0.1,0,0.1c0.2,1.7,1.7,3.1,3,3.9c0.9,0.6,2.1-0.1,2.1-1.1v-4.9c0,0-0.1-1.6,1.6-1.6s1.7,1.8,1.7,1.8v7.1 c0,0.6,0.4,1.2,1,1.3c1.8,0.5,3.9,0.7,5.2,0.8c0.8,0,1.4-0.6,1.4-1.3v-5.6c0-0.1,0-0.1,0-0.2c0.1-0.4,0.4-1.6,1.7-1.6 c1.6,0,1.6,1.7,1.6,1.7v5.6c0,0.8,0.6,1.4,1.4,1.3c2.2-0.1,4.1-0.5,5.2-0.8c0.6-0.1,1-0.7,1-1.3v-7c0-0.1,0-0.2,0-0.2 c0.1-0.4,0.4-1.6,1.7-1.6c1.6,0,1.6,1.8,1.6,1.8v4.6c0,1.1,1.2,1.7,2.1,1.1c3-1.9,2.8-3.9,2.8-3.9V45.5c0-0.1,0-0.2,0-0.3 c0,0,0.6-4.7-5.2-5.5" }), /*#__PURE__*/
  
  
  
  
  
  
        React.createElement("path", {
          className: "top st8",
          d: "M268.3,42.7c5.3,0.2,6.1,3.4,6.1,3.4c0,4.2-14.4,4.4-14.4,4.4s-13.4-0.3-13.8-4.4 c0,0-1-4.2,17.2-3.8" }), /*#__PURE__*/
  
  
        React.createElement("path", {
          className: "stick st8",
          d: "M259.2,45l16.5-10.8c0.5-0.3,1.2-0.2,1.5,0.3l0.5,0.7c0.4,0.5,0.2,1.2-0.3,1.6l-16.6,10.8 c-0.5,0.3-1.2,0.2-1.5-0.3l-0.4-0.7C258.5,46,258.7,45.4,259.2,45z" })), /*#__PURE__*/
  
  
  
        React.createElement("g", {
          className: "preset",
          "data-preset": "guitar",
          onClick: this.handlePreset }, /*#__PURE__*/
  
        React.createElement("path", {
          className: "st8",
          d: "M190.8,61.1c0,0-4.9-5.7-1.2-11c0,0,1.5-1.8,3.1-2.1c1.6-0.4,3.4-0.3,4.1-1.9c0.7-1.6,2.4-5.1,7-4.5 c0,0,2.1,0.5,3.3,1.5l5.1-5c0,0,0.9-3,1.2-3.3c0.4-0.3,3.5-3.4,3.5-3.4s1.3-1,2.3-0.2s2.7,2.6,2.7,2.6s0.9,1,0.1,2.2 c-0.8,1.1-3.8,3.9-3.8,3.9l-3,1l-5.1,5.1c0,0,1.8,2.3,1.5,5c-0.4,2.7-1.8,4.1-3.6,4.9c-1.8,0.8-2.5,1.8-2.6,3s-1.2,5.2-5.7,5.9 C195.1,65.4,191.3,61.8,190.8,61.1z" }), /*#__PURE__*/
  
  
  
  
        React.createElement("circle", { className: "st8", cx: "200.9", cy: "52", r: "3.3" })), /*#__PURE__*/
  
        React.createElement("g", { className: "preset", "data-preset": "piano", onClick: this.handlePreset }, /*#__PURE__*/
        React.createElement("path", {
          className: "st9",
          d: "M163.4,62.4h-35.1c-1.1,0-2-0.9-2-2V38.3c0-1.1,0.9-2,2-2h35.1c1.1,0,2,0.9,2,2v22.1 C165.4,61.5,164.5,62.4,163.4,62.4z" }), /*#__PURE__*/
  
  
        React.createElement("path", {
          className: "st9",
          d: "M163.5,62.4h-35.2c-1.1,0-2-0.9-2-2V45.7h39.2v14.8C165.4,61.5,164.5,62.4,163.5,62.4z" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st9",
          d: "M137.1,54h-2.6c-0.6,0-1-0.5-1-1v-7.3h4.7V53C138.1,53.6,137.7,54,137.1,54z" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st9",
          d: "M147.2,54h-2.8c-0.6,0-1.1-0.5-1.1-1.1v-7.3h5v7.3C148.3,53.5,147.8,54,147.2,54z" }), /*#__PURE__*/
  
        React.createElement("path", {
          className: "st9",
          d: "M157.2,54h-2.6c-0.6,0-1-0.5-1-1v-7.3h4.7V53C158.2,53.6,157.7,54,157.2,54z" }), /*#__PURE__*/
  
        React.createElement("line", { className: "st9", x1: "135.8", y1: "54.1", x2: "135.8", y2: "62" }), /*#__PURE__*/
        React.createElement("line", { className: "st9", x1: "145.8", y1: "54.1", x2: "145.8", y2: "62" }), /*#__PURE__*/
        React.createElement("line", { className: "st9", x1: "155.8", y1: "54.1", x2: "155.8", y2: "62" })))));
  
  
  
  
    }}
  
  
  ReactDOM.render( /*#__PURE__*/React.createElement(Synth, null), document.getElementById("app"));