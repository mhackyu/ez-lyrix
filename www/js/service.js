app.service('SongService', function(localStorageService) {
    this.id = "";
    this.title = "";
    this.lyrics = "";

    // This will hold updated list of the song temporaryly;
    this.tempSongs = [];

    // this.songs =  [
    //     {
    //         id: 1,
    //         title: "Shape Of You",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 2,
    //         title: "Galway Girl",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 3,
    //         title: "How Would You Feel",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 4,
    //         title: "Perfect",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 5,
    //         title: "Give Me Love",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 6,
    //         title: "Thinking Out Loud",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 7,
    //         title: "Photograph",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 8,
    //         title: "Happier",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 9,
    //         title: "Castle On The Hill",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     },
    //     {
    //         id: 10,
    //         title: "Lego House",
    //         lyrics: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur illo, illum iure magni nisi nostrum? A alias aliquid commodi corporis cumque cupiditate delectus doloribus dolorum earum eos excepturi illo inventore ipsa odit, officia pariatur perspiciatis provident saepe similique tempore tenetur veniam voluptatem, voluptatum. Ab dolor excepturi nobis quas quibusdam."
    //     }
    // ];
    //
    // localStorageService.set("songList", this.songs);
    // localStorageService.remove("songList");


    this.setSong = function(id, title, lyrics) {
        this.id = id;
        this.title = title;
        this.lyrics = lyrics;
    };

    this.getSong = function() {
        return [{
            id: this.id,
            title: this.title,
            lyrics: this.lyrics
        }];
    };

    this.getGeneratedId = function() {
        return "EZ-" + (+new Date).toString();
    };

    this.save = function() {
        if (this.hasSongList()) {
            this.tempSongs = this.songList();
            this.tempSongs.push(this.getSong()[0]);
            localStorageService.set("songList", this.tempSongs);
        }
        else {
            this.pushNewSong();
        }
    };

    this.songList = function() {
        return localStorageService.get("songList");
    };

    this.hasSongList = function() {
        if (this.songList()) {
            return true;
        }

        return false;
    };

    this.pushNewSong = function() {
        localStorageService.set("songList", this.getSong());
    };

});
