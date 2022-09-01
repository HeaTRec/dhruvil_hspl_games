
function init(){
    $(document).ready(function(){
      var theUltimate;
      var theInit = setInterval(function(){init()},20)
      var initCount = 0;
      function init(){
        $('.small-box').text('');
        function randNum(){
          return Math.ceil(Math.random()*9);
        } 
        var boxNum = new Array();
        var rowNum = new Array();
        var colNum = new Array();
        var box = {
          'box-1':[],'box-2':[],'box-3':[],
          'box-4':[],'box-5':[],'box-6':[],
          'box-7':[],'box-8':[],'box-9':[],
        }
        var row = {
          'row-1':[],'row-2':[],'row-3':[],
          'row-4':[],'row-5':[],'row-6':[],
          'row-7':[],'row-8':[],'row-9':[],
        }
        var col = {
          'col-1':[],'col-2':[],'col-3':[],
          'col-4':[],'col-5':[],'col-6':[],
          'col-7':[],'col-8':[],'col-9':[],
        }
  
        begin();
        function begin(){
          for(var v = 1; v <= 9; v++){
            a = fillBoxes(v);
            if(a==false){console.log("failure")}}
        }
  
        function fillBoxes(b){
          $('.box-'+b+' .small-box').each(function(){
            var t = $(this); 
            var x;
            var clss = t.parent().attr('class');
            boxNum = clss[16];
            var clss = t.attr('class'); 
            rowNum = clss[18];
            colNum = clss[24]; 
            x = randNum();
            i=0;
  
            while(box['box-'+boxNum].indexOf(x)>=0||row['row-'+rowNum].indexOf(x)>=0||col['col-'+colNum].indexOf(x)>=0) {
              i++;
              if(i>40){
                if(b<9){return init();} 
                else{fillBoxes(b);}
              } 
              x = randNum();
            } 
            box['box-'+boxNum].push(x);
             row['row-'+rowNum].push(x);
             col['col-'+colNum].push(x);
            if(i<=41)t.text(x);
            else{ 
              i=0;
              while(box['box-'+boxNum].indexOf(x)>=0||
                    row['row-'+rowNum].indexOf(x)>=0||
                    col['col-'+colNum].indexOf(x)>=0){
                i++;
                if(i>50){t.stop();return false;}
                x = randNum();
              }      
            }
            return true;
          });
        }; 
        clearInterval(theInit);
        var ck = 0;
        theUltimate = true;
        console.log('YAAAAYY');
        setTimeout(function(){
          $('.small-box').each(function(){
            var x = $(this);
            var num = Number(x.text());
          });
          removeCells();
        },300);
  
  
        function removeCells(){
          $('.small-box').each(function(){
            var x = $(this);
            var n = Math.random()*9;
            if(n<=3.5) {
              x.text('')
              x.attr('contenteditable','true');
            }
            x.css('background','none')
  
          })
        };
        $("*").show();
        $(".loading-screen").hide()
  
        checkAll();
  
      };
  
    ///////////////////////////////////////////////////////////////
    });////////////////////////////////////////////////////////////
  }
  init();