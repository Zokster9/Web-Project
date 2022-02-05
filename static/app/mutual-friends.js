Vue.component("mutual-friends", {
    props: ["username"],
    template: `
    <div class="d-flex justify-content-center flex-column align-items-center mt-2">
		<profile-picture-details v-for="friend in friends" :user="friend"></profile-picture-details>
	</div>
    `,
    data() {
        return {
            friends: null,
        }
    },
    methods: {
        getMutualFriends() {
            axios.get("/profile/" + this.username + "/mutual-friends/", {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                this.friends = response.data;
            })
        }
    },
    mounted() {
        this.getMutualFriends();
    },
    watch: {
        $route(to, from) {
            this.getMutualFriends();
        }
    },
})