/**
 *  Overrides for standard configuration of ad spots for unique circumstances on washingtonpost.com (desktop)
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){
    define('wp.overrides', ['overrides.core'], function(overrides){

      /**
       *  Object of checks for overrides
       */
      overrides.checks = {
        pos: {
          //if 'pos' of the ad === leaderboard..
          leaderboard: function(){
            this.keyvalues['lb_test_kv'] = 'true';
            this.keyvalues.pos.push('ad1');
          }
        },
        where: {
          //if 'where' of the ad === 'washingtonpost.com'...
          'washingtonpost.com': function(){

          },
          politics: function(){

          }
        }
      };

      return overrides;

    });
  }

})(window, document, window.define);