$(document).ready(() => {
    $("#modal-button").click( ()=>{
        $(".modal-body").html('');
        $.get("/api/courses?format=json", (results={})=>{
            let data = results.data;
            if (!data || !data.courses) return;
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