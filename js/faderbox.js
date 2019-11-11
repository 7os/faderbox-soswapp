/*! 7OS -Web dnav: https://github.com/7os/faderbox-soswapp
  ! Requires 7os/theme-soswapp available @ https://github.com/7os/theme-soswapp
*/
if (typeof sos == 'undefined') window.sos = {}; // Seven OS
if ( typeof sos.config !== 'object' ) sos.config = {};
sos.faderBox = {
  url : function(url,pdata,opts,callBack){
    var options = {
      method    : 'get',
      overlay   : true,
      showLoader: true,
      coc       : false,
      dataType  : 'text',
      theme     : 'light',
      exitBtn   : false
    }
    var optionVals = {
      method : ['post','get'],
      overlay : [true,false],
      showLoader : [true,false],
      coc : [true,false],
      exitBtn : [true,false],
      dataType : ['text','html','json','xml','script'],
      theme : ['light','dark']
    }
    if( opts !== undefined && typeof opts =='object' ){
      $.each(opts, function(key, val) {
        if( key in options && in_array(val, optionVals[key]) ){
          options[key] = val;
        }
      });
    }
    var doFetch = function(){
      $.ajax({
        url       : url,
        // async     : false,
        type      : options.method,
        data      : pdata,
        dataType  : options.dataType,
        success : function(data){
          sos.faderBox.removeLoader();
          if( typeof callBack == 'undefined' ){
            var output = '';
            if( options.exitBtn ) output += exitBtn;
            output += data;
            view.html(output);
          }else{
            callBack(data);
            if( options.overlay || options.showLoader ) faderBox.close();
          }
        },
        error: function(){
          faderBox.close();
          alert("Failed to load requested recources.",{type:'error'});
        }
      });
    }

    var existing = $(document).find('#sos-faderbox-overlay');
    var exitBtn = '<button type="button" class="btn" id="sos-exit-btn" onclick="faderBox.close();"> <i class="fas fa-times"></i></button>';
    var container = '<div id="sos-faderbox-overlay"';
    if( options.overlay ) container += ' class="'+options.theme+'"'
    container += '>';
    if( options.exitBtn ) container += exitBtn;
    if( options.showLoader ) container += ' <div id="sos-faderbox-loader"><i class="fas fa-spinner fa-pulse"></i></div>';
    // if( options.showLoader ) container += ' ;
    container += '</div>';

    if( options.overlay || options.showLoader ){
      if( existing.length > 0 ) faderBox.close();
      $('body').append(container).addClass('no-scroll');
      var view = $(document).find('#sos-faderbox-overlay');
      view.animate({opacity:1},300,function(){
        doFetch();
      });
    }else{
      doFetch();
    }
  },
  close : function(){
    var fader = $(document).find('#sos-faderbox-overlay');
    if( fader.length > 0 ){
      fader.animate({opacity:0},250,function(){ fader.remove(); });
      $('body').removeClass('no-scroll');
    }
  },
  removeLoader : function() {
    var loader = $(document).find('#sos-faderbox-loader');
    if( loader.length > 0 ){
      loader.animate({opacity:0},250,function(){ loader.remove(); });
    }
  },
  addLoader : function() {
    var loader = $(document).find('#sos-faderbox-loader');
    if( loader.length <= 0 ){
      $('#fader-overlay').html('<span id="sos-faderbox-loader"></span>');
    }
  },
}

window.faderBox = sos.faderBox; // will soon be discontinued
