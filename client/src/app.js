new Vue({
  el: '#app',
  data () {
    return {
      data: null,
      columns: null,
      currentPage: "home"
    }
  },
  methods: {
    preview() {
      this.currentPage = "preview";
    },
    home() {
      this.currentPage = "home"
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/test')
      .then(response => {
        this.data = response.data.data;
        this.columns = Object.keys(this.data[0]);
      })
  }
})