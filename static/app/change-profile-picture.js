Vue.component("change-profile-picture", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <div class="container" style="margin-top: 80px">
            <div class="row">
                <photo-ui @change-profile-picture="changeProfilePicture" v-for="photo in gallery" :noLink="true" :photo="photo"></photo-ui>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            gallery: null,
            username: "",
        }
    },
    methods: {
        changeProfilePicture(picture) {
            axios.put("/change-profile-picture/", {}, {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                    },
                    params: {
                        picture: picture,
                    }
                })
                .then(response => {
                    window.sessionStorage.setItem("user", JSON.stringify(response.data));
                    router.push("/profile/" + this.username);
                });
        }
    },
    mounted() {
        this.username = JSON.parse(window.sessionStorage.getItem("user")).username;
        axios.get("/profile/" + this.username + "/gallery/")
            .then(response => {
                this.gallery = response.data;
            });
    },
})