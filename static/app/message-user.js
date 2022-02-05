Vue.use(vuelidate.default)

Vue.component("chat-page-user", {
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
                        <div v-if="receiver" class="chat-header d-flex shadow" style="gap:5px;">
                            <div class="flex-shrink-0" style="height:50px;width:50px;">
                                <profile-picture :profilePicture="receiver.profilePicture"></profile-picture>
                            </div>
                            <div class="d-flex flex-column">
                                <div class="name">
                                    {{receiver.name+" "+receiver.surname}}
                                </div>
                                <div class="username">
                                    {{"@"+this.$route.params.username}}
                                </div>
                            </div>
                            <div v-if="receiver.role==='Administrator'">
                                <i class="fas fa-user-shield"></i>
                            </div>
                        </div>
                        <div class="chat-messages overflow-auto" style="height:57vh;padding-left:10px;padding-right:10px;padding-bottom:10px;">
                            <div v-for="message in messages">
                                <my-chat-message v-if="message.sender===user.username" :message="message" :isAdmin="user.role ==='Administrator'"></my-chat-message>
                                <incoming-chat-message v-else :message="message" :isAdmin="receiver.role==='Administrator'"></incoming-chat-message>
                            </div>
                        </div>
                        <div class="d-flex">
                            <button class="btn btn-primary flex-shrink-0" :disabled="$v.message.$invalid" @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
                            <input v-model="message" :disabled="receiver.role ==='Administrator'" type="text" class="w-100 form-control form-control-lg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return{
            user: JSON.parse(window.sessionStorage.getItem("user")),
            chats: null,
            receiver: null,
            messages: null,
            message: "",
            webSocket: null,
        }
    },
    methods:{
        loadChats() {
          axios.get("/get-user/" + this.$route.params.username + "/", {
          }).then((response) => {
              this.receiver = response.data;
          });
          // this gets opened chat's messages
          axios.get("/messages/", {
              params: {
                  username: this.user.username,
                  receiver: this.$route.params.username,
              }
          }).then((response) => {
              this.messages = response.data;
          });
        },
        sendMessage() {
            let chatMessage = this.user.username + "|" + this.receiver.username + "|" + this.message;
            this.webSocket.send(chatMessage);
            axios.post("/add-message/", {
                content: this.message,
                sender: this.user.username,
                receiver: this.receiver.username,
            }).then((response) => {
                this.message = "";
                axios.get("/messages/", {
                    params: {
                        username: this.user.username,
                        receiver: this.receiver.username,
                    }
                }).then((response) => {
                    this.messages = response.data;
                });
            });
        },
    },
    mounted() {
        if (window.sessionStorage.getItem("user") === null){
            router.push("/search/");
            return;
        }
        this.user.username = JSON.parse(window.sessionStorage.getItem("user")).username;
        // this gets chat list
        axios.get("/get-chats/"+this.user.username+"/", {
        }).then((response) => {
            this.chats = response.data;
        });
        // this gets opened chat user info
        axios.get("/get-user/" + this.$route.params.username + "/", {
        }).then((response) => {
            this.receiver = response.data;
        });
        // this gets opened chat's messages
        axios.get("/messages/", {
            params: {
                username: this.user.username,
                receiver: this.$route.params.username,
            }
        }).then((response) => {
            this.messages = response.data;
        });
    },
    created() {
        let self = this;
        this.webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/ws/");
        this.webSocket.onmessage = function (msg) {
            let chatMessage = msg.data;
            const messageParts = chatMessage.split("|");
            console.log(messageParts);
            let sender = messageParts[0];
            let receiver = messageParts[1];
            if (sender === self.receiver.username && receiver === self.username) {
                axios.get("/messages/", {
                    params: {
                        username: self.username,
                        receiver: self.receiver.username,
                    }
                }).then((response) => {
                    self.messages = response.data;
                });
            }
        };
        this.webSocket.onclose = function () { alert("WebSocket connection closed") };
    },
    validations: {
        message: {
            required: validators.required,
        }
    }
})

Vue.component("my-chat-message", {
    props: ["message", "isAdmin"],
    template: `
    <div class="d-flex flex-column justify-content-end">
        <div class="d-flex justify-content-end">
            <div class="message-data-time">
                {{date}}
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <div :class="[isAdmin ? 'admin-my-message' : 'my-message']" class="message p-2">
                {{message.content}}
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            date:null,
        }
    },
    mounted(){
        let date = JSON.stringify(new Date(this.message.date)).split("-");
        this.date = date[2].split("T")[1].substring(0,5)+ " " +date[2].split("T")[0] + "." + date[1] + "." + date[0].substring(1)+".";
    }
})

Vue.component("incoming-chat-message", {
    props: ["message", "isAdmin"],
    template:`
    <div class="d-flex flex-column justify-content-start">
        <div class="d-flex justify-content-start">
            <div class="message-data-time">
                {{date}}
            </div>
        </div>
        <div class="d-flex justify-content-start">
            <div :class="[isAdmin ? 'admin-incoming-message' : 'incoming-message']" class="message p-2">
                {{message.content}}
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            date:null,
        }
    },
    mounted(){
        let date = JSON.stringify(new Date(this.message.date)).split("-");
        this.date = date[2].split("T")[1].substring(0,5)+ " " +date[2].split("T")[0] + "." + date[1] + "." + date[0].substring(1)+".";
    }
})