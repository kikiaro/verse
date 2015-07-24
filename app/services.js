/* Logging In */

angular.module("app.ui.services", []).factory("loggit", [
    function() {
        var logIt;
        return toastr.options = {
            closeButton: !0,
            positionClass: "toast-top-right",
            timeOut: "3000"
        }, logIt = function(message, type) {
            return toastr[type](message);
        }, {
            log: function(message) {
                logIt(message, "info");
            },
            logWarning: function(message) {
                logIt(message, "warning");
            },
            logSuccess: function(message) {
                logIt(message, "success");
            },
            logError: function(message) {
                logIt(message, "error");
            }
        };
    }
]).factory("ArtistListingSrv",
  function($http) {

/* Artists list with image URL and name from the server */

    var ArtistListingObj = {},
      artists = [];

/* Data from the .json files (Replace with DB / Server) */

    ArtistListingObj.getArtists = function(callback){

      $http.get('dist/data/artists.json').success(function(data) {

        artists = data;

        ArtistListingObj.artists = artists;
        callback(data);
      });
    };

    return ArtistListingObj;

  }).factory("AlbumsListingSrv",
  function($http) {

/* Albums list with image url and name from the server */

    var AlbumListingObj = {},
      albums = [];

/* Data from the .json files (Replace with DB / server) */

    AlbumListingObj.getAlbums = function(callback){

      $http.get('dist/data/albums.json').success(function(data) {
        albums = data;

        AlbumListingObj.albums = albums;
        callback(data);
      });
    };
    return AlbumListingObj;

  })
  .factory("GenresListingSrv",
  function($http) {

/* Genres */

    var GenresListingObj = {},
      genres = [];

/* Data from the .json files (Replace with DB / Server) */

    GenresListingObj.getGenres = function(callback){

      $http.get('dist/data/genres.json').success(function(data) {

        genres = data;

        GenresListingObj.genres = genres;
        callback(data);
      });
    };

    return GenresListingObj;


  }).factory("ArtistSrv",
  function($http) {

/* Songs */

    var PlayListObj = {},
      artists = [];

/* Data from the .json files (Replace with DB / Server) */

    PlayListObj.getSongs = function(callback){
      $http.get('dist/data/artistsMusic.json').success(function(data) {

        artists = data;

        PlayListObj.artists = artists;
        callback(data);
      });
    };

    PlayListObj.getArtist = function(title,callback) {

      PlayListObj.getSongs(function(data){

        _.map(PlayListObj.artists, function(artistSongs){

          if(artistSongs.url_name == title){
            return callback(artistSongs);
          }
        });
      });
    };

    return PlayListObj;

  })
  .factory("PlayListSrv",
  function() {

/* Save and Load Playlists from Local Storage */

    var PlayListObj = {},
      playlists = {
        list: []
      };

    var storage_id = "playlists_local_list";

/* Same values for demonstrating playlist feature */
    playlists.list[0] = {
      url_name: 'example',
      name: 'DevJams',
      banner: 'dist/images/playlists/playlistbanner.jpg',
      image: 'dist/images/songs/song7.jpg',
      genre: [],
      songs: [
        {image: 'dist/images/songs/song5.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg" },
        {image: 'dist/images/songs/song6.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg"  },
        {image: 'dist/images/songs/song7.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg"  },
        {image: 'dist/images/songs/song6.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg"  },
        {image: 'dist/images/songs/song5.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg"  },
        {image: 'dist/images/songs/song6.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg"  },
        {image: 'dist/images/songs/song7.jpg', url: 'http://ccmixter.org/content/unreal_dm/unreal_dm_-_Recycle_This.mp3', displayName: 'Artist Name - Title', type: "audio/mpeg"  }
      ]
    };

    PlayListObj.get = function (){
      return JSON.parse(localStorage.getItem(storage_id) || JSON.stringify(playlists));
    };

    PlayListObj.put = function (playlist,callback){
      PlayListObj.playlists.push(playlist);

      localStorage.setItem(storage_id, JSON.stringify(PlayListObj.playlistsObj));

      setTimeout(function(){
        callback(localStorage.getItem(storage_id));
      },500);
    };

    PlayListObj.update = function (playlists){

      PlayListObj.playlists = playlists;

      return localStorage.setItem(storage_id, JSON.stringify(PlayListObj.playlistsObj));
    };

    //Replace with get from localStorage
    PlayListObj.playlistsObj = PlayListObj.get();
    //PlayListObj.playlistsObj = playlists;

    PlayListObj.playlists = PlayListObj.playlistsObj.list;

    PlayListObj.getPlaylist = function(title,callback) {

      _.map(PlayListObj.playlists, function(playlist){

        if(playlist.url_name == title){
          return callback(playlist);
        }
      });
    };

    PlayListObj.addSongToPlaylist = function(song,playListName) {

      _.map(PlayListObj.playlists, function(playlist){

        if(playlist.name == playListName){

          playlist.songs.push(song);

          PlayListObj.update(PlayListObj.playlists);
        }
      });
    };

    PlayListObj.removeSongFromPlaylist = function(song,playListName) {

      _.map(PlayListObj.playlists, function(playlist){

        if(playlist.name == playListName){

          _.map(playlist.songs, function(songOnList){

            if(songOnList.url == song.url){

              playlist.songs = _.without(playlist.songs,songOnList);

              console.log(PlayListObj.playlists);

              PlayListObj.update(PlayListObj.playlists);

            }
          });
        }
      });
    };

    return PlayListObj;

  }).factory("navigationMenuService",
  function() {

/* Toggle Menu */

    var MENU_STATES = {
      menu:true,
      playing:false
    };

    return MENU_STATES;


  }).factory("CreatePlaylistSrv",['$modal','$log','PlayListSrv','$location',function($modal,$log,PlayListSrv,$location) {

/* Creates New Playlist */

    var CreatePlayListSrvObj = {};

    CreatePlayListSrvObj.openCreateModal = function(song){

     var modalInstance = $modal.open({
       templateUrl: 'app/views/forms/create_playlist.html',
       controller: 'CreatePlaylistInstanceCtrl',
       resolve: {
         playlistName: function () {
           return '';
         },
         song: function () {
           return song;
         }
       }
     });

     modalInstance.result.then(function (response) {

       var songs = [],
         playlistName;

       if(typeof response.song != "undefined"){
         songs.push(response.song);
       }

       playlistName = response.playlistName;

       //Callback for a Okay on Save New Playlist
       var url_name = playlistName.toLowerCase().replace(" ","-"),
       new_playlist = {
         url_name: url_name,
         name: playlistName,
         banner: 'dist/images/playlists/playlistbanner.jpg',
         image: 'dist/images/songs/song12.jpg',
         genre: [],
         songs: songs
       };

       PlayListSrv.put(new_playlist,function(response){

         window.location = "#/playlist/" + url_name;
       });

     }, function () {
        $log.info('Modal dismissed at: ' + new Date());
     });
     };

    return CreatePlayListSrvObj;

  }]);
