/**
 *  Provides core functionality for overrides
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){
    define('overrides.core', function(){

      var overrides = {

        /**
         *  Takes an Ad object (from generic.js), modifies it with any specific overrides, then returns it
         */
        exec: function(ad) {
          for(var key in overrides.checks){
            if(overrides.checks.hasOwnProperty(key) && ad.config[key] && overrides.checks[key][ad.config[key]]){
              overrides.checks[key][ad.config[key]].call(ad);
            }
          }
          return ad;
        }
      };
      return overrides;

    });
  }

})(window, document, window.define);