const frame = new Frame("fit", 1024, 768, darker, grey);
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

  // CODE HERE

  // just knowing this will not solve the puzzle...
  const raw = "ILOVEMAKINGPUZZLESWITHZIMWILLYOUTRYONEDAY?";
  const letters = Array.from(raw);
  const data = {};

  const indicator = new Indicator({ num: 4, fill: true }).pos(30, 30, RIGHT);

  // because letters repeat, can't use them as object literal props 
  // so use the ZIM Hierarchy() complex format with just id, obj and list
  // https://zimjs.com/docs.html?item=Hierarchy

  // recursively create data
  let id = 0;
  function build(parent, num, max) {
    if (num > max) return;
    num++;
    loop(num, () => {
      let next = {};
      let letter = letters[id % letters.length];
      parent["id" + id] = { obj: letter, list: next };
      id++;
      build(next, num, max);
    });
  }
  build(data, 0, 4);

  const menu = new RadialMenu({
    menu: data,
    coreRadius: 30,
    coreColor: silver,
    title: "*",
    backgroundColor: green,
    selectedBackgroundColor: red,
    selectedRollColor: white,
    rollBackgroundColor: white,
    rollColor: dark,
    borderWidth: 0,
    totalAngle: 40,
    startAngle: 160 }).

  sca(1.2).
  pos(0, -200, CENTER, CENTER).
  animate({
    props: { alpha: 0 },
    from: true,
    time: 2000 });


  const emitter = new Emitter({
    obj: new Circle([30, 40], clear, white, [2, 4, 6]),
    startPaused: true }).
  loc(menu).spurt(40);

  menu.title.mov(0, 6);
  menu.change(() => {
    if (!menu.selected) return;
    correct++;
    if (menu.selected.id != "id" + correct) {
      oops.show();
      startPuzzle();
    }
    if (menu.text == "?") {
      indicator.selectedIndex++;
      stage.update();
    }
    if (correct == id) {
      emitter.spurt(30);
      yay.show();
      indicator.selectedIndex++;
      stage.update();
    }
  });

  const oops = new Pane({
    width: stageW + 100,
    backgroundColor: red,
    color: white,
    label: "OOPS" });

  oops.on("close", () => {
    emitter.spurt(15);
  });

  const yay = new Pane({
    width: stageW + 100,
    backgroundColor: purple,
    color: white,
    label: "CONGRATULATIONS!" });

  yay.on("close", () => {
    emitter.spurt(15);
    startPuzzle();
  });

  let correct = 0;
  function startPuzzle() {
    indicator.selectedIndex = -1;
    correct = 0;
    menu.closeRings();
  }
  startPuzzle();

  new Label("ZIM - Tree Puzzle", null, null, white).pos(30, 30).alp(.7);


  stage.update(); // this is needed to show any changes

  // DOCS FOR ITEMS USED
  // https://zimjs.com/docs.html?item=Frame
  // https://zimjs.com/docs.html?item=Circle
  // https://zimjs.com/docs.html?item=Label
  // https://zimjs.com/docs.html?item=Pane
  // https://zimjs.com/docs.html?item=Indicator
  // https://zimjs.com/docs.html?item=RadialMenu
  // https://zimjs.com/docs.html?item=change
  // https://zimjs.com/docs.html?item=animate
  // https://zimjs.com/docs.html?item=loop
  // https://zimjs.com/docs.html?item=pos
  // https://zimjs.com/docs.html?item=loc
  // https://zimjs.com/docs.html?item=mov
  // https://zimjs.com/docs.html?item=alp
  // https://zimjs.com/docs.html?item=sca
  // https://zimjs.com/docs.html?item=Emitter
  // https://zimjs.com/docs.html?item=Hierarchy
  // https://zimjs.com/docs.html?item=zog

  // FOOTER
  // call remote script to make ZIM icon - you will not need this
  createIcon();

}); // end of ready