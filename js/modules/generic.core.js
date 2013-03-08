/**
 *  Core universal code for rendering ads accross sites/platforms
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){
    define(['utils.core', 'Ad', 'GPT_AdSlot', 'GPTConfig'], function(utils, Ad, GPT_AdSlot, GPTConfig){

      return {
        utils: utils,
        Ad: Ad,
        GPT_AdSlot: GPT_AdSlot,
        GPTConfig: GPTConfig,
        template: {},
        init: []
      };

    });
  }

})(window, document, window.define);
