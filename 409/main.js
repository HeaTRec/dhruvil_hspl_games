$(".numbers").on('click','li',function(e){
    e.preventDefault();
    $v = $(this).text().trim(),
    $r = $('.result');
    if($r.text()==='0'){$r.empty()};
    if($v==="=" ) {
      var r = eval($r.text());
      $r.text(r)
      return true;
    }
    
    if($v==="c" ) {$r.empty().append(0);return true;}
    $r.append($v)
  })