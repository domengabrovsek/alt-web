new Vue({
  el: '#app',
  data() {
    return {
      data: {
        rows: [],
        columns: null
      },
      searchQuery: null,
      download: null,
      href: null
    }
  },
  methods: {
    prepareCsv: function (data) {
      if (data) {

        try {

          const Parser = json2csv.Parser;
          const parser = new Parser({ fields: Object.keys(data[0]) });

          // parse data to csv form
          const csv = parser.parse(data);

          // create the file and url for download
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);

          // set properties which are then used in html button for download
          this.download = `alt-web-${new Date().toString().slice(0, 24).replace(/\s|:/g, '-')}.csv`;
          this.href = url;

        } catch (error) {
          console.error('Error while parsing csv:', error);
        }
      }
    },
    search: function (event) {
      // when enter is pressed in search bar, call api to
      if (event.keyCode === 13) {
        axios
          .get(`http://localhost:3000/scrape?searchQuery=${this.searchQuery}`)
          .then(({ data }) => {
            // save data from response 

            this.data.columns = Object.keys(data);
            this.data.rows.push(data);

            // prepare csv data and set button attributes for download
            this.prepareCsv(this.data.rows);
          })
          .catch(error => {
            console.error('Error while running search:', error);
          })
      }
    },
    clearData: function() {
      this.data.rows = [];
    }
  }
})
