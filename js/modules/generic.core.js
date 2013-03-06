/* global commercialNode */

//define wpAd object:
var wpAd = (function(w, d, undefined){

  'use strict';

  /**
   * wpAd Ad object. Builds an individual ad
   */
  function Ad(config){
    this.config = wpAd.tools.extend({
      'where': undefined,
      'slug': null,
      'delivery': false,
      'sz': null,
      'what': null,
      'pos': false,
      'posOverride': false
    }, config, true);

    this.getSlug();

    this.keyvalues = wpAd.tools.keyvalueIterator(this.keyvalues_config, this);
    this.slot = new GPT_AdSlot(this);
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
    this.adslot = googletag.defineSlot(this.config.where, this.config.sz, this.config.slug_str).addService(googletag.pubads());
    this.addKeyvalue(this.config.keyvalues);
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

    this.keyvalues = wpAd.tools.keyvalueIterator(this.keyvalues_config, this);
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
      }
    }
  };


  /**
   * Helper functions for core functionality (extend in generic.full)
   */
  var tools = {
    urlCheck: function (arg) {
      var loc = parent.window.location.href || d.referrer,
        obj = (arguments[1] && typeof arguments[1] === 'object') ? arguments[1] : null,
        regex = (obj !== null && obj.type === 'variable') ? new RegExp("[\\?&;]" + arg + "=([^&#?]*)") : new RegExp(arg),
        results = regex.exec(loc);
      return (results === null) ? null : results[results.length - 1];
    },
    extend: function(obj, additions, deep){
      deep = deep || false;
      for(var key in additions){
        if(!deep || (!wpAd.tools.isObject(obj[key]) || !wpAd.tools.isObject(additions[key]))){
          obj[key] = additions[key];
        } else{
          obj[key] = tools.extend(obj[key], additions[key], true);
        }
      }
      return obj;
    },
    keyvalueIterator: function(obj, context){
      context = context || this;
      var rv = {}, key, val;
      for(key in obj){
        if(obj.hasOwnProperty(key)){
          val = obj[key].call(context);
          val = typeof val === 'object' ? val : [val];
          rv[key] = val;
        }
      }
      return rv;
    },
    isObject: function(obj){
      return obj !== null && typeof obj === 'object';
    }
  };

  return {
    cNodeBase: 'defined in site script',
    init: [],
    tools: tools,
    Ad: Ad,
    GPTConfig: GPTConfig,
    template: {}
  };

})(window, document);

if(typeof define === 'function'){
  define(function(){
    return wpAd;
  });
}