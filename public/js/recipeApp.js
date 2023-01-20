$(document).ready(() => {
  $('.nav-link').on('click', function() {
    sessionStorage.setItem('activeNavLink', $(this).attr('href'));
    $('.nav-link').removeClass('nav-link-active');
    $(this).addClass('nav-link-active');
  });
  
  //Check if session storage has activeNavLink
  if(sessionStorage.getItem('activeNavLink')){
    //Get link by href
    var $link = $('a[href="' + sessionStorage.getItem('activeNavLink') + '"]');
    //Add active class to link
    $link.addClass('nav-link-active');
  }

    $("#modal-button").click( ()=>{
        $(".modal-body").html('');
        $.get("/api/courses?format=json", (results={})=>{
            let data = results.data;
            if (!data || !data.courses) return;
            if (!data.loggedIn){
                $(".modal-body").append(
                    `
                    <div>
                    Please log in to register for a course.
                    </div>
                    `
                )
                return;
            }
            data.courses.forEach(course => {
                $(".modal-body").append(
                    `<div>
                    <span class="course-title">
                    ${course.name}
                    </span>
                    <button style="float: right" class="join-button btn btn-primary" data-id="${course._id}">
                    Join
                    </button>
                    <div class="course-description">
                    ${course.description}
                    </div>
                    <br/>
                    </div>`
                );
            });
        }).then( ()=>{
            addJoinButtonListener();
        }            
        );
        $('#myModal').modal('show');
    });


});

let addJoinButtonListener = () =>{
    $(".join-button").click((event) => {
        let $button = $(event.target),
        courseId = $button.data("id");
        $.get(`/api/courses/${courseId}/join`, (results = {}) => {
            let data = results.data;
            if (data && data.success) {
            $button
            .text("Joined")
            .addClass("joined-button")
            .removeClass("join-button");
            } else {
            $button.text("Try again");
            }  
        })
    })
}