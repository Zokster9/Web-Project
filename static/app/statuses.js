Vue.component("statuses-page", {
    props: ["username"],
    template: `
    <div class="d-flex flex-column justify-content-center align-items-center">
        <status-ui v-for="status in statuses" :status="status"></status-ui>
    </div>
    `,
    data() {
        return {
            statuses: null,
        }
    },
    methods: {
        getStatuses() {
            axios.get("/profile/" + this.username + "/statuses/")
                .then(response => {
                    this.statuses = response.data;
                });
        }
    },
    mounted() {
        this.getStatuses();
    },
    watch: {
        $route(to, from) {
            this.getStatuses();
        }
    },
})