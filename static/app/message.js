
Vue.component("chat-page", {
    template: `
    <div class="h-100 w-100">
        <main-navbar></main-navbar>
        <div class="d-flex flex-column align-items-center h-100 w-100">
            <div class="d-flex justify-content-center h-100 w-100">
                <div class="window d-flex" style="height:70vh; width:70vw;margin-top:150px;">
                    <div class="d-flex flex-column side-chats overflow-auto h-100 shadow rounded" style="width:20vw;gap:5px;">
                        <chat-list-item v-for="chat in chats" :user="chat"></chat-list-item>
                    </div>
                    <div class="chat d-flex flex-column" style="width:50vw;margin-left:5px;margin-right:5px;">
                        <div class="chat-header d-flex shadow" style="gap:5px;height: 50px;">
                            
                        </div>
                        <div class="chat-messages overflow-auto" style="height:57vh;padding-left:10px;padding-right:10px;padding-bottom:10px;">
                            
                        </div>
                        <div class="d-flex">
                            <button class="btn btn-primary flex-shrink-0 disabled"><i class="fas fa-paper-plane"></i></button>
                            <input type="text" class="w-100 form-control form-control-lg" readonly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return{
            username: null,
            chats: null,
        }
    },
    methods: {
        loadChats() {
            if (window.sessionStorage.getItem("user") === null){
                router.push("/search/");
                return;
            }
            this.username = JSON.parse(window.sessionStorage.getItem("user")).username;
            axios.get("/get-chats/"+this.username+"/", {
            }).then((response) => {
                this.chats = response.data;
            })
        }
    },
    mounted() {
        this.loadChats();
    },
    watch: {
        $route(to, from) {
            this.loadChats();
        }
    },

})

Vue.component("chat-list-item", {
    props: ["user"],
    template: `
    <router-link exact :to="user.username" tag="div" @click.native="loadChats" class="d-flex w-90 chat-list-item rounded align-items-center" style="height:60px;gap:5px;margin-left:10px;margin-right:10px;padding:10px;">                        
        <div class="flex-grow-0" style="height:50px;width:50px;">
            <profile-picture :profilePicture="user.profilePicture" :username="user.username"></profile-picture>
        </div>
        <div class="d-flex flex-column">
            <div class="name">
                {{user.name+" "+user.surname}}
            </div>
            <div class="username">
                {{"@"+user.username}}
            </div>
        </div>
        <div v-if="user.role ==='Administrator'" class="ms-auto">
            <i class="fas fa-user-shield"></i>
        </div>
    </router-link>
    `,
    methods:{
        loadChats(){
            this.$parent.loadChats();
        }
    },
    watch: {
        $route(to, from) {
            this.loadChats();
        }
    },
});