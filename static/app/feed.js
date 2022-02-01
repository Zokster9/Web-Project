Vue.component("feed-page", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <div class="d-flex justify-content-center flex-column align-items-center" style="margin-top:80px;">
            <router-link tag="button" class="btn btn-primary w-50 rounded-pill" to="/create-status/"><i class="far fa-plus-square"></i> Create a new status</router-link>
            <status-ui v-for="status in statuses" :status="status"></status-ui>
        </div>
        <br>
        <br>
    </div>
    `,
    data() {
        return {
            statuses: null,
        }
    },
    mounted() {
      axios.get("/feed/", {
          headers: {
              Authorization: 'Bearer ' + window.sessionStorage.getItem('jwt'),
          }
      })
          .then((response) => {
              this.statuses = response.data;
              console.log(this.statuses);
          })
    },
});