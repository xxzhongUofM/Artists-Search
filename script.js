var resultView = new Vue({
  el: '#app',
  data: {
    textbox: '',
    artists: [],
    genres: [],
    all: [],
    clicked: [],
    buttons: []
  },
  methods: {
    Search: function() {
      axios
      .get("https://itunes.apple.com/search?term=" + this.textbox + "&origin=*")
      .then(response => {
        this.artists.length = 0
        this.genres.length = 0
        this.all.length = 0
        for (i = 0; i < response.data.results.length; ++i) {
          response.data.results[i].leftTab = true
          this.artists.push(response.data.results[i])
          this.all.push(response.data.results[i])
          // console.log(responsej.data.results[i].artistName)
          if (!this.genres.includes(response.data.results[i].primaryGenreName))
            this.genres.push(response.data.results[i].primaryGenreName)
            this.buttons[response.data.results[i].primaryGenreName] = 0;
        }
        if (this.artists.length == 0) {
          window.location.reload()
          alert("No artist was found with the keyword")
        }
        console.log(this.buttons)
        console.log(response.data)
        // console.log(this.genres)
    })
    },

    LeftTab: function(index) {
      this.artists[index].leftTab = true;
    },

    RightTab: function(index) {
      this.artists[index].leftTab = false;
    },

    HasName: function(index) {
      return this.artists[index].artistName != "";
      return this.artists[index].hasOwnProperty('artistName');
    },

    HasCollectionName: function(index) {
      return this.artists[index].HasCollectionName != "";
      return this.artists[index].hasOwnProperty('collectionName');
    },

    HasPrice: function(index) {
      return this.artists[index].collectionPrice != "";
      return this.artists[index].hasOwnProperty('collectionPrice');
    },

    HasType: function(index) {
      return this.artists[index].kind != "";
      return this.artists[index].hasOwnProperty('kind');
    },

    HasPreview: function(index) {
      return this.artists[index].previewUrl != "";
      return this.artists[index].hasOwnProperty('previewUrl');
    },

    HasTrackId: function(index) {
      return this.artists[index].tackId != "";
      return this.artists[index].hasOwnProperty('trackId');
    },

    Filter: function(genre) {
      //console.log(genre)
      if (genre != "all") {
        this.artists.length = 0;
        // console.log(this.all)
        for (i in this.all) {
          //console.log(this.all[i].primaryGenreName)
          if (this.all[i].primaryGenreName == genre) {
            this.artists.push(this.all[i])
          }
        }
        // console.log(this.artists);
      } else {
        this.artists.length = 0;
        this.clicked.length = 0;
        for (i in this.all) {
          this.artists.push(this.all[i])
        }
        for(i in this.buttons) {
          this.buttons[i] = 0;
        }
      }
    },

    ToggleGenre: function(genre) {
      // console.log(genre)
      if (this.buttons[genre] == 0) {
        console.log("turn on");
        this.buttons[genre] = 1;
      } else {
        console.log("turn off");
        this.buttons[genre] = 0;
      }
      
      if (this.clicked.includes(genre)) {
        for(i = 0; i < this.clicked.length; ++i) {
          if (this.clicked[i] == genre) {
            this.clicked.splice(i, 1);
            break;
          }
        }
      } else {
        this.clicked.push(genre)
      }

      this.artists.length = 0;
      for (i in this.all) {
        if (this.clicked.includes(this.all[i].primaryGenreName)) {
          this.artists.push(this.all[i])
        }
      }
    }
  },
})
