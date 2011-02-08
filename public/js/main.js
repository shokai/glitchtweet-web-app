var result = '';
var g = new GlitchText();

$(function(){
    $('div#glitch').click(glitch);
    $('div#tweet').click(tweet);
    $('div#controls').css('visibility', 'hidden');
    $('textarea#source').click(function(e){
        $('textarea#source').val('').unbind();
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
    log('');
    var post_data = {message : result};
    $('div#tweet').unbind().addClass('button_disable').html('waiting twitter...');;
    $.post(app_root+'/tweet', post_data, function(res){
        console.log(res);
        if(res.error != null) log('tweet failed.');
        else log($('<p>').append($('<p>').html('success!')).append($('<p>').html($('<a>').attr('href','http://twitter.com/'+res.response.user.screen_name+'/status/'+res.response.id_str).html(res.response.user.screen_name+'/status/'+res.response.id_str))));
        $('div#tweet').click(tweet).removeClass('button_disable').html('tweet');
    }, 'json');
};

var log = function(msg){
    $('div#log').html($('<p>').html(msg));
};
