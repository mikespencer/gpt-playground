if(typeof define === 'function'){
  define(function(){
    return {
      what: {
        leaderboard: function(){
          //sitewide leaderboard overrides
        }
      },
      where: {
        'washingtonpost.com': function(){
          //homepage overrides
        }
      }
    };
  });
}