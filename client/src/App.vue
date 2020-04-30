<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Dashboard</a>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li>
            <input
              class="form-control"
              @keydown="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </li>
          <button type="button" class="btn btn-dark h-50" @click="clearData">Clear Data</button>
          <button type="button" class="btn btn-dark h-50">
            <a v-bind:href="href" v-bind:download="download">Save to CSV</a>
          </button>
          <button type="button" class="btn btn-dark h-50">Build graphs</button>
        </ul>
      </div>
    </nav>

    <!-- Home page -->
    <main role="main" class="container-fluid">
      <div class="row">
        <div v-if="data.rows" class="table-wrapper-scroll-y">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col" v-for="column in data.columns" :key="column">{{ column }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in data.rows" :key="row">
                <td v-for="column in data.columns" :key="column">{{ row[column] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import json2csv from "json2csv";

export default {
  data() {
    return {
      data: {
        rows: [],
        columns: null
      },
      searchQuery: null,
      download: null,
      href: null
    };
  },
  methods: {
    prepareCsv(data) {
      if (data) {
        try {
          const Parser = json2csv.Parser;
          const parser = new Parser({ fields: Object.keys(data[0]) });

          // parse data to csv form
          const csv = parser.parse(data);

          // create the file and url for download
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);

          // set properties which are then used in html button for download
          this.download = `alt-web-${new Date()
            .toString()
            .slice(0, 24)
            .replace(/\s|:/g, "-")}.csv`;
          this.href = url;
        } catch (error) {
          console.error("Error while parsing csv:", error);
        }
      }
    },
    search(event) {
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
            console.error("Error while running search:", error);
          });
      }
    },
    clearData() {
      this.data.rows = [];
    }
  }
};
</script>

<style>
/* Show it is fixed to the top */
body {
  padding-top: 3.54rem;
}
button {
  margin-left: 3px !important;
}
button > a {
  color: white;
}
button > a:hover {
  color: white !important;
  text-decoration: none !important;
  cursor: pointer !important;
}
</style>
