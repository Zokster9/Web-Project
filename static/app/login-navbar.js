Vue.component("login-navbar",{
    template:`
        <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
            <router-link exact to="/login"><img src="imgs/logo.gif" alt="Pico" class="logo navbar-brand float-left"></router-link>
            <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3" exact to="/login">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-primary" exact to="/signup">Sign up</router-link>
                </li>
            </ul>
            </div>
        </nav>
    `
})