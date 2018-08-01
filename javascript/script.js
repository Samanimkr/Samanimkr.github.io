// var repos_shown = 3, i=0, updated_at, repocard;
var currentPage = "home";
function navigateTo(page){
  if (page == "contact" && currentPage != "contact") {

    var contentClass = "." + currentPage + "_content";
    $(contentClass).animate({left: "100%",opacity: 0.3}, 500);
    $(".contact_content").animate({left: "0", opacity: 1}, 500);

    $(".nav span:nth-of-type(2)").removeClass("nav_selected");
    $(".nav span:nth-of-type(3)").removeClass("nav_selected");
    $(".nav span:nth-of-type(1)").addClass("nav_selected");

    currentPage = "contact";
  } else if (page == "home" && currentPage != "home") {

    $(".nav span:nth-of-type(1)").removeClass("nav_selected");
    $(".nav span:nth-of-type(3)").removeClass("nav_selected");
    $(".nav span:nth-of-type(2)").addClass("nav_selected");

    currentPage = "home";
  } else if (page == "portfolio" && currentPage != "portfolio") {

    var contentClass = "." + currentPage + "_content";
    $(contentClass).animate({left: "-100%",opacity: 0.3}, 500);
    $(".portfolio_content").animate({left: "0", opacity: 1}, 500);

    $('.right').hide();
    $('.left p').replaceWith('<p><i class="fas fa-angle-double-left fa-3x"></i> Home</p>');
    console.log($('.left').attr("onclick"));

    $(".nav span:nth-of-type(1)").removeClass("nav_selected");
    $(".nav span:nth-of-type(2)").removeClass("nav_selected");
    $(".nav span:nth-of-type(3)").addClass("nav_selected");

    currentPage = "portfolio";
  }
}

// $(document).ready(function() {
//
  // $.ajax({
  //   url:'https://api.github.com/users/samanimkr/repos',
  //   data:{
  //     /*
  //     client_id: '',
  //     client_secret: ''
  //     */
  //     sort: 'updated',
  //     direction: 'desc',
  //     cache: 'false'
  //   },
  //   error: function (request, status, error) {
  //     console.log("error: could not retrieve github data");
  //   }
  // }).done(function(repos){
  //   //stop the progress bar
  //   $('.progress').hide();
  //
  //   $.each(repos, function(index, repo){
  //     updated_at = (repo.updated_at).substring(0,10);
  //     repocard = '<div class="col s12 m4" id="repo'+i+'">' +
  //       '<div class="card white darken-1">' +
  //         '<div class="card-content">'+
  //           '<span class="card-title teal-text text-accent-4">'+repo.name+'</span>'+
  //           '<div class="teal-text text-lighten-3">'+
  //             '<p>Description: <strong>'+repo.description+'</strong></p>'+
  //             '<p>Language: <strong>'+repo.language+'</strong></p>'+
  //             '<p>Last Modified: <strong>'+updated_at+'</strong></p>'+
  //           '</div>'+
  //         '</div>'+
  //         '<div class="card-action">'+
  //           '<a class="teal-text text-accent-3 center" href="'+repo.html_url+'">GitHub Page</a>'+
  //         '</div>'+
  //       '</div>'+
  //     '</div>';
  //
  //     $('#git-cards').append(repocard);
  //     if(i>=3){
  //       $(('#repo'+i)).hide();
  //     }
  //     i++;
  //   });
  // });

  // $('#load-more').click(function() {
  //   for(x=repos_shown; x<repos_shown+6; x++){
  //     $(('#repo'+x)).show(100);
  //   }
  //   repos_shown += 6;
  //   if(repos_shown>=i){
  //     $('#load-more').addClass("disabled");
  //   }
  // });

// });
