Vue.component("main-navbar", {
    template:`
        <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
            <router-link v-if="role==='Administrator'" to="/search/"><img src="imgs/logo.gif" alt="Pico" class="logo navbar-brand float-left"></router-link>
            <router-link v-else-if="role==='User'" to="/feed"><img src="imgs/logo.gif" alt="Pico" class="logo navbar-brand float-left"></router-link>
            <router-link v-else to="/"><img src="imgs/logo.gif" alt="Pico" class="logo navbar-brand float-left"></router-link>
            <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/search"><i class="fas fa-search fa-2x"></i></router-link>
                </li>
                <li  v-if="role==='User'" class="nav-item">
                    <div style="height:40px; width:40px; margin-top:3px;">
                        <profile-picture :username="username" :profilePicture="profilePicture"></profile-picture>
                    </div>
                </li>
                <li v-if="role==='User'" class="nav-item">
                    <router-link class="nav-link pr-3" to="/friend-request/"><i class="fas fa-user-plus fa-2x"></i></router-link>
                </li>
                <li v-if="username" class="nav-item">
                    <router-link class="nav-link pr-3" to="/messages/"><i class="fab fa-facebook-messenger fa-2x"></i></router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="username" event exact to="/login" @click.native="signOut" class="nav-link pr-3"><i class="fas fa-sign-out-alt fa-2x"></i></router-link>
                    <router-link v-else exact to="/login" class="nav-link pr-3"><i class="fas fa-sign-in-alt fa-2x"></i></router-link>
                </li>
            </ul>
            </div>
        </nav>
    `,
    data() {
        return {
            username: null,
            profilePicture: null,
            role: null,
        }
    },

    methods: {
        signOut() {
            window.sessionStorage.removeItem("user");
            router.push("/login")
        }
    },
    mounted() {
        if (window.sessionStorage.getItem("user") !== null) {
            this.username = JSON.parse(window.sessionStorage.getItem("user")).username;
            this.profilePicture = JSON.parse(window.sessionStorage.getItem("user")).profilePicture;
            this.role = JSON.parse(window.sessionStorage.getItem("user")).role;
        }
    }
});

// var app = new Vue({
//     el: "#wrapper",
// })