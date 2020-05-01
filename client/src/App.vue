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
          <button type="button" class="btn btn-dark h-50">
            <a v-bind:href="href" v-bind:download="download">Save to CSV</a>
          </button>
          <button type="button" class="btn btn-dark h-50" @click="refresh">Refresh</button>
          <button type="button" class="btn btn-dark h-50" @click="retryFailed">Retry</button>
        </ul>
      </div>
    </nav>

    <!-- Home page -->
    <main role="main" class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="data" class="table-responsive max-table">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column">{{ column }}</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in data" :key="row.title">
                  <td v-for="column in columns" :key="column">{{ row[column] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
      columns: [],
      data: [],
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
          .get(
            `http://localhost:3000/alternative?searchQuery=${this.searchQuery}`
          )
          .then(({ data }) => {
            // save data from response
            if (!this.data.find(alt => alt.title === data.title)) {
              this.columns = Object.keys(data[0]);
              this.data.push(...data);
            }

            // prepare csv data and set button attributes for download
            this.prepareCsv(this.data);
          })
          .catch(error => {
            console.log(error);
            window.alert(`Page for ${this.searchQuery} doesn't exist!`);
          });
      }
    },
    refresh() {
      axios
        .get(`http://localhost:3000/alternatives`)
        .then(({ data }) => {
          // save data from response
          if (data && data.length > 0) {
            data = data.map(x => {
              delete x.website_id;
              return x;
            });

            this.columns = Object.keys(data[0]);
            this.data = data;

            // prepare csv data and set button attributes for download
            this.prepareCsv(this.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    retryFailed() {
      axios
        .get(`http://localhost:3000/alternatives/retry`)
        .then(({ data }) => {
          // save data from response
          if (data && data.length > 0) {
            data = data.map(x => {
              delete x.website_id;
              return x;
            });

            this.columns = Object.keys(data[0]);
            this.data = data;

            // prepare csv data and set button attributes for download
            this.prepareCsv(this.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style>
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
.max-table {
  max-height: 54rem;
}
td {
  max-width: 17rem;
  overflow-wrap: break-word;
}
</style>
