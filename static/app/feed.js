Vue.component("feed-page", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <div class="d-flex justify-content-center flex-column align-items-center" style="margin-top:80px;">
            <router-link tag="button" class="btn btn-primary w-50 rounded-pill" to="/create-status/" style="max-width: 600px;"><i class="far fa-plus-square"></i> Create a new status</router-link>
            <status-ui v-for="status in statuses" :status="status" :key="status.id"></status-ui>
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
        if (window.sessionStorage.getItem("user") !== null){
            if (JSON.parse(window.sessionStorage.getItem("user")).role === 'Administrator'){
                router.push("/search")
                return;
            }
        } else {
            router.push("/search")
            return;
        }
        axios.get("/feed/", {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
            }
        })
            .then((response) => {
                  this.statuses = response.data;
                  console.log(this.statuses);
            })
    },
});