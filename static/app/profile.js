Vue.component("profile-page", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <div v-if="user" style="margin-top: 80px">
            <div class="d-flex justify-content-center align-items-center" style="height:150px; width:150px; margin:auto;">
                <profile-picture v-if="isUsersProfile" data-bs-toggle="tooltip" data-bs-placement="top" title="Change profile picture" :loggedUser="loggedInUser" :profilePicture="user.profilePicture" :username="user.username"></profile-picture>
                <profile-picture v-else :profilePicture="user.profilePicture" :username="user.username"></profile-picture>
            </div>
            <div class="d-flex justify-content-center flex-column align-items-center mt-3">
                <h2>{{user.name + " " + user.surname}}</h2>
                <h4>{{"@" + user.username}}</h4>
                <h5>{{newDate}}</h5>
            </div>
            <div v-if="isLoggedIn && !isUsersProfile" class="d-flex justify-content-center align-items-center" style="gap: 25px;">
                <span v-if="!isAdmin">
                    <button @click="removeFriend" v-if="isFriend" class="btn" id="request"><i class="fas fa-user-minus"></i> Remove from friends</button>
                    <button disabled v-else-if="hasSentFriendRequest" class="btn" id="request"><i class="fas fa-user-check"></i> Friend request sent</button>
                    <button @click="addFriend" v-else class="btn" id="request"><i class="fas fa-user-plus"></i> Send friend request</button>
                </span>
                <router-link class="btn" exact :to="'/messages/'+user.username"><i class="fab fa-facebook-messenger"></i> Send message</router-link>
            </div>
            <div v-if="!isPrivate && !isLoggedIn" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><button @click="statusesClick" :class="{active: isStatusesClicked}" class="nav-link">Statuses</button></li>
                    <li class="nav-item"><button @click="galleryClick" :class="{active: isGalleryClicked}" class="nav-link">Gallery</button></li>
                </ul>
                <component :is="currentComponent" v-bind="currentProperties"></component>
            </div>
            <div v-else-if="isPrivate && !isLoggedIn" class="mt-4" hidden>
            </div>
            <div v-else-if="isAdmin" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><button @click="statusesClick" :class="{active: isStatusesClicked}" class="nav-link">Statuses</button></li>
                    <li class="nav-item"><button @click="galleryClick" :class="{active: isGalleryClicked}" class="nav-link">Gallery</button></li>
                </ul>
                <component :is="currentComponent" v-bind="currentProperties"></component>
            </div>
            <div v-else-if="isPrivate && isLoggedIn" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li v-if="isFriend || isUsersProfile" class="nav-item"><button @click="statusesClick" :class="{active: isStatusesClicked}" class="nav-link ">Statuses</button></li>
                    <li v-if="isFriend || isUsersProfile" class="nav-item"><button @click="galleryClick" :class="{active: isGalleryClicked}" class="nav-link">Gallery</button></li>
                    <li v-if="!isUsersProfile" class="nav-item"><button @click="mutualFriendsClick" :class="{active: isMutualFriendsClicked}" class="nav-link" >Mutual friends</button></li>
                    <li v-else-if="isUsersProfile" class="nav-item"><button @click="friendsClick" :class="{active: isFriendsListClicked}" class="nav-link" >Friends list</button></li>
                    <li v-if="isUsersProfile" class="nav-item"><button @click="editAccountClick" :class="{active: isEditAccountClicked}" class="nav-link">Edit account</button></li>
                </ul>
                <component :is="currentComponent" v-bind="currentProperties"></component>
            </div>
            <div v-else-if="!isPrivate && isLoggedIn" class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><button @click="statusesClick" role="tab" :class="{active: isStatusesClicked}" class="nav-link ">Statuses</button></li>
                    <li class="nav-item"><button @click="galleryClick" role="tab" :class="{active: isGalleryClicked}" class="nav-link">Gallery</button></li>
                    <li v-if="!isUsersProfile" class="nav-item"><button @click="mutualFriendsClick" role="tab" :class="{active: isMutualFriendsClicked}" class="nav-link" >Mutual friends</button></li>
                    <li v-else class="nav-item"><button @click="friendsClick" role="tab" :class="{active: isFriendsListClicked}" class="nav-link" >Friends list</button></li>
                    <li v-if="isUsersProfile" class="nav-item"><button @click="editAccountClick" role="tab" :class="{active: isEditAccountClicked}" class="nav-link">Edit account</button></li>
                </ul>
                <component :is="currentComponent" v-bind="currentProperties"></component>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            user: null,
            loggedInUser: null,
            newDate: null,
            currentComponent: "statuses-page",
            statusesClicked: true,
            galleryClicked: false,
            mutualFriendsClicked: false,
            friendsListClicked: false,
            editAccountClicked: false,
            hasSentFriendRequest: false,
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
            if (this.isLoggedIn) {
                return this.user.username === this.loggedInUser.username;
            }
            return false;
        },
        isAdmin() {
            return this.loggedInUser.role === "Administrator";
        },
        isStatusesClicked() {
            return this.statusesClicked;
        },
        isGalleryClicked() {
            return this.galleryClicked;
        },
        isMutualFriendsClicked() {
            return this.mutualFriendsClicked;
        },
        isFriendsListClicked() {
            return this.friendsListClicked;
        },
        isEditAccountClicked() {
            return this.editAccountClicked;
        },
        isSignedInNotFriendPrivateProfile() {
            return this.isPrivate && this.isLoggedIn && !this.isFriend;
        }
    },
    methods: {
        addFriend() {
            axios.post("/add-friend/" + this.user.username + "/", {}, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                this.getUser();
                this.hasSentFriendRequest = true;
            })
        },
        removeFriend() {
            axios.delete("/unfriend/" + this.user.username, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                this.getUser();
                this.hasSentFriendRequest = false;
            })
        },
        setParams() {
            this.currentComponent = "mutual-friends";
            this.mutualFriendsClicked = true;
            this.statusesClicked = false;
        },
        getUser() {
            this.currentComponent = "";
            this.statusesClicked = true
            this.galleryClicked = false
            this.mutualFriendsClicked = false
            this.friendsListClicked = false
            this.editAccountClicked = false
            axios.get('/get-user/' + this.$route.params.username + '/')
                .then((response) => {
                    this.user = response.data;
                    let date = JSON.stringify(new Date(response.data.dateOfBirth)).split("-");
                    this.newDate = date[2].split("T")[0] + "." + date[1] + "." + date[0].substring(1)+".";
                    if (this.isSignedInNotFriendPrivateProfile && !this.isUsersProfile) {
                        this.setParams();
                    } else {
                        this.currentComponent = "statuses-page";
                    }
                    if (this.isLoggedIn) {
                        axios.get('/has-sent-friend-request/' + this.user.username, {
                            headers: {
                                Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                            }
                        }).then((response) => {
                            this.hasSentFriendRequest = response.data;
                        })
                    }
                });
        },
        statusesClick() {
            this.currentComponent = "statuses-page";
            this.statusesClicked = true;
            this.galleryClicked = false;
            this.mutualFriendsClicked = false;
            this.friendsListClicked = false;
            this.editAccountClicked = false;
        },
        galleryClick() {
            this.currentComponent = "gallery-page";
            this.statusesClicked = false;
            this.galleryClicked = true;
            this.mutualFriendsClicked = false;
            this.friendsListClicked = false;
            this.editAccountClicked = false;
        },
        mutualFriendsClick() {
            this.currentComponent = "mutual-friends";
            this.statusesClicked = false;
            this.galleryClicked = false;
            this.mutualFriendsClicked = true;
            this.friendsListClicked = false;
            this.editAccountClicked = false;
        },
        friendsClick() {
            this.currentComponent = "friends-list";
            this.statusesClicked = false;
            this.galleryClicked = false;
            this.mutualFriendsClicked = false;
            this.friendsListClicked = true;
            this.editAccountClicked = false;
        },
        editAccountClick() {
            this.currentComponent = "edit-profile";
            this.statusesClicked = false;
            this.galleryClicked = false;
            this.mutualFriendsClicked = false;
            this.friendsListClicked = false;
            this.editAccountClicked = true;
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