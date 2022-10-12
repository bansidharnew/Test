$(document).ready(function() {
    console.log('I am jquery I am working');
    // onmouseover="this.play()" onmouseout="this.pause();this.currentTime=0;"
    $('#circle .vdo-container .playBtnHolder').mouseover(function(){
        $('#circle .vdo-container video').trigger('play');
        // console.log('Hover')
    });
    $('#circle .vdo-container .playBtnHolder').mouseout(function(){
        $('#circle .vdo-container video').trigger('pause');
        $('#circle .vdo-container video').get(0).currentTime = 0;
        // console.log('out')
    });

    var videoModal = document.getElementById('myVideoModal')
    videoModal.addEventListener('show.bs.modal', function (event) {
    // do something...
        console.log($('#circle .vdo-container video').find('Source:first').attr('src'));
        $('#myVideoModal .modal-body').find('Source:first').attr('src',$('#circle .vdo-container video').find('Source:first').attr('src'))
    });
    videoModal.addEventListener('shown.bs.modal', function (event) {
        // do something...
        $('#myVideoModal .modal-body video').attr('autoplay',true) ;
        let video = $("#myVideoModal .modal-body video").get(0);
        video.load();
        video.play();
    });
    videoModal.addEventListener('hide.bs.modal', function (event) {
        console.log('-----------');
        let video = $("#myVideoModal .modal-body video").get(0);
        $("#myVideoModal .modal-body video").trigger('pause');
        $("#myVideoModal .modal-body video").get(0).currentTime = 0;
        $('#myVideoModal .modal-body').find('Source:first').attr('src','');
    });
});