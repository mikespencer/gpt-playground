/*global googletag*/
/**
 * wpAd Ad object. Builds an individual ad
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){

    define('Ad', ['utils.core'], function(utils){

      function Ad(config){

        this.config = utils.extend({
          'dfpSite': '/701/wpni.',
          'where': undefined,
          'size': null,
          'what': null,
          'pos': false,
          'posOverride': false
        }, config, true);

        this.getSlug();

        this.keyvalues = utils.keyvalueIterator(this.keyvalues_config, this);
      }

      Ad.prototype = {
        constructor: Ad,

        getSlug: function(){
          this.config.slug = d.getElementById('slug_' + this.config.pos);
          this.config.wpni_adi = d.getElementById('wpni_adi_' + this.config.pos);
        },

        hardcode: function(){
          googletag.content().setContent(this.slot, this.hardcode);
        },

        keyvalues_config: {
          pos: function(){
            return this.config.pos;
          }
        }

      };

      return Ad;

    });
  }

})(window, document, window.define);