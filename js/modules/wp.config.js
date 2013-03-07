/**
 *  Template of ad flights and available ad spots on washingtonpost.com (desktop)
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){
    define('wp.config', function(){
      return {
        flights: {
          defaults: ['leaderboard', 'bigbox', 'flex', 'bigbox_2']
        },
        adTypes: {
          leaderboard: {
            sz: [[728, 90]],
            pos: 'leaderboard'
          },
          bigbox: {
            sz: [[300, 250]],
            pos: 'bigbox'
          },
          flex: {
            sz: [[300, 250], [300, 600], [336, 850], [160, 600]]
          }
        }
      };
    });
  }

})(window, document, window.define);