
// コンパスを監視している関数が入る
var watchID = null;

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        watchCompass();
        app.receivedEvent('deviceready');
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
        document.getElementById("test").innerHTML = "現在の方位:" + heading.magnetHeading;
    },
    onError: function(compassError){
        document.getElementById("test").innerHTML = "コンパスのエラーが発生しました" + compassError.code;
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