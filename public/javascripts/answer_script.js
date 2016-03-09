$(document).ready( function () {
    $('#create_answer').on('click', function() {
        console.log('cliqueeei');
        var i = $('#answer input').size() + 1;
        var answer = "<input type='text' placeholder='resposta' name='answer' /></br>";
        $('#answer').append(answer);
    });
});
