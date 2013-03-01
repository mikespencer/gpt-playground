(function(w, d){

  'use strict';

  var siteMapping = {
        wp: 'wp',
        slate: 'slate',
        theroot: 'root'
      },
      site = siteMapping[getSite()] || 'wp',
      script = [site, 'gpt'];

  //configure requirejs;
  requirejs.config({
    baseUrl: 'js/modules',
    paths: {
      'gpt': 'http://www.googletagservices.com/tag/js/gpt',
      'jquery': 'http://js.washingtonpost.com/wpost/js/combo/?token=20121010232000&c=true&m=true&context=eidos&r=/jquery-1.7.1.js'
    },
    shim: {
      'gpt': {
        exports: 'googletag'
      }
    }
  });

  //load dependencies:
  requirejs(script, function(wpAd, gpt){
    googletag.cmd.push(function(){
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();

      placeAd2 = function(where, what, del, otf){
        wpAd.template[what] = new wpAd.Ad({
          sz: wpAd.config[what].sz,
          what: what
        });
        if(wpAd.template[what]){
          wpAd.template[what].render();
        }
        console.log(what,wpAd.template[what]);
      };

      if(window.placeAd2Queue){
        var l = placeAd2Queue.length, i = 0;
        for(i;i<l;i++){
          placeAd2.apply(window, placeAd2Queue[i]);
        }
      }
    });
  });

  function getSite(){
    var adScript = d.getElementById('adScript'),
        scripts =  adScript ? [adScript] : d.getElementsByTagName('script'),
        l = scripts.length,
        attr;
    while(l--){
      attr = scripts[l].getAttribute('data-adops-site');
      if(attr){
        return attr;
      }
    }
    return false;
  }

})(window, document);