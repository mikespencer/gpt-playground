var googletag = googletag || {},
    placeAd2Queue,
    placeAd2;
googletag.cmd = googletag.cmd || [];

(function(w, d){

  'use strict';

      //javascript url base
  var jsBase = 'js/',

      //site specific script mapping
      siteMapping = {
        wp: 'wp.js',
        slate: 'slate.js',
        theroot: 'root.js'
      },

      //generic/required scripts
      scripts = [
        'http://www.googletagservices.com/tag/js/gpt.js',
        'js/generic.js'
      ],

      site = getSite();

  //initialisation
  function init(){
    var s = site && siteMapping[site] ? site : siteFallback();
    //scripts.push(jsBase + siteMapping[s]);
  }

  //add necessary scripts
  function exec(){
    var l = scripts.length, i = 0;
    for(i;i<l;i++){
      getScript(scripts[i]);
    }
  }

  function getScript(url){
    var s = d.createElement('script'),
        target = d.getElementsByTagName('head')[0] || d.body;
    s.src = url;
    s.async = true;
    target.appendChild(s);
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

  function siteFallback(){
    var map = {
          'washingtonpost': 'wp',
          'digitalink': 'wp',
          'slate': 'slate',
          'theroot': 'root'
        },
        dom = d.domain,
        key, regex;

    for(key in map){
      if(map.hasOwnProperty(key)){
        regex = new RegExp(key, 'i');
        if(regex.test(dom)){
          return key;
        }
      }
    }

    return 'wp';
  }

  //store placeAd2 calls if 'real' placeAd2 isn't defined yet
  placeAd2Queue = [];

  //placeholder until placeAd2 is defined
  placeAd2 = function(){
    placeAd2Queue.push(arguments);
  };

  init();
  exec();

})(window, document);