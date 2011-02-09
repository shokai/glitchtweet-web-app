var result = '';
var g = new GlitchText();
var no_glitch = /(https?\:[\w\.\~\-\/\?\&\+\=\:\@\%\;\#\%]+|[#@][A-Za-z0-9_]+)/;
var source_default = '';

$(function(){
    source_default = $('textarea#source').val();
    if(source = $.cookie('source')){
        $('textarea#source').val($.cookie('source'));
        $.cookie('source', null);
    }
    else{
        $('textarea#source').click(function(e){
            $('textarea#source').val('').unbind();
        });
    }
    $('div#glitch').click(glitch);
    if(auth) $('div#tweet').click(tweet);
    else{
        $('div#tweet').html('login twitter').click(login_twitter);
        $('div#login').click(login_twitter);
    }
    $('div#controls').css('visibility', 'hidden');
    $('a#info').click(function(){
        var detail = $('div#detail');
        if(detail.css('visibility') == 'hidden') detail.css('visibility', 'visible');
        else detail.css('visibility', 'hidden');
    });
});


var glitch = function(){
    var source = $('textarea#source').val();
    if(source.length < 1) return;
    result = source;
    result = result.split(no_glitch).map(function(s){
        if(s.match(no_glitch)) return s;
        while(true){
            s = g.random(s);
            if(Math.random() > 0.6) break;
        };
        return s;
    }).join(' ');
    if(result.length > 140) result = result.slice(0,140);
    $('div#result').html($('<p>').html(result.htmlEscape()));
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
        else{
            log($('<p>').append($('<p>').html('success!')).append($('<p>').html($('<a>').attr('href','http://twitter.com/'+res.response.user.screen_name+'/status/'+res.response.id_str).html(res.response.user.screen_name+'/status/'+res.response.id_str))));
            $('textarea#source').val('');
        }
        $('div#tweet').click(tweet).removeClass('button_disable').html('tweet');
    }, 'json');
};

var login_twitter = function(){
    var s = $('textarea#source').val();
    if(s != source_default) $.cookie('source', s);
    location.href = app_root+'/login';
};

var log = function(msg){
    $('div#log').html($('<p>').html(msg));
};
