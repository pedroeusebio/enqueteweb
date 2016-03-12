$(document).ready( function () {
    $('#create_answer').on('click', function() {
        console.log('cliqueeei');
        var i = $('#answer input').size() + 1;
        var answer = "<div class='answer'><input class='form-control' type='text' placeholder='resposta' name='answer' /></div>";
        $('#answer').append(answer);
    });
    $('#remove_answer').on('click', function() {
        $('#answer').find('input:last').remove();
    });
    $('#datepicker').datepicker();
});
