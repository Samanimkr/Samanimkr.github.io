$(document).ready(function() {

    $('#projectTab').hide(function(){});

    $('#arduino_btn, #profile_btn').hover(function() {
        $(this).toggleClass('darken-1');
        $(this).toggleClass('lighten-1');
    });

    $('#github_btn').hover(function() {
        $(this).toggleClass('lighten-1');
    });

  /*  $('#github_btn').click(function(){
        $('#profileTab').hide(function(){});
        $('#projectTab').show(function(){});
    });
    $('#profile_btn').click(function(){
      $('#projectTab').hide(function(){});
      $('#profileTab').show(function(){});
    });
*/
});
