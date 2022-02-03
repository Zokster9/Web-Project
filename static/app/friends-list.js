Vue.component("friends-list", {
    template:`
    <div class="d-flex flex-column justify-content-center align-items-center mt-3">
        <profile-picture-details v-for="friend in friends" :user="friend"></profile-picture-details>
    </div>
    `,
    data() {
        return {
            friends: null,
        }
    },
    methods: {
        getFriends() {
            axios.get("/profile/friends/", {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                this.friends = response.data;
            })
        }
    },
    mounted() {
        this.getFriends();
    },
    watch: {
        $route(to, from) {
            this.getFriends();
        }
    },
})