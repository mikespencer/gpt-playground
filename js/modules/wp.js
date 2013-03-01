define(['generic', 'wp_config'], function(wpAd, config){

  /**
    * Add ad specific, site specific keyvalues here:
    */
  wpAd.tools.extend(wpAd.Ad.prototype.keyvalue_fns, {
    article: function(){
      return ['wp_article'];
    }
  });

  /**
    * Add global, site specific keyvalues here:
    */
  wpAd.tools.extend(wpAd.GPT.prototype.keyvalue_fns, {
    WPATC: function(){
      return ['wpatc_cookie'];
    },
    front: function(){
      return ['true'];
    }
  });

  //commercialNode base:
  wpAd.cNodeBase = '/701/wpni.';

  //pass in config:
  wpAd.config = config;

  //testing
  wpAd.init.push(function(){
    try{console.log('loaded and initialising');}catch(e){}
  });

  return wpAd;
});