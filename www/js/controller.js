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

app.controller('HomeCtrl', function($scope, SongService) {

    $scope.songs = SongService.songList();

    // console.log($scope.songs);

    this.delete = function($event, data) {
        $event.stopPropagation();
        ons.notification.confirm({
            message: "Are you sure you want to delete '" + data.title + "' ?",
            callback: function(isOk) {
                if (isOk) {
                    console.log(SongService.songList());
                    // SongService.remove(data.id);
                    // console.log(SongService.songList());
                    // $scope.updateList();
                    // $scope.songs = SongService.songList();
                }
            }
        });
    };

    this.pushPage = function(page, anim) {
        // if (anim) {
        appNavigator.pushPage(page.id, { data: { data: page.data, isNew: page.isNew }, animation: anim });
        // }
        // else {
        //     appNavigator.pushPage(page.id, { data: { data: page.data, isNew: page.isNew }});
        // }
    };

    $scope.updateList = function() {
        $scope.songs = SongService.songList();
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
                loadingModal.hide();
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

app.controller('LyricsPadCtrl', function($scope, SongService) {


    $scope.isRemindedToSave = false;
    var page = appNavigator.topPage.data;
    var id = SongService.getGeneratedId();
    document.getElementById("btnSave").disabled = true;
    SongService.toUpdate = false;

    if (page.isNew) {
        $scope.title = "";
        $scope.body = "";
    }
    else {
        $scope.id = page.data.id;
        $scope.title = page.data.title;
        $scope.body = page.data.lyrics;
        SongService.currentSongId = $scope.id;
    }

    $scope.remindToSave = function() {
        // console.log($scope.id);
        if ($scope.body.length > 30 && !$scope.isRemindedToSave) {
            ons.notification.toast({
                message: "Don't forget to save",
                buttonLabel: "OK",
                animation: "fall"
            });
            $scope.isRemindedToSave = true;
        }

        $scope.enableAndDisableSave();
        $scope.saveAndUpdateSong();


    };

    $scope.titleOnChange = function() {
        $scope.enableAndDisableSave();
        $scope.saveAndUpdateSong();
        // SongService.updateSong(id);
    };

    $scope.enableAndDisableSave = function() {
        if ($scope.title.length === 0 || $scope.body.length === 0) {
            document.getElementById("btnSave").disabled = true;
        }
        else {
            document.getElementById("btnSave").disabled = false;
        }
    };

    $scope.saveAndUpdateSong = function() {
        if (page.isNew) {
            SongService.setSong(id, this.title, this.body);
        }
        else {
            SongService.titleUpdate = this.title;
            SongService.lyricsUpdate = this.body;
            SongService.toUpdate = true;
        }
    };

});

app.controller('LyricsCtrl', function($scope, SongService) {
    $scope.saveLyrics = function() {
        if (SongService.toUpdate) {
            SongService.update();
        }
        else {
            SongService.save();
        }

        ons.notification.toast({
            message: "Saved",
            buttonLabel: "OK",
            timeout: 3000,
            animation: "fall"
        });
    };
});

