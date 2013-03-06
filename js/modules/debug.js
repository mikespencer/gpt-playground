/**
 *  Debug info for wp adops
 *  @author: Mike Spencer michael.spencer@washpost.com
 */
(function(w, d){

  'use strict';

  var debug = {
    useConsole: w.console ? true : false,
    buildDebugBox: function(ad){
      // use Ad settings to construct debug box
    }
  };

  if(typeof w.define === 'function'){
    w.define(function(){
      return debug;
    });
  }

})(window, document);