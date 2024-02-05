// Normalement caché dans un fichier à part
const URL_BASE = "https://api.themoviedb.org/3/";
const KEY = "97a606aa6db5ee7bf76f829ae007d0a3";

function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
let appVote = new Vue({
  el: "#app-vote",
  data: {
    genreName: "",
    enable: true,
    drag: false,
    genre: [],
    moviesFromGenre: [],
  },
  methods: {
    dataGenres: function () {
      fetch(
        `${URL_BASE}genre/movie/list?language=fr&sort_by=popularity.desc&api_key=${KEY}`
      )
        .then((response) => response.json())
        .then((response) => (this.genre = response.genres))
        .catch((err) => console.error(err));
    },

    dataMovieByGenderId: function (genderId, genreName) {
      document.getElementById("accueil").style.display = "none";
      document.querySelector(".saveVote").style.display = "flex";
      this.genreName = genreName;
      if (JSON.parse(localStorage.getItem(this.genreName) !== null)) {
        this.moviesFromGenre = JSON.parse(localStorage.getItem(this.genreName));
      } else {
        fetch(
          `${URL_BASE}discover/movie?include_adult=false&with_genres=${genderId}&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&api_key=${KEY}`
        )
          .then((response) => response.json())
          .then((response) => {
            this.moviesFromGenre = response.results;
            this.moviesFromGenre.splice(0, 10);
          })
          .catch((err) => console.error(err));
      }
      closeNav();
    },

    showContent: function (index) {
      document.getElementById(`content-${index}`).classList.add("show");
      document.querySelector(`.text-${index}`).classList.add("show");
    },
    hideContent: function (index) {
      document.getElementById(`content-${index}`).classList.remove("show");
      document.querySelector(`.text-${index}`).classList.remove("show");
    },

    saveListGenres: function () {
      localStorage.setItem(
        this.genreName,
        JSON.stringify(this.moviesFromGenre)
      );
    },
  },
  mounted() {
    this.dataGenres();
  },
});
