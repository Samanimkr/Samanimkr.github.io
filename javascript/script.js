$(document).ready(function() {

    $('#projectTab').hide(function(){});

    $('.links').hover(function() {
        $(this).toggleClass('lighten-2');
        $(this).toggleClass('lighten-1');
    });

    $('#github_btn').click(function(){
        $('#profileTab').hide(function(){});
        $('#projectTab').show(function(){});
    });
    $('#profile_btn').click(function(){
      $('#projectTab').hide(function(){});
      $('#profileTab').show(function(){});
    });

});
