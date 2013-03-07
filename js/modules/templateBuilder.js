/**
 *  Checks and builds an ad template of open spots on the current page
 */
(function(w, d, define){

  'use strict';

  /**
   *  Checks and returns an object of open spots and relevant properties (hardcodes, etc).
   *  @arg: json flight template (wp_config style)
   */
  function TemplateBuilder(config){
    this.flights = config;
    this.template = this.exec();
  }

  TemplateBuilder.prototype = {
    constructor: TemplateBuilder,
    exec: function(){
      //this won't work.. but when it does, lets break it up into multiple smaller functions
      var rv = false, finalTemplate = {}, key, check, template, result;
      for(key in this.flights){
        if(this.flights.hasOwnProperty(key)){
          template = this.flights[key];
          template.id = key;
          for(check in this.checks){
            if(checks.hasOwnProperty(check) && template.hasOwnProperty(check)){
              result = this.checks[check](template);
              if(!result){
                break;
              }
            }
          }
        }
      }
    },
    checks: {
      where: function(template){
        return true;
      },
      what: function(template){
        return true;
      },
      when: function(template){
        return true;
      },
      hardcode: function(template){
        return false;
      },
      test: function(template){
        return true;
      },
      local: function(template){
        return true;
      }
    }
  };

  if(typeof define === 'function'){
    define('templateBuilder', function(){
      return TemplateBuilder;
    });
  }

})(window, document, window.define);