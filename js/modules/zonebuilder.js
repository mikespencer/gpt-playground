/**
 *  Dynamically extends commercialNode
 *  @author: Mike Spencer michael.spencer@washpost.com
 */
(function(w, d, commercialNode){

  'use strict';

  commercialNode = commercialNode || 'national';

  var wp_meta_data = wp_meta_data || {},
  
  zoneBuilder = {
    contentType: {
      audiostory: 'audio',
      blogstory: 'blog',
      front: 'front',
      graphicstory: 'graphic',
      mediagallery: 'photo',
      panostory: 'pano',
      ugcphotostory: 'ugc',
      videostory: 'video'
    },
    zones: {
      contentType: function(){
        var a = zoneBuilder.getString(wp_meta_data.contentType);
        return a && commercialNode !== 'washingtonpost.com' && zoneBuilder.contentType[a.toLowerCase()] || '';
      },
      contentName: function(){
        return zoneBuilder.getString(wp_meta_data.contentName);
      },
      subsection: function(){
        return zoneBuilder.getString(wp_meta_data.subsection);
      }
    },
    getString: function(a){
      return a ? (typeof a === 'string' ? a : a[0]) : '';
    },
    validate: function(a){
      if(!a){return false;}
      a = a.replace(/\s/g, '').replace(/^\/*|\/*$/g, '').replace(/[^0-9a-zA-Z_\.\-\/]/g, '');
      return (/^[^a-z]/i.test(a) ? 'c' : '') + a;
    },
    exec: function(){
      var zones = zoneBuilder.zones,
        cn = [zoneBuilder.validate(commercialNode)],
        key, t;
      for(key in zones){
        if(zones.hasOwnProperty(key)){
          t = zoneBuilder.validate(zones[key]());
          if(t){
            cn.push(t);
          }
        }
      }
      zoneBuilder.executed = true;
      return cn.join('/').toLowerCase();
    }
  };

  if(typeof w.define === 'function'){
    w.define(function(){
      return zoneBuilder;
    });
  }

})(window, document, window.commercialNode);