Vue.component("status-ui", {
    props: ["status"],
    template: `

    <div class="status" style="margin-top:30px">
        <router-link to="'/post/'+status.id" tag="div" class="content">
            <div v-if="user">
                <profile-picture-details :user="user"></profile-picture-details>
            </div>
            <div class="status-text">
                <p class="font-weight-large fs-5">{{status.text}}</p>
            </div>
            <div v-if="status.picture" class="status-img">
                <img :src="'imgs/' + status.picture" :alt="'imgs/' + status.picture" class="status-img">
            </div>
        </router-link>
        <div class="like-comment-share">
            <router-link exact to="/like-not-implemented" tag="button" class="like"><i class="fa fa-thumbs-up"></i> Like</router-link>
            <router-link exact to="'/post/'+status.id" tag="button" class="comment"><i class="fa fa-comment"></i> Comment</router-link>
            <router-link exact to="/share" tag="button" class="share"><i class="fa fa-share"></i> Share</router-link>
        </div>
    </div>
    `,
    data() {
        return {
            user: null,
        }
    },
    mounted() {
        axios.get(`/get-user/${this.status.username}`)
            .then((response) => {
                this.user = response.data;
            })
    }
})