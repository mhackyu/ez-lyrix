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

app.controller('HomeCtrl', function($scope) {
    // Dummy data
    $scope.tempData = [
        {
            id: 1,
            title: "Shape Of You",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 2,
            title: "Galway Girl",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 3,
            title: "How Would You Feel",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 4,
            title: "Perfect",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 5,
            title: "Give Me Love",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 6,
            title: "Thinking Out Loud",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 7,
            title: "Photograph",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 8,
            title: "Happier",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 9,
            title: "Castle On The Hill",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        },
        {
            id: 10,
            title: "Lego House",
            lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
        }
    ];

    this.showLyrics = function(data) {
        console.log(data.title);
    };


    this.delete = function($event, data) {
        $event.stopPropagation();
        ons.notification.confirm({
            message: "Are you sure you want to delete '" + data.title + "' ?",
            callback: function(isOk) {
                if (isOk) {
                    console.log(data.title + " is deleted.");

                }
            }
        });
    };

    // function add(data) {
    //     $scope.tempData.push(data);
    // }

    this.pushPage = function(page, anim) {
        // console.log(page.isNew);
        if (anim) {
            appNavigator.pushPage(page.id, { data: { data: page.data, isNew: page.isNew }, animation: anim });
        }
        else {
            appNavigator.pushPage(page.id, { data: { data: page.data, isNew: page.isNew }});
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

});


app.controller('LyricsPadCtrl', function($scope) {

    var page = appNavigator.topPage.data;

    if (page.isNew) {
        console.log("isNEw");
        this.title = "Untitled";
        this.body = "";
    }
    else {
        this.title = page.data.title;
        this.body = page.data.lyrics;
    }

    // this.title = "#Hugot";
    // this.author = "Ches, Kim, and Mark";
    // this.body = "I.\rSabi nila sa akin, ang love ay parang traffic \rMinsan nakakainip, madalas nakakabadtrip \r" +
    //     "Ang hanap ng damdamin, kapeng nakakahyper \r" +
    //     "Haluan mo ng tamis para hindi na bitter \r" +
    //     "Ang love ay MRT, o huwag mo nang pilitin \r" +
    //     "Handa ka bang masaktan, maipit ang sarili \r" +
    //     "Sabi nila sa akin, lahat daw ng bilihin \r" +
    //     "Pati ang gasolina ay nagmamahal na rin \r" +
    //     "[Refrain:] \r" +
    //     "Saan nga ba napulot, bakit ang lakas humugot \r" +
    //     "Hashtag (#) sa pag-ibig, ‘wag na ‘wag kang matatakot \r" +
    //     "[Chorus :] \rIba’t-iba man ang kahulugan \r" +
    //     "Iisa pa rin ang patutunguhan Buti na lang may pinaghuhugutan \r" +
    //     "Hashtag (#) hugot tayo, kaibigan \r";

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
