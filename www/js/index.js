
var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        buildCompass();
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

function buildCompass(){
    // navigator.compass.getCurrentHeading(
    //     app.onSuccess,
    //     app.onError
    //     );
var options = {
    frequency: 1000
};
navigator.compass.watchHeading(
    app.onSuccess,
    app.onError,
    options
    );
}


app.initialize();