/**

Environment builder
  build html board with inputs of height/length
    -height/lenght can be random
    creates cells
  use input or random number to populate field with mines
    mine max needs to be set 
      either so that it is possible to play
      or just to be within the total number of cells
    at least one mine

**/
console.log(new Date().getHours() % 12 + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "." + new Date().getMilliseconds());


$(document).ready(function () {

  // Global int height of game board
  var HEIGHT;

  // Globar int width of game board
  var WIDTH;

  // Global boolean for testing if timer is set
  var TIMER_SET = false;

  // Global object for interval
  var TIMER_INTERVAL;

  // Global in for number of mines on the game board
  var mines = 0;

  // Set the number of mines to the current value of the #mines input field
  mines = createGame($('#height').val(), $('#width').val(), $('#mines').val());

  // Create and build the gameboard
  function createGame(h, w, m) {
    HEIGHT = h;
    WIDTH = w;
    const MINES = m;
    $('.mine-count').text($('#mines').val());
    $('#game-board .row').remove();
    $('#game-board').removeClass('dead');
    function createBoard(height, width) {
      var board = [];
      for (let h = 0; h < height; h++) {
        board.push('<div class="row">');
        for (let w = 0; w < width; w++) {
          board.push(`<div class="cell col-${w} row-${h}" ></div>`);
        }
        board.push('</div>');
      }
      return board.join("");
    }
    const gameboard = createBoard(HEIGHT, WIDTH);
    $('#game-board').append(gameboard);
    return MINES;
  }
  function timer() {

    $(".timer").text("0");
    TIMER_INTERVAL = setInterval(function () {
      $(".timer").text(1 * $(".timer").text() + 1);
    }, 1000);
    TIMER_SET = true;
  }
  function populateMines(count) {
    if (!TIMER_SET) {
      timer();
    }
    if (!mines) return;
    if (count > Math.floor(HEIGHT * WIDTH) / 2) {
      count = Math.floor(HEIGHT * WIDTH) / 2;
    }
    while (count > 0) {
      var randomRow = Math.floor(Math.random() * HEIGHT);
      var randomCol = Math.floor(Math.random() * WIDTH);
      //console.log(randomRow + " " + randomCol);
      var x = ".cell.col-" + randomCol + ".row-" + randomRow;
      if ($(x).hasClass('bomb') || $(x).hasClass('clear')) {
        continue;
      }
      $(x).addClass('bomb');
      count--;

    }
  }

  // Gameplay
  $('#options').hide();
  $('button.options').click(function () {
    $('#options').toggle();
  });

  $('button.start, button#build-game').click(function () {
    clearInterval(TIMER_INTERVAL);
    TIMER_SET = false;
    $('.timer').text('0');
    mines = createGame($('#height').val(), $('#width').val(), $('#mines').val());
    $('#game-board').removeClass('dead');
    //this.preventDefault()
  });

  var SHIFT_DOWN = false;
  $(window).keydown(function (e) {
    if (e.key === "Shift") {
      SHIFT_DOWN = true;
    }
  });
  $(window).keyup(function (e) {
    if (e.key === "Shift") {
      SHIFT_DOWN = false;
    }
  });

  $("#game-area").on('click', '.cell', function () {

    if (SHIFT_DOWN && !$(this).hasClass('clear')) {
      if ($(this).hasClass('flagged')) {
        $(this).removeClass('flagged');
        var t = $(this);
        $(this).html("<span></span>");

        $('.mine-count').text($('.mine-count').text() * 1 + 1);
      } else {
        $(this).addClass('flagged');
        $(this).html("<span>O</span>");
        $('.mine-count').text($('.mine-count').text() * 1 - 1);
      }
      return;
    }

    if ($(this).hasClass('flagged')) return;

    $(this).addClass('clear');

    populateMines(mines);
    mines = 0;

    if ($(this).hasClass('bomb')) {
      $(this).removeClass('clear');

      $('#game-board').addClass('dead');
      //alert("KABOOM");
      $('.bomb').each(function (i, e) {
        if ($(e).hasClass('flagged')) {
          //Remove the next three actions to presrve flags or have an altered affect for correct ones
          /*
          $(e).addClass('flagged');
          $(e).addClass('clear');
          $(e).html('<span>M</span>');
          */
          $(e).addClass('green-text');
        } else {
          $(e).addClass('flagged');
          $(e).addClass('clear');
          $(e).html('<span>M</span>');
        }
      });
      clearInterval(TIMER_INTERVAL);
      //$('.timer').text('0')
      TIMER_SET = false;
      return;
    }

    //console.log($(this).attr('class'))
    var colNumber = $(this).attr('class').split(' ')[1].slice(4) * 1;
    var rowNumber = $(this).attr('class').split(' ')[2].slice(4) * 1;
    function checkNeighbors(xOffSet, yOffSet) {

      var neighbors = "";
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          try {
            if ($(".col-" + (colNumber - j + 1 + xOffSet) + ".row-" + (rowNumber - i + 1 + yOffSet)).hasClass('bomb')) {
              neighbors++;
            }
            //console.log(colNumber-j + 1, rowNumber-j + 1)
          } catch (err) {
            //console.log(err);
          }
        }
      }
      return neighbors;
    }
    var neighbors = checkNeighbors(0, 0);

    console.log(neighbors);
    /*
    // check surrounding neighbors
    if(neighbors === ""){
      console.log('zero');
      console.log(rowNumber, colNumber)
      var row1 = [-1,0,1];
      var col1 = [-1,0,1];
      row1.forEach(function(e,i){
        col1.forEach(function(f,j){
          
          console.log('e:',e, 'f:',f)
          if(f==0 && e==0 || $(".col-" + (colNumber - j + 1 + col1) + ".row-" + (rowNumber - i + 1 + row1)).hasClass('bomb')){}
          
          else{
            //alert('in2')
            var neighbors = checkNeighbors(e,f);
            console.log("neighbors:", neighbors)
            console.log("colNumber, rowNumber", colNumber*1, rowNumber*1)
            console.log("colNumber + f, rowNumber + e", colNumber*1 + e*1, rowNumber*1 + f*1)
            if(neighbors == 0){
              try{
                $('.col-' + (colNumber*1 + e*1 + 1) + '.row-' + (rowNumber*1 + f*1 + 1) ).html("<span>" + neighbors + "</span>");
                $('.col-' + (colNumber*1 + e*1) + '.row-' + (rowNumber*1 + f*1) ).addClass('clear')
              } catch(err){
                console.log(err);
              }
            }
          } 
        })
      })
    }
    */
    //console.log('neighbors: ', neighbors)
    $(this).html("<span>" + neighbors + "</span>");
    checkGame();
  }); // end on cell click


  function checkGame() {
    var notDone = HEIGHT * WIDTH;
    $('.cell').each(function (i, e) {
      if ($(e).hasClass('bomb') || $(e).hasClass('clear')) {
        notDone--;
      }
    });
    if (!notDone) {
      alert("CONGRADULATIONS! YOU'VE BEATEN MINESWEEPER");
      mines = createGame($('#height').val(), $('#width').val(), $('#mines').val());
      clearInterval(TIMER_INTERVAL);
      $('.timer').text('0');
      TIMER_SET = false;
    }
  }


});