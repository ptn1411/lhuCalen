$(document).ready(function () {
    let room;
    $("#submit").click(function () {
        room = $("#room").val();
        $.post("http://localhost:8080/scan", {room: room}, function (data) {
            if (data === 'yes') {
                console.log('yes');
            }
        });
    });
});