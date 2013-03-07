/**
 *  Core universal code for rendering ads accross sites/platforms
 */
(function(w, d, define, undefined){

  'use strict';

  define(['utils.core'], function(utils){

    /**
     * wpAd Ad object. Builds an individual ad
     */
    function Ad(config){
      this.config = utils.extend({
        'dfpSite': '/701/wpni.',
        'where': undefined,
        'slug': null,
        'delivery': false,
        'sz': null,
        'what': null,
        'pos': false,
        'posOverride': false
      }, config, true);

      this.getSlug();

      this.keyvalues = utils.keyvalueIterator(this.keyvalues_config, this);
      //this.slot = new GPT_AdSlot(this);
    }

    Ad.prototype = {
      constructor: Ad,

      getSlug: function(){
        this.config.slug = d.getElementById('slug_' + this.config.pos) || d.getElementById('wpni_adi_' + this.config.pos);
        this.config.slug_str = this.config.slug ? this.config.slug.id : null;
      },

      hardcode: function(){
        googletag.content().setContent(this.slot, this.hardcode);
      },

      keyvalues_config: {
        pos: function(){
          return [this.config.pos];
        }
      }

    };


    /**
      * GPT formatted ad slot builder
      */
    function GPT_AdSlot(ad){
      this.config = ad.config;
      this.keyvalues = ad.keyvalues;
      this.adslot = googletag.defineSlot(this.config.dfpSite + this.config.where, this.config.sz, this.config.slug_str).addService(googletag.pubads());
      this.addKeyvalue(this.keyvalues);
    }

    GPT_AdSlot.prototype = {
      constructor: GPT_AdSlot,

      get: function(){
        return this.adslot;
      },

      render: function(){
        this.config.slug.style.display = 'block';
        googletag.display(this.config.slug_str);
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


    /**
     * GPT Initial setup
     * probably a better way to do this, merge/integrating with GPT_AdSlot?..
     */
    function GPTConfig(config){
      this.config = config || {
        googletag: w.googletag
      };

      this.googletag = this.config.googletag;
      this.pubservice = this.googletag.pubads();

      this.keyvalues = utils.keyvalueIterator(this.keyvalues_config, this);
      this.addKeyvalue(this.keyvalues);

      if(this.config.sra){
        this.pubservice.enableSingleRequest();
      } else {
        this.pubservice.enableAsyncRendering();
      }

      this.googletag.enableServices();
    }

    GPTConfig.prototype = {
      constructor: GPTConfig,

      interstitial: function(){
        //interstitial setup - define out of page slot
      },

      addKeyvalue: function(){
        if(typeof arguments[0] === 'object'){
          var map = arguments[0], key;
          for(key in map){
            if(map.hasOwnProperty(key)){
              this.pubservice.setTargeting(key, (typeof map[key] === 'object' ? map[key] : [map[key]]));
            }
          }
        } else if(arguments.length === 2){
          this.pubservice.setTargeting(arguments[0], (typeof arguments[1] === 'object' ? arguments[1] : [arguments[1]]));
        }
        return this;
      },

      keyvalues_config: {
        rs: function(){
          return ['rs_values'];
        },
        kw: function(){
          var param = utils.urlCheck('test_ads', {type: 'variable'});
          return param ? ['test_' + param] : false;
        }
      }
    };

    return {
      utils: utils,
      Ad: Ad,
      GPT_AdSlot: GPT_AdSlot,
      GPTConfig: GPTConfig,
      template: {},
      init: []
    };

  });

})(window, document, window.define);
