// iphone-shake-event.js
// (c) 2011 Sho Hashimoto <hashimoto@shokai.org>
// https://github.com/shokai/js-iphone-shake-event

var iPhoneShake = function(){
    
    this.onShake = function(func, params){
        (function(){
            var last_shake = 0;
            var threshold = 18;
            if(params && params.threshold > 0) threshold = params.threshold;
            var interval = 2;
            if(params && params.interval > 0) interval = params.interval;
            
            var acc = new Object();
            window.addEventListener('devicemotion', function(e){
                acc.x = e.accelerationIncludingGravity.x;
                acc.y = e.accelerationIncludingGravity.y;
                acc.z = e.accelerationIncludingGravity.z;
            });
            
            var running_function = false;
            setInterval(function(){
                if(!running_function){
                    if(Math.abs(acc.x) > threshold ||
                       Math.abs(acc.y) > threshold ||
                       Math.abs(acc.z) > threshold){
                        now = (new Date())/1000;
                        if(last_shake + interval < now){
                            last_shake = now;
                            running_function = true;
                            func(acc);
                            running_function = false;
                        };
                    };
                };
            }, 100);
        })();
    };
};
