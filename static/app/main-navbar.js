Vue.component("main-navbar",{
    template:`
        <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
            <!-- Napravi v-if za link na logo za guest i regularnog korisnika -->
            <router-link to="/"><img src="imgs/logo.gif" alt="Pico" class="logo navbar-brand float-left"></router-link>
            <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/"><i class="fa fa-search fa-2x"></i></router-link>
                </li>
                <li class="nav-item">
                    <div style="height:40px; width:40px; margin-top:3px;">
                        <profile-picture></profile-picture>
                    </div>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/"><i class="fa fa-user-plus fa-2x"></i></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/"><i class="fa fa-comments fa-2x"></i></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/"><i class="fa fa-sign-out fa-2x"></i></router-link>
                </li>
            </ul>
            </div>
        </nav>
    `
});

// var app = new Vue({
//     el: "#wrapper",
// })