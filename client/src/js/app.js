new Vue({
  el: '#app',
  data() {
    return {
      data: "",
      columns: "",
      searchQuery: "",
      newSearch: "",
      error: ""
    }
  },
  methods: {
    saveToCsv: function () {
      axios
        .get('http://localhost:3000/status')
        .then(response => console.log('clicked!'));
    },
    search: function (event) {
      // when enter is pressed in search bar, call api to get
      if (event.keyCode === 13) {
        this.newSearch = this.searchQuery;
        axios
          .get(`http://localhost:3000/scrape?searchQuery=${this.searchQuery}`)
          .then(response => {
            this.data = response.data;
            this.columns = Object.keys(this.data[0])
          })
          .catch(error => {
            console.log('wtf')
            this.error = error;
          })
      }
    }
  }
})