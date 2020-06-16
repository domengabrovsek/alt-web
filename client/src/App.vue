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
            <a v-bind:href="websiteHref" v-bind:download="websiteDownload">Save to websites CSV</a>
          </button>
          <button type="button" class="btn btn-dark h-50">
            <a
              v-bind:href="alternativeHref"
              v-bind:download="alternativeDownload"
            >Save to alternatives CSV</a>
          </button>
          <button type="button" class="btn btn-dark h-50">Build graphs</button>
        </ul>
      </div>
    </nav>

    <!-- Home page -->
    <main role="main" class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div v-if="websiteData" class="table-responsive max-table">
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th v-for="column in websiteColumns" :key="column">{{ column }}</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in websiteData" :key="row">
                  <td v-for="column in websiteColumns" :key="column">{{ row[column] }}</td>
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
      searchQuery: null,

      // websites properties
      websiteDownload: null,
      websiteHref: null,
      websiteColumns: [],
      websiteData: [],

      // alternative properties
      alternativeDownload: null,
      alternativeHref: null,
      alternativeColumns: [],
      alternativeData: []
    };
  },
  methods: {
    prepareAlternativesCsv(data) {
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
          this.alternativeDownload = `alternatives-${new Date()
            .toString()
            .slice(0, 24)
            .replace(/\s|:/g, "-")}.csv`;

          this.alternativeHref = url;
        } catch (error) {
          console.error("Error while parsing csv:", error);
        }
      }
    },
    prepareWebsiteCsv(data) {
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
          this.websiteDownload = `websites-${new Date()
            .toString()
            .slice(0, 24)
            .replace(/\s|:/g, "-")}.csv`;

          this.websiteHref = url;
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
            if (!this.websiteData.find(alt => alt.title === data.title)) {
              this.websiteColumns = Object.keys(data);
              this.websiteData.push(data);
            }

            // prepare csv data and set button attributes for download
            this.prepareWebsiteCsv(this.websiteData);
          })
          .catch(error => {
            console.log(error);
            window.alert(`Page for ${this.searchQuery} doesn't exist!`);
          });
      }
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/websites`)
      .then(({ data }) => {
        // save data from response

        this.websiteColumns = Object.keys(data[0]);
        this.websiteData = data;

        // prepare csv data and set button attributes for download
        this.prepareWebsiteCsv(this.websiteData);
      })
      .catch(error => {
        console.error("Error while running search:", error);
      });

    axios
      .get(`http://localhost:3000/alternatives`)
      .then(({ data }) => {
        // save data from response

        if (data && data.length > 0) {
          this.alternativeColumns = Object.keys(data[0]);
          this.alternativeData = data;

          // prepare csv data and set button attributes for download
          this.prepareAlternativesCsv(this.alternativeData);
        }
      })

      .catch(error => {
        console.error("Error while running search:", error);
      });
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
