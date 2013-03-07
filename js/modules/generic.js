/**
 *  Extended universal code for rendering ads on desktop
 */
(function(w, d, commercialNode, define){

  'use strict';

  if(typeof define === 'function'){
    define('generic', ['generic.core', 'utils', 'estNowWithYear', 'zoneBuilder'], function(wpAd, utils, estNowWithYear, zoneBuilder){

      return utils.extend(wpAd, {
        utils: utils,
        estNowWithYear: estNowWithYear,
        zoneBuilder: zoneBuilder
      }, true);

    });
  }

})(window, document, window.commercialNode, window.define);