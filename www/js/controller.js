app.controller('AppController', function() {

});

app.controller('SplitterController', function() {
    this.load = function (page) {
        mySplitter.content.load(page)
            .then(function () {
                mySplitter.left.close();
            });
    };

    this.loadView = function (url) {
        window.open(url, '_blank');
    };

});

app.controller('HomeCtrl', function() {
    this.pushPage = function(page, anim) {
        if (anim) {
            appNavigator.pushPage(page.id, { data: { title: page.title }, animation: anim });
        }
        else {
            appNavigator.pushPage(page.id);
        }
    };
});

/* FIND WORDS CONTROLLER */
app.controller('FindWordsCtrl', function($http, $scope) {
    this.selectedModifier = 'rhyme';
    this.description = "is me me em em em me mem em em em.";
    this.editSelects = function() {
        document.getElementById('choose-sel').removeAttribute('modifier');
        if (event.target.value == 'synonyms' || event.target.value == 'antonyms') {
            document.getElementById('choose-sel').setAttribute('modifier', event.target.value);
        }
        // alert(this.selectedModifier);
    };

    this.query = "";
    this.search = function() {
        document.getElementById("search-word").blur();
        loadingModal.show();
        this.results = [];
        return $http.get('https://api.datamuse.com/words', {
            params: {
                rel_rhy: this.query,
                max: 500
            }
        })
            .then(function (response){
                if (response.data.length === 0) {
                    ons.notification.alert({
                        message: "No results found!",
                        cancelable: true
                    });
                    document.getElementById('tab-find-words').removeAttribute('badge');
                    $scope.hasResults = false;
                }
                else {
                    $scope.results = response.data;
                    $scope.hasResults = true;
                    if ($scope.results.length > 399) {
                        document.getElementById('tab-find-words').setAttribute('badge', "400+");
                    }
                    else {
                        document.getElementById('tab-find-words').setAttribute('badge', $scope.results.length);
                    }
                }
                loadingModal.hide();
            }, function (error) {
                console.log(error);
                loadingModal.hide();
                ons.notification.alert({
                    message: "Server error: " + error.message,
                    cancelable: true
                });
            });
    };

    // $scope.copy = function(word) {
    //     console.log(word);
    //     ons.notification.toast({
    //         message: "Copied to clipboard",
    //         buttonLabel: "OK",
    //         timeout: 3000,
    //     });
    // };

    // this.delegate = {
    //     configureItemScope: function(index, itemScope) {
    //         // itemScope.item = 'Item ' + index;
    //         // itemScope.item = $scope.results;
    //     },
    //     countItems: function() {
    //         return 500;
    //     },
    //     calculateItemHeight: function() {
    //         return ons.platform.isAndroid() ? 48 : 44;
    //     }
    // };

});


app.controller('LyricsPadCtrl', function($scope) {

    this.title = "#Hugot";
    this.author = "Ches, Kim, and Mark";
    this.body = "I.\rSabi nila sa akin, ang love ay parang traffic \rMinsan nakakainip, madalas nakakabadtrip \r" +
        "Ang hanap ng damdamin, kapeng nakakahyper \r" +
        "Haluan mo ng tamis para hindi na bitter \r" +
        "Ang love ay MRT, o huwag mo nang pilitin \r" +
        "Handa ka bang masaktan, maipit ang sarili \r" +
        "Sabi nila sa akin, lahat daw ng bilihin \r" +
        "Pati ang gasolina ay nagmamahal na rin \r" +
        "[Refrain:] \r" +
        "Saan nga ba napulot, bakit ang lakas humugot \r" +
        "Hashtag (#) sa pag-ibig, ‘wag na ‘wag kang matatakot \r" +
        "[Chorus :] \rIba’t-iba man ang kahulugan \r" +
        "Iisa pa rin ang patutunguhan Buti na lang may pinaghuhugutan \r" +
        "Hashtag (#) hugot tayo, kaibigan \r";

    $scope.saveLyrics = function() {
        // document.querySelector('ons-toast').toggle();
      ons.notification.toast({
          message: "Saved",
          buttonLabel: "OK",
          timeout: 3000,
          animation: "fall"
      });
    };
});