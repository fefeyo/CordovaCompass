
// コンパスを監視している関数が入る
var watchID = null;

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        console.log("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log("onDeviceReady");
        // watchCompass();
        var options = {
            frequency: 1000
        };
        watchID = navigator.compass.watchHeading(
            app.onSuccess,
            app.onError,
            options
            );
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    onSuccess: function(heading){
        var d = heading.magneticHeading;
        var box = document.getElementById("test");
        if(d <= 45 && d >= 315){
            box.innerHTML = "北";
        }else if(d >= 45 && d <= 135){
            box.innerHTML = "東";
        }else if(d >= 135 && d <= 225){
            box.innerHTML = "南";
        }else if(d >= 225 && d <= 315){
            box.innerHTML = "西";
        }
    }
},
onError: function(compassError){
    s        document.getElementById("test").innerHTML = "だめです：" + compassError.code;
}
};

function watchCompass(){
    // navigator.compass.getCurrentHeading(
    //     app.onSuccess,
    //     app.onError
    //     );

var options = {
    frequency: 1000
};
watchID = navigator.compass.watchHeading(
    app.onSuccess,
    app.onError,
    options
    );
}

function stopCompass(){
    if(watchID){
        navigator.compass.clearWatch(watchID);
        watchID = null;
        document.getElementById("test").innerHTML = "計測中止";
    }
}


app.initialize();