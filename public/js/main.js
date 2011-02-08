var result = '';
var g = new GlitchText();

$(function(){
    $('div#glitch').click(glitch);
    $('div#controls').click(tweet).css('visibility', 'hidden');
    $('textarea#source').live('click', function(e){
        $('textarea#source').val('').die('click');
    });
});


var glitch = function(){
    var source = $('textarea#source').val();
    if(source.length < 1) return;
    result = source;
    while(true){
        result = g.random(result);
        if(Math.random() > 0.6) break;
    };
    if(result.length > 140) result = result.slice(0,140);
    $('div#result').html($('<p>').html(result));
    $('div#count').html($('<p>').html('['+result.length+']'));
    $('div#controls').css('visibility','visible');
};

var tweet = function(){
    var post_data = {message : result};
    $.post(app_root+'/tweet', post_data, function(res){
        console.log(res);
    }, 'json');
};
