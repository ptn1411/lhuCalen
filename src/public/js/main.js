$(document).ready(function () {
    let room;
    $("#submit").click(function () {
        room = $("#room").val();
        $.post("http://localhost:8080/room", {room: room}, function (data) {
            if (data === 'yes') {
                console.log('yes');
            }
        });
    });
    let lop;
    let tongsv;
    let ngaydiemdanh;
    let svdihoc;

    $("#guidiemdanh").click(function () {
        lop = $("#lop").val();
        tongsv = $("#tongsv").val();
        ngaydiemdanh = $("#ngaydiemdanh").val();
        svdihoc = $("#svdihoc").val();
        $.post("http://localhost:8080/postdd", {
            lop: lop,
            tongsv: tongsv,
            ngaydiemdanh: ngaydiemdanh,
            svdihoc: svdihoc
        }, function (data) {
            if (data === 'yes') {
                console.log('yes');
            }
        });
    });
    $('video').prop('muted', true).play();
});
