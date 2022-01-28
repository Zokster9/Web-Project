Vue.component("status-ui", {
    template: `

    <div class="status" style="margin-top:30px">
        <div class="content">
            <div>
                <profile-picture-details></profile-picture-details>
            </div>
            <div class="status-text">
                <p class="font-weight-large fs-5">Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Nunc eget euismod odio. 
                Aenean sed faucibus ligula. Mauris id turpis et elit pharetra mollis. 
                Phasellus venenatis turpis ac convallis luctus. 
                Sed elementum ex neque, a aliquam elit facilisis quis. 
                Nam sit amet leo ex. Sed turpis magna, laoreet rhoncus massa semper, semper laoreet erat.
                Etiam rutrum lacinia lectus vitae iaculis.
                </p>
            </div>
            <div v-if="img" class="status-img">
                <img src="imgs/download.jpg" alt="MAAAAAAJMUBE" class="status-img">
            </div>
        </div>
        <div class="like-comment-share">
            <router-link to="/" class="like"><button><i class="fa fa-thumbs-up"></i> Like</button></router-link>
            <router-link to="/" class="comment"><button><i class="fa fa-comment"></i> Comment</button></router-link>
            <router-link to="/" class="share"><button><i class="fa fa-share"></i> Share</button></router-link>
        </div>
    </div>
    `,
    data() {
        return {
            img: true
        }
    },
})