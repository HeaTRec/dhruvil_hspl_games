const frame = new Frame("fit", 1024, 768, "#EEE", "#555", "cathead.png", "https://assets.codepen.io/2104200/");
frame.on("ready", () => {// ES6 Arrow Function - similar to function(){}
  zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

  // often need below - so consider it part of the template
  const stage = frame.stage;
  const stageW = frame.width;
  const stageH = frame.height;

  // REFERENCES for ZIM at https://zimjs.com
  // see https://zimjs.com/intro.html for an intro example
  // see https://zimjs.com/learn.html for video and code tutorials
  // see https://zimjs.com/docs.html for documentation
  // see https://codepen.io/topic/zim/ for ZIM on CodePen

  // *** NOTE: ZIM Cat defaults to time in seconds
  // All previous versions, examples, videos, etc. have time in milliseconds
  // This can be set back with TIME = "milliseconds" but we suggest you give it a try!
  // There will be a warning in the conslole if your animation is not moving ;-)

  // CODE HERE

  // Here we use ZIM Connectors to connect the dots
  // This could be used in an e-learning app like we do here https://zimjs.com/elearning

  var cat = asset("cathead.png").sca(.7).alp(.1).center();

  // used recordPoints() to make then record the points for the Blob 
  // var blob = new Blob({points:10, controlType:"none"}).loc(cat);
  // cat.tap(function () {
  //     blob.recordPoints(true); 
  // });
  blob = new Blob({
    points: [[-35.5, 478.7, 0, 0, 0, 0, 0, 0, "none"], [51.2, 257.9, 0, 0, 0, 0, 0, 0, "none"], [-15.3, 207.7, 0, 0, 0, 0, 0, 0, "none"], [-1.3, -56.7, 0, 0, 0, 0, 0, 0, "none"], [98.1, 87.2, 0, 0, 0, 0, 0, 0, "none"], [148.5, 88.6, 0, 0, 0, 0, 0, 0, "none"], [203.9, -57.4, 0, 0, 0, 0, 0, 0, "none"], [303.4, 222.5, 0, 0, 0, 0, 0, 0, "none"], [193, 263.5, 0, 0, 0, 0, 0, 0, "none"], [193.8, 482.5, 0, 0, 0, 0, 0, 0, "none"]] });


  var connectors = new Connectors({
    points: blob,
    linear: true,
    linearOrder: true }).
  loc(cat);

  var nums = new Container().loc(cat);
  loop(connectors.points, function (point, i) {
    var dot = new Circle(12, purple).loc(point[0], point[1], nums).noMouse();
    new Label({ text: i + 1, color: white, valign: CENTER, align: CENTER, size: 16 }).centerReg(dot);
  });

  connectors.on("complete", function () {
    cat.animate({ alpha: 1 });
    nums.animate({ alpha: 0 });
    connectors.cache().animate({ alpha: .5 });
  });


  stage.update(); // this is needed to show any changes

  // DOCS FOR ITEMS USED
  // https://zimjs.com/docs.html?item=Frame
  // https://zimjs.com/docs.html?item=Container
  // https://zimjs.com/docs.html?item=Circle
  // https://zimjs.com/docs.html?item=Blob
  // https://zimjs.com/docs.html?item=Label
  // https://zimjs.com/docs.html?item=Connectors
  // https://zimjs.com/docs.html?item=tap
  // https://zimjs.com/docs.html?item=noMouse
  // https://zimjs.com/docs.html?item=animate
  // https://zimjs.com/docs.html?item=loop
  // https://zimjs.com/docs.html?item=loc
  // https://zimjs.com/docs.html?item=alp
  // https://zimjs.com/docs.html?item=sca
  // https://zimjs.com/docs.html?item=centerReg
  // https://zimjs.com/docs.html?item=center
  // https://zimjs.com/docs.html?item=zog

  // FOOTER
  // call remote script to make ZIM icon - you will not need this
  createIcon();
  createGreet();

}); // end of ready