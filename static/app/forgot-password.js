Vue.component("forgot-password-form", {
    template: `
    <div class="password">
    <!-- Navigation -->
        <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
            <a class="navbar-brand float-left" href="https://www.positronx.io" target="_blank">
                Pissy Yonky
            </a>
            <ul class="nav navbar-nav flex-row float-right">
                <li class="nav-item">
                    <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
                </li>
            </ul>
            </div>
        </nav>
    <div class="App">
        <div class="vertical-center">
            <div class="inner-block">
                <div class="password">
                    <form>
                        <h3>Forgot Password</h3>

                        <div class="form-group">
                            <label >Email address</label>
                            <input type="email" class="form-control form-control-lg" />
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    `
});

// For testing
new Vue({
}).$mount("#wrapper")