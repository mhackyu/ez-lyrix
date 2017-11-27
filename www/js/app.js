var app = angular.module('my-app', ['onsen','LocalStorageModule']);

app.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ezLyrix');
});

ons.ready(function() {
    console.log("Onsen UI is ready!");
    // ons.notification.toast({
    //     message: "Hello!",
    //     buttonLabel: "OK",
    //     timeout: 5000,
    // });
});
