Vue.component("friends-list", {
    template:`
    <div class="d-flex justify-content-center mt-3">
        <div class="d-flex flex-column align-items-start">
            <profile-picture-details v-for="friend in friends" :user="friend" :key="friend.username"></profile-picture-details>
        </div>
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
})