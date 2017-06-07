var repos_shown = 3, i=0, updated_at, last_update;
$(document).ready(function() {

  $.ajax({
    url:'https://api.github.com/users/samanimkr/repos',
    data:{
      /*
      client_id: '',
      client_secret: ''
      */
      sort: 'updated',
      direction: 'desc'
    }
  }).done(function(repos){
    $.each(repos, function(index, repo){
      $.ajax({
        url:'https://api.github.com/repos/Samanimkr/'+ repo.name+'/commits',
        data:{
          /*
          client_id: '',
          client_secret: ''
          */
          sort: 'updated',
          direction: 'desc'
        }
      }).done(function(commit){
        last_update = commit[0].commit.message;
        updated_at = (repo.updated_at).substring(0,10);
        $('#github-repos').append(`
          <div class="col s12 m4" id="repo${i}">
            <div class="card white darken-1">
              <div class="card-content">
                <span class="card-title teal-text text-accent-4">${repo.name}</span>
                <div class="teal-text text-lighten-4">
                  <p>Description: ${repo.description}</p>
                  <p>Language: ${repo.language}</p>
                  <p>Last Update: ${last_update}</p>
                  <p>Last Modified: ${updated_at}</p>
                </div>
              </div>
              <div class="card-action">
                <a class="teal-text text-accent-3" href="#">Check it out!</a>
              </div>
            </div>
          </div>
        `);
        if(i>=3){
          $(('#repo'+i)).css("display", "none");
        }
        i++;
      });
    });
  });

  $('#load-more').click(function() {
      for(x=repos_shown; x<repos_shown+6; x++){
        $(('#repo'+x)).show(100);
      }
      repos_shown += 6;
      if(repos_shown>=i){
        $('#load-more').addClass("disabled");
      }

    });

});
