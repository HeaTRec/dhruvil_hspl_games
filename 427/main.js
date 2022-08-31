const frame = new Frame("fit", 1024, 768, green, dark, "puzzle.jpg", "https://assets.codepen.io/2104200/");
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

  // CODE HERE

  const thumbs = [];
  const cols = 3;
  const rows = 3;

  const image = asset("puzzle.jpg");
  const w = image.width / cols;
  const h = image.height / rows;

  // cut up the image and shift its location
  loop(rows, r => {
    loop(cols, c => {
      thumbs.push(new Bitmap(image, w, h, c * w, r * h));
    });
  });

  // normally a Tile makes copies of the object passed to it 
  // and if we passed an array, it would randomly pick from the array 
  // As of ZIM Cat... an unique parameter has been added to Tile (true here)
  // that means it will just use the array to make a unique series
  var tile = new Tile(thumbs, cols, rows, 0, 0, true);


  // the Scrambler will let the user slide the tile elements!
  const puzzle = new Scrambler({
    tile: tile,
    time: 2, // optional time to scramble and number of scrambles
    num: 3 }).
  center();
  puzzle.on("complete", function () {
    image.centerReg().animate({
      props: { rotation: -360 },
      time: 2,
      ease: "backInOut",
      call: () => {
        image.tap(() => {
          // time, wait, num
          puzzle.addTo().scramble(2, 0, 4);
          image.removeFrom();
        }, true); // once				
      } });

    puzzle.removeFrom();
  });

  // to include a Teleporter in a ZIM app 
  // import https://zimjs.org/teleporter.js
  // and pass in the URL of your CodePen page
  const url = "https://codepen.io/zimjs/pen/JjGWLYy";
  const teleporter = new Teleporter(url).sca(.3).pos(30, 20, LEFT, BOTTOM);
  // To include a Teleporter on your HTML page see this Pen for an example
  // https://codepen.io/zimjs/pen/WNxQPLp

  stage.update(); // this is needed to show any changes

  // DOCS FOR ITEMS USED
  // http://zimjs.com/docs.html?item=frame

  // FOOTER
  // call remote script to make ZIM icon - you will not need this
  createIcon();

}); // end of ready