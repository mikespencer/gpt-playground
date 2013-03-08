/**
 * GPT formatted ad slot builder
 */
(function(w, d, define){

  'use strict';

  if(typeof define === 'function'){

    define('GPT_AdSlot', ['utils.core'], function(utils){

      function GPT_AdSlot(ad){
        this.config = ad.config;
        this.keyvalues = ad.keyvalues;
        this.container = this.config.wpni_adi || this.config.slug;
        if(this.container){
          this.adslot = googletag.defineSlot(this.config.dfpSite + this.config.where, this.config.size, this.container.id).addService(googletag.pubads());
          this.addKeyvalue(this.keyvalues);
        }
      }

      GPT_AdSlot.prototype = {
        constructor: GPT_AdSlot,

        get: function(){
          return this.adslot;
        },

        render: function(){
          if(this.config.slug){
            this.config.slug.style.display = 'block';
          }
          if(this.config.wpni_adi){
            this.config.wpni_adi.style.display = 'block';
          }
          googletag.display(this.container.id);
        },

        refresh: function(){
          googletag.pubads().refresh([this.adslot]);
        },

        addKeyvalue: function(){
          if(typeof arguments[0] === 'object'){
            var map = arguments[0], key;
            for(key in map){
              if(map.hasOwnProperty(key)){
                this.adslot.setTargeting(key, (typeof map[key] === 'object' ? map[key] : [map[key]]));
              }
            }
          } else if(arguments.length === 2){
            this.adslot.setTargeting(arguments[0], (typeof arguments[1] === 'object' ? arguments[1] : [arguments[1]]));
          }
          return this;
        }
      };

      return GPT_AdSlot;

    });
  }

})(window, document, window.define);