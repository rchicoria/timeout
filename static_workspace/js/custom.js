function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// SWIPE
$(function() {
  $(".news-container__entrie").swipe({
    swipeStatus:function(event, phase, direction, distance) {
      var str = phase;
      str += distance;

      if(phase=="start") {
        $(".news-container__entrie").addClass("moving");
      }

      if(phase=="move" && direction=="left") {
        $(".news-container__entrie").css("margin-left", "-"+distance+"px");

        if (distance>100)
          window.location.href = "#next-entrie";
      }

      if(phase=="move" && direction=="right") {
        $(".news-container__entrie").css("margin-left", distance+"px");

        if (distance>100)
          window.location.href = "#previous-entrie";
      }

      if(phase=="end") {
        $(".news-container__entrie").removeClass("moving");
        $(".news-container__entrie").css("margin-left", "0");
      }

      if(phase=="cancel") {
        $(".news-container__entrie").removeClass("moving");
        $(".news-container__entrie").css("margin-left", "0");
      }

      // $(".news-container__entrie").html(str);
    }
  });
});
