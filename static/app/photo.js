Vue.component("photo-ui", {
    props: ["photo", "noLink"],
    template: `
    <div v-if="!noLink" class="col-md-3 my-4">
        <router-link :to="'/post/'+photo.id" tag="div" class="photography" style="position: relative">
            <img class="img-fluid" :src="'imgs/'+photo.picture" :alt="'imgs/'+photo.picture" style="overflow: hidden; position: relative;"/>
        </router-link>
	</div>
	<div @click="changeProfilePicture" v-else class="col-md-3 my-4">
        <img class="img-fluid" :src="'imgs/'+photo.picture" :alt="'imgs/'+photo.picture" style="overflow: hidden; position: relative;"/>
	</div>
    `,
    methods: {
        changeProfilePicture() {
            this.$emit('change-profile-picture', this.photo.picture);
        }
    },
})