/**
 *  Collection of functions that construct GPT
 *  @author Mike Spencer (michael.spencer@washpost.com)
 */
(function(w, d, googletag){

  'use strict';

  googletag = googletag || {},
  googletag.cmd = googletag.cmd || [];


  function GPT(config){
    this.config = config;
    this.slot = this.defineSlot();
    this.kvs = this.getKeyvalues();
  }

  GPT.prototype = {

    //define the constructor
    constructor: GPT,

    // returns a gpt formatted ad slot
    defineSlot: function(){
      return googletag.defineSlot(this.config.where, this.config.sz, this.config.slug_str)
        .addService(googletag.pubads());
    },

    //returns a reference to the publisher service
    pubService: function(){
      return googletag.pubads();
    },

    //adds a keyvalue to the ad slot
    addKeyvalue: function(key, value){
      this.slot.setTargeting(key, value);
    },

    //display the ad spot on the page
    render: function(){
      googletag.display(this.config.slug_str);
    },

    //return an object of key/value pairs based on this.keyvalue_config functions
    getKeyvalues: function(){
      var kvs = {}, key;
      for(key in this.keyvalue_config){
        if(this.keyvalue_config.hasOwnProperty(key)){
          kvs[key] = this.keyvalue_config[key].call(this);
        }
      }
      return kvs;
    },

    keyvalue_config: {
      pos: function(){
        return [this.config.pos];
      }
    }
  };

  if(typeof w.define === 'function'){
    define(function(){
      return GPT;
    });
  }

  //test
  w.ad = new GPT({
    where: '/701/wpni.politics',
    pos: 'leaderboard',
    sz: [[728, 90]],
    slug_str: 'slug_leaderboard'
  });

})(window, document, window.googletag);