Vue.component("friend-requests", {
    template: `
    <div>
        <main-navbar></main-navbar>
    
        <div style="width:100%;height:100%;margin-top:100px;">
            <div class="vertical-center">
                <div class="inner-block-requests">
                    <div class="friend-requests d-flex flex-column align-items-center">
                        <friend-request @get-requests="getRequests" v-for="friendRequest in friendRequests" :username="friendRequest.sender" :key="friendRequest.date"></friend-request>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            friendRequests: null,
        }
    },
    methods: {
        getRequests() {
            axios.get("/friend-requests/", {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            })
                .then(response => {
                    this.friendRequests = response.data;
                })
        }
    },
    mounted() {
        this.getRequests()
    }
})

Vue.component("friend-request", {
    props: ["username"],
    template: `
    <div class="friend-request d-flex" style="width:100%;">
        <profile-picture-details :user="user"></profile-picture-details>
        <div class="d-flex align-items-center justify-content-end ms-auto p-2" style="gap:10px;">
            <button @click="acceptRequest" type="button" class="btn btn-success">Accept</button>
            <button @click="declineRequest" type="button" class="btn btn-danger">Deny</button>
        </div>
    </div>
    `,
    data() {
        return {
            user: null,
        }
    },
    methods: {
        acceptRequest() {
            axios.put("/accept-request/" + this.user.username, {}, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                this.$emit("get-requests")
            })
        },
        declineRequest() {
            axios.put("decline-request/" + this.user.username, {}, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                this.$emit("get-requests")
            })
        },
    },
    mounted() {
        axios.get('/get-user/' + this.username + '/')
            .then((response) => {
                this.user = response.data;
            });
    }
})