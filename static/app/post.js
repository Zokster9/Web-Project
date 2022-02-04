Vue.component("post-ui", {
    template:`
	<div>
		<main-navbar></main-navbar>
		<div v-if="post.picture!==''" class="post d-flex justify-content-center shadow" style="margin:auto;margin-top:100px;width:90vw;height:80vh;border-radius: 20px;overflow: hidden;">
			<div class="post-image" style="height:100%;width:65vw;background-color: black;">
				<img :src="'imgs/'+post.picture" :alt="'imgs/'+post.picture" style="width:100%;height:100%;object-fit:contain;overflow:hidden;object-position:center;">
			</div>
			<div class="post-sidebar" style="width:25vw;height:80vh;background-color: white;">
			    <div class="d-flex align-items-start">
                    <profile-picture-details :user="poster"></profile-picture-details>
                    <button v-if="(poster.username === user.username || user.role === 'Administrator')" @click="deletePost" class="btn btn-danger btn-sm flex-grow-0 ms-auto m-3"><i class="far fa-trash-alt"></i></button>
                </div>
				<div class="post-text" style="margin-left: 10px;margin-right: 5px;">
					<p class="font-weight-normal fs-5">
						{{post.text}}
					</p>
				</div>
				<div style="height:40vh">
					<post-comments :role="user.role"></post-comments>
				</div>
			</div>
		</div>
		<div v-else>
		    <div v-if="post" class="d-flex justify-content-center shadow" style="margin:auto;margin-top:100px;width:60vw;height:80vh;border-radius: 20px;overflow: hidden;">
                <div class="post shadow w-100 h-100" >
                    <div v-if="poster" class="d-flex align-items-start">
                        <profile-picture-details :user="poster"></profile-picture-details>
                        <button v-if="(poster.username === user.username || user.role === 'Administrator')" @click="deletePost" class="btn btn-danger btn-sm flex-grow-0 ms-auto m-3"><i class="far fa-trash-alt"></i></button>
                    </div>
                    <div class="status-text">
                        <p class="font-weight-large fs-5 p-2">{{post.text}}</p>
                    </div>
                    <div style="height:40%;">
					    <post-comments :role="user.role"></post-comments>
				    </div>
                </div>
            </div>
        </div>
	</div>
    `,
    data(){
        return{
            user: null,
            post: null,
            poster: null,
        }
    },
    methods: {
        deletePost(){
            if (user.role === 'Administrator') {
                route.push("/delete-post/"+this.$route.params.id+"/")
            }
        }
    },
    mounted() {
        if (window.sessionStorage.getItem("user") !== null){
            this.user = JSON.parse(window.sessionStorage.getItem("user"));
        } else {
            router.push("/login")
            return;
        }
        axios.get("/get-post/"+this.$route.params.id+"/", {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
            }
            }).then((response) => {
                this.post = response.data;
                axios.get("/get-user/"+this.post.username+"/", {
                }).then((response) =>{
                    this.poster = response.data;
                });
            }).catch((error) => {
                if(this.user.role === 'Administrator'){
                    router.push("/search");
                    return;
                } else {
                    router.push("/feed");
                    return;
                }
            });
    },
})

Vue.component("post-comments", {
    props:["role"],
    template:`
    <div class="comment-part" style="margin-left:10px; margin-right:10px;height:100%;">
        <div v-if="role==='User'" class="write-comment d-flex">
            <!-- Comment must have text to be posted -->
            <input type="text" rows="1" style="width:100%;height:auto;" placeholder="Write a comment..."/>
            <button type="button" class="btn btn-primary">Submit</button>
        </div>
        <div class="multiple-comments overflow-auto" style="height:100%;">
            <div v-for="comment in comments">
                <single-comment :comment="comment"></single-comment>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            comments: null,
        }
    },
    mounted() {
        axios.get("/get-comments/"+this.$route.params.id+"/", {
        }).then((response) => {
            this.comments = response.data;
        })
    }

})

Vue.component("single-comment", {
    props: ["comment"],
    template: `
    <div v-if="user" class="single-comment d-flex" style="gap:5px;max-width:95%;margin-top:10px;">
        <div class="profile-picture d-flex flex-column align-items-center" style="width:40px;height:40px;flex-shrink:0;gap:5px;">
            <profile-picture :profilePicture="user.profilePicture" class="flex-shrink-0"></profile-picture>
            <button v-if="(user.username === current)" class="btn btn-danger btn-sm w-75"><i class="far fa-trash-alt"></i></button>
        </div>
        <div class="d-flex flex-column">
            <router-link :to="'/profile/'+user.username" class="username">
                {{'@'+user.username}}
            </router-link>
            <div class="comment-text rounded shadow-lg" style="background-color:lightblue;">
                <div class="font-weight-large fs-6 p-1">
                    {{comment.content}}
                </div>
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            user: null,
            current: JSON.parse(window.sessionStorage.getItem("user")).username,
        }
    },
    mounted(){
        axios.get("/get-user/"+this.comment.username+"/", {
        }).then((response) =>{
            this.user = response.data;
        });
    }
})