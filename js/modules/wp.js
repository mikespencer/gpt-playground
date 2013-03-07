/**
 *  washingtonpost.com site specific ad script (desktop)
 */
(function(w, d, commercialNode, define){

  'use strict';

  if(typeof define === 'function'){
    define('wp', ['generic', 'wp.config', 'wp.overrides'], function(wpAd, config, overrides){

      /**
        * Add ad specific, site specific keyvalues here:
        */
      wpAd.utils.extend(wpAd.Ad.prototype.keyvalues_config, {
        article: function(){
          return ['wp_article'];
        }
      });

      /**
        * Add global, site specific keyvalues here:
        */
      wpAd.utils.extend(wpAd.GPTConfig.prototype.keyvalues_config, {
        WPATC: function(){
          return ['wpatc_cookie'];
        },
        front: function(){
          return ['true'];
        }
      });

      //commercialNode base:
      wpAd.dfpSite = '/701/wpni.';

      //pass in config:
      wpAd.config = config;

      //pass in site specific overrides:
      wpAd.overrides = overrides;

      //testing
      wpAd.init.push(function(){
        try{w.console.log('loaded and initialising');}catch(e){}
      });

      return wpAd;
    });
  }

})(window, document, window.commercialNode, window.define);