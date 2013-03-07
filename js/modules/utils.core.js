/**
 *  Essential helper functions for ads
 */
(function(w, d, define){

  'use strict';

  /**
   * Helper functions for core functionality (extend in generic.full)
   */
  var utils = {
    urlCheck: function (arg) {
      var loc = parent.window.location.href || d.referrer,
        obj = (arguments[1] && typeof arguments[1] === 'object') ? arguments[1] : null,
        regex = (obj !== null && obj.type === 'variable') ? new RegExp("[\\?&;]" + arg + "=([^&#?]*)") : new RegExp(arg),
        results = regex.exec(loc);
      return (results === null) ? null : results[results.length - 1];
    },
    extend: function(obj, additions, deep){
      deep = deep || false;
      for(var key in additions){
        if(!deep || (!utils.isObject(obj[key]) || !utils.isObject(additions[key]))){
          obj[key] = additions[key];
        } else{
          obj[key] = utils.extend(obj[key], additions[key], true);
        }
      }
      return obj;
    },
    keyvalueIterator: function(obj, context){
      context = context || this;
      var rv = {}, key, val;
      for(key in obj){
        if(obj.hasOwnProperty(key)){
          val = obj[key].call(context);
          if(val){
            //lets always make this an array, so that we can push to it later if necessary (overrides)
            val = typeof val === 'object' ? val : [val];
            rv[key] = val;
          }
        }
      }
      return rv;
    },
    isObject: function(obj){
      return obj !== null && typeof obj === 'object';
    }
  };

  if(typeof define === 'function'){
    define('utils.core', function(){
      return utils;
    });
  }


})(window, document, window.define);