$(document).ready(() => {
    $("#modal-button").click( ()=>{
        $(".modal-body").html('');
        $.get("/course?format=json", (data)=>{
            data.forEach(course => {
                $(".modal-body").append(
                    `<div>
                    <span class="course-title">
                    ${course.name}
                    </span>
                    <div class="course-description">
                    ${course.price}
                    </div>
                    </div>`
                );
            });
        });
        $('#myModal').modal('show'); 
    });
});