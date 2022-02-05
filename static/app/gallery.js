Vue.component("gallery-page", {
    props: ["username"],
    template: `
    <div class="container w-50">
        <div class="d-flex justify-content-center mt-3">
            <router-link tag="button" class="btn btn-primary w-50 rounded-pill" exact to="/create-photo/" style="max-width: 600px;"><i class="far fa-plus-square"></i>Post a photo</router-link>
        </div>
		<div class="row">
		    <photo-ui v-for="photo in gallery" :noLink="false" :photo="photo"></photo-ui>
		</div>
	</div>
    `,
    data() {
        return {
            gallery: null,
        }
    },
    methods: {
        getGallery() {
            axios.get("/profile/" + this.username + "/gallery/")
                .then(response => {
                    this.gallery = response.data;
                });
        }
    },
    mounted() {
        this.getGallery();
    },
    watch: {
        $route(to, from) {
            this.getGallery();
        }
    },
})