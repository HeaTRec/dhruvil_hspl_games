/*
Green = awesome
Blue = good
Orange = good
Red = fail
*/
var pCs = 1;
var point = 0;
var gCs = Math.floor(Math.random() * (250 - 100 + 1)) + 100;

$(function() {
  $('body').on('click', function() {
    if (pCs == gCs) {
      $('#bg').css('background-color', "#27ae60")
      gCs = Math.floor(Math.random() * (250 - 59 + 1)) + 50;
      point += 5;
    } else if (pCs >= gCs - 15 && pCs < gCs) {
      $('#bg').css('background-color', "#3498db")
      gCs = Math.floor(Math.random() * (250 - 59 + 1)) + 50;
      point += 2;
    } else if (pCs <= gCs + 15 && pCs > gCs) {
      $('#bg').css('background-color', "#e67e22")
      gCs = Math.floor(Math.random() * (250 - 59 + 1)) + 50;
      point += 2;
    } else {
      $('#bg').css('background-color', "#c0392b")
      point -= 1;
    }
    pCs = 1;
  })

  setInterval(function() {
    pCs += 2;
    $('#point').text(point);
    $('#gc').css({
      'width': gCs + 'px',
      'height': gCs + 'px'
    })
    $('#pc').css('opacity', '1')
    $('#pc').css({
      'width': pCs + 'px',
      'height': pCs + 'px'
    })

    if (pCs >= gCs + 100) {
      pCs = 1;
    }
    if(point <= 0){
      point = 0;
    }
  }, 10)
})