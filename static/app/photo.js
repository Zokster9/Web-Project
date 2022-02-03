Vue.component("photo-ui", {
    props: ["photo"],
    template: `
    <div class="col-md-3 my-4">
        <router-link :to="'/post/'+photo.id" tag="div" class="photography" style="position: relative">
            <img class="img-fluid" :src="'imgs/'+photo.picture" :alt="'imgs/'+photo.picture" style="overflow: hidden; position: relative;"/>
        </router-link>
	</div>
    `
})