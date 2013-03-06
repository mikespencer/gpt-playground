define('wp', ['generic', 'wp.config'], function(wpAd, config){

  /**
    * Add ad specific, site specific keyvalues here:
    */
  wpAd.tools.extend(wpAd.Ad.prototype.keyvalues_config, {
    article: function(){
      return ['wp_article'];
    }
  });

  /**
    * Add global, site specific keyvalues here:
    */
  wpAd.tools.extend(wpAd.GPTConfig.prototype.keyvalues_config, {
    WPATC: function(){
      return ['wpatc_cookie'];
    },
    front: function(){
      return ['true'];
    }
  });

  //commercialNode base:
  wpAd.where = '/701/wpni.' + commercialNode;

  //pass in config:
  wpAd.config = config;

  //testing
  wpAd.init.push(function(){
    try{console.log('loaded and initialising');}catch(e){}
  });

  return wpAd;
});