(function(w, d){

  'use strict';

  var siteMapping = {
        wp: 'wp',
        slate: 'slate',
        theroot: 'root'
      },

      dev_config = {
        baseUrl: 'js/modules'
      },
      prod_config = {
        baseUrl: 'http://js.washingtonpost.com/wp-srv/ad/amd/modules',
        paths: {
          'gpt': 'http://www.googletagservices.com/tag/js/gpt',
          'jquery': 'http://js.washingtonpost.com/wpost/js/combo/?token=20121010232000&c=true&m=true&context=eidos&r=/jquery-1.7.1.js'
        },
        shim: {
          'gpt': {
            exports: 'googletag'
          }
        }
      },

      sra = false,
      async = true,

      site = siteMapping[getSite()] || 'wp',
      script = [site],

      gpt = d.createElement('script'),
      target = d.getElementsByTagName('head')[0] || d.body;

  //load gpt:
  gpt.src = 'http://www.googletagservices.com/tag/js/gpt.js';
  gpt.async = true;
  target.appendChild(gpt);

  //configure requirejs;
  requirejs.config(dev_config);

  //load dependencies:
  requirejs(script, callback);

  function callback(wpAd){
    googletag.cmd.push(function(){


      if(wpAd.init && typeof wpAd.init === 'object'){
        var len = wpAd.init.length,
            i = 0;
        for(i;i<len;i++){
          if(typeof wpAd.init[i] === 'function'){
            wpAd.init[i]();
          }
        }
      }

      wpAd.gpt_config = new wpAd.GPTConfig({
        googletag: w.googletag,
        sra: false
      });

      placeAd2 = function(where, what, del, otf){
        var pos = what,
            posOverride = false,
            posArray;
        if(/\|/.test(what)){
          posArray = what.split(/\|/);
          what = posArray[0];
          posOverride = posArray[1];
          pos = posArray.join('_');
        }
        if(wpAd.config.adTypes[what] && !wpAd.template[pos]){
          wpAd.template[pos] = new wpAd.Ad({
            where: wpAd.where,
            sz: wpAd.config.adTypes[what].sz,
            what: what,
            pos: pos,
            posOverride: posOverride
          });
          wpAd.template[pos].slot.render();
        } else{
          wpAd.template[pos].slot.refresh();
        }
        try{
          console.log(pos, wpAd.template[what]);
        }catch(e){}
      };

      callPlaceAd2Queue(window.placeAd2Queue);

    });
  }

  function callPlaceAd2Queue(queue){
    if(queue){
      var l = queue.length,
          i = 0;
      for(i;i<l;i++){
        placeAd2.apply(window, queue[i]);
      }
    }
  }

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