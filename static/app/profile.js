Vue.component("profile-page", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <div v-if="user" style="margin-top: 80px">
            <div class="d-flex justify-content-center align-items-center" style="height:150px; width:150px; margin:auto;">
                <profile-picture :profilePicture="user.profilePicture" :username="user.username"></profile-picture>
            </div>
            <div class="d-flex justify-content-center flex-column align-items-center mt-3">
                <h2>{{user.name + " " + user.surname}}</h2>
                <h4>{{"@" + user.username}}</h4>
                <h5>{{newDate}}</h5>
            </div>
            <div v-if="isLoggedIn && !isUsersProfile" class="d-flex justify-content-center align-items-center" style="gap: 25px;">
                <span v-if="!isAdmin">
                    <button @click="removeFriend" v-if="isFriend" class="btn" id="request"><i class="fas fa-user-minus"></i> Remove from friends</button>
                    <button @click="addFriend" v-else class="btn" id="request"><i class="fas fa-user-plus"></i> Send friend request</button>
                </span>
                <router-link v-if="isFriend || isAdmin" class="btn" to="/"><i class="fab fa-facebook-messenger"></i> Send message</router-link>
            </div>
            <div v-if="!isPrivate && !isLoggedIn" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><button @click="statusesClick" class="nav-link">Statuses</button></li>
                    <li class="nav-item"><button @click="galleryClick" class="nav-link">Gallery</button></li>
                </ul>
            </div>
            <div v-else-if="isPrivate && !isLoggedIn" class="mt-4" hidden>
            </div>
            <div v-else-if="isAdmin" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><button @click="statusesClick" class="nav-link">Statuses</button></li>
                    <li class="nav-item"><button @click="galleryClick" class="nav-link">Gallery</button></li>
                </ul>
            </div>
            <div v-else-if="isPrivate && isLoggedIn" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li v-if="isFriend || isUsersProfile" class="nav-item"><button @click="statusesClick" class="nav-link ">Statuses</button></li>
                    <li v-if="isFriend || isUsersProfile" class="nav-item"><button @click="galleryClick" class="nav-link">Gallery</button></li>
                    <li v-if="!isUsersProfile" class="nav-item"><button @click="mutualFriendsClick" class="nav-link" >Mutual friends</button></li>
                    <li v-else-if="isUsersProfile" class="nav-item"><button @click="friendsClick" class="nav-link" >Friends list</button></li>
                    <li v-if="isUsersProfile" class="nav-item"><button @click="editAccountClick" class="nav-link">Edit account</button></li>
                </ul>
            </div>
            <div v-else-if="!isPrivate && isLoggedIn" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><button @click="statusesClick" role="tab" class="nav-link ">Statuses</button></li>
                    <li class="nav-item"><button @click="galleryClick" role="tab" class="nav-link">Gallery</button></li>
                    <li v-if="!isUsersProfile" class="nav-item"><button @click="mutualFriendsClick" role="tab" class="nav-link" >Mutual friends</button></li>
                    <li v-else-if="isUsersProfile" class="nav-item"><button @click="friendsClick" role="tab" class="nav-link" >Friends list</button></li>
                    <li v-if="isUsersProfile" class="nav-item"><button @click="editAccountClick" role="tab" class="nav-link">Edit account</button></li>
                </ul>
            </div>
            <component :is="currentComponent" v-bind="currentProperties"></component>
        </div>
    </div>
    `,
    data() {
        return {
            user: null,
            loggedInUser: null,
            newDate: null,
            currentComponent: "statuses-page",
        }
    },
    computed: {
        currentProperties() {
            if (this.currentComponent === "statuses-page") {
                return {username: this.user.username}
            } else if (this.currentComponent === "gallery-page") {
                return {username: this.user.username}
            } else if (this.currentComponent === "edit-profile") {
                return {user: this.user}
            } else if (this.currentComponent === "friends-list") {
                return {}
            } else if (this.currentComponent === "mutual-friends") {
                return {username: this.user.username}
            }
        },
        isFriend() {
            return this.user.friends.includes(this.loggedInUser.username);
        },
        isLoggedIn() {
            return !!this.loggedInUser;
        },
        isPrivate() {
            return this.user.isPrivate;
        },
        isUsersProfile() {
            return this.user.username === this.loggedInUser.username;
        },
        isAdmin() {
            return this.loggedInUser.role === "Administrator";
        }
    },
    methods: {
        addFriend() {

        },
        removeFriend() {

        },
        getUser() {
            this.currentComponent = "";
            axios.get('/get-user/' + this.$route.params.username + '/')
                .then((response) => {
                    this.user = response.data;
                    let date = response.data.dateOfBirth.split(" ");
                    this.newDate = date[0] + " " + date[1] + " " + date[2];
                    this.currentComponent = "statuses-page";
                });
        },
        statusesClick() {
            this.currentComponent = "statuses-page"
        },
        galleryClick() {
            this.currentComponent = "gallery-page"
        },
        mutualFriendsClick() {
            this.currentComponent = "mutual-friends"
        },
        friendsClick() {
            this.currentComponent = "friends-list"
        },
        editAccountClick() {
            this.currentComponent = "edit-profile"
        },
    },
    mounted() {
        if (window.sessionStorage.getItem("user") !== null){
            this.loggedInUser = JSON.parse(window.sessionStorage.getItem("user"));
        }
        this.getUser();
    },
    watch: {
        $route(to, from) {
            this.getUser();
        }
    },
})