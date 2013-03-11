/**
 * Overrides for standard configuration of ad spots for unique circumstances on washingtonpost.com (desktop)
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){
    define('wp.overrides', ['overrides.core', 'utils.core'], function(overrides, utils){

      /**
       * Object of checks for overrides
       * keys of check functions will be evaluated as Regular Expressions. 
       * EG: key could = '^politics$'
       */
      overrides.checks = {
        pos: {
          //if 'pos' of the ad === leaderboard..
          'leaderboard$': function(){
            this.keyvalues['lb_test_kv'] = ['true'];
            this.keyvalues.pos.push('ad1');
            //this.keyvalues.pos.push('ad1');
          }
        },
        where: {
          //if 'where' of the ad matches 'washingtonpost.com'...
          /*'washingtonpost.com': function(){
            if(utils.urlCheck('reload', {type: 'variable'}) === 'true'){
              this.config.where += '/reloaded';
            }
          },*/
          '^politics$': function(){
            this.config.where += '/front';
          }
        }
      };

      return overrides;

    });
  }

})(window, document, window.define);