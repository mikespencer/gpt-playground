/**
 *  Extended universal code for rendering ads on desktop
 */
(function(w, d, commercialNode, define){

  'use strict';

  if(typeof define === 'function'){
    define('generic', ['generic.core', 'utils', 'estNowWithYear'], function(wpAd, utils, estNowWithYear){

      return utils.extend(wpAd, {
        utils: utils,
        estNowWithYear: estNowWithYear
      }, true);

    });
  }

})(window, document, window.commercialNode, window.define);