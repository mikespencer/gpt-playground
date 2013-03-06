/**
 *  Collection of helper functions for wp adops
 *  @author: Mike Spencer michael.spencer@washpost.com
 */
(function(w, d){

  'use strict';

  var tools = {
    addPixel: function (url) {
      var i = d.createElement('img');
      i.src = url.replace(/\[timestamp\]|%n|\[random\]/gi, Math.floor(Math.random() * 1E9));
      i.width = '1';
      i.height = '1';
      i.alt = arguments[1] || '';
      i.style.display = 'none';
      i.style.border = '0';
      d.body.appendChild(i);
    },
    clone: function (obj) {
      if(!tools.isObject(obj)) {
        return obj;
      }
      var temp = new obj.constructor(),
        key;
      for(key in obj) {
        if(key !== '') {
          temp[key] = tools.clone(obj[key]);
        }
      }
      return temp;
    },
    extend: function(obj, additions, deep){
      deep = deep || false;
      for(var key in additions){
        if(!deep || (!tools.isObject(obj[key]) || !tools.isObject(additions[key]))){
          obj[key] = additions[key];
        } else{
          obj[key] = tools.extend(obj[key], additions[key], true);
        }
      }
      return obj;
    },
    getCookie: function (name) {
      var cookie = '' + d.cookie,
        search = '' + name + '=',
        str = null,
        offset = 0,
        end = 0;
      if(cookie.length > 0) {
        offset = cookie.indexOf(search);
        if(offset !== -1) {
          offset += search.length;
          end = cookie.indexOf(';', offset);
          if(end === -1) {
            end = cookie.length;
          }
          str = unescape(cookie.substring(offset, end));
        }
      }
      return(str);
    },
    getCSS: function (url) {
      var l = d.createElement('link');
      l.href = url;
      l.rel = 'stylesheet';
      l.type = 'text/css';
      d.getElementsByTagName('head')[0].appendChild(l);
    },
    getScript: function(src) {
      var s = d.createElement('script'),
        target = d.body || d.getElementsByTagName('head')[0] || false,
        callback = arguments[1] || false;
      if(target){
        s.type = 'text/' + (src.type || 'javascript');
        s.src = src.src || src;
        if(typeof callback === 'function'){
          s.onreadystatechange = s.onload = function() {
            var state = s.readyState;
            if (!callback.done && (!state || /loaded|complete/.test(state))) {
              callback.done = true;
              callback();
            }
          };
        }
        target.appendChild(s);
      }
    },
    iframeBuilder: function (atts) {
      var i = d.createElement('iframe'),
        key;

      atts = atts || {};

      //defaults
      i.frameBorder = "0";
      i.height = "0";
      i.width = "0";
      i.scrolling = "no";
      i.marginHeight = "0";
      i.marginWidth = "0";

      for(key in atts) {
        if(atts.hasOwnProperty(key)) {
          i[key] = atts[key];
        }
      }

      return i;
    },
    isObject: function(obj){
      return obj !== null && typeof obj === 'object';
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
    setCookie: function (name, val, expires, path, domain, secure) {
      d.cookie = name + "=" + escape(val) + (expires ? "; expires=" + expires : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
    },
    urlCheck: function (arg) {
      var loc = parent.window.location.href || d.referrer,
        obj = (arguments[1] && typeof arguments[1] === 'object') ? arguments[1] : null,
        regex = (obj !== null && obj.type === 'variable') ? new RegExp("[\\?&;]" + arg + "=([^&#?]*)") : new RegExp(arg),
        results = regex.exec(loc);
      return (results === null) ? null : results[results.length - 1];
    }
  };

  if(typeof w.define === 'function'){
    w.define(function(){
      return tools;
    });
  }

})(window, document);