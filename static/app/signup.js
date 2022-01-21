Vue.component("signup-form", {
    template: `
    <div class="signup">
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
                    <div class="signup-form">
                        <form>
                            <h3>Sign Up</h3>

                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control form-control-lg"/>
                            </div>

                            <div class="form-group">
                                <table>
                                <tr>
                                <td>
                                <label for="first-name">First name</label>
                                <input id="first-name" type="text" class="form-control form-control-lg"/>
                                </td>
                                <td>
                                <label for="last-name">Last name</label>
                                <input id="last-name" type="text" class="form-control form-control-lg"/>
                                </td>
                                </tr>
                                </table>
                            </div>

                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" class="form-control form-control-lg" />
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control form-control-lg" />
                            </div>

                            <div class="form-group">
                                <label>Repeat password</label>
                                <input type="password" class="form-control form-control-lg" />
                            </div>

                            <div class="form-group">
                                <label>Gender</label><br
                                <select class="form-select form-select-lg mb-3">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
                            </div>

                            <p class="forgot-password text-right">
                                Already registered 
                                <router-link :to="{name: 'login'}">sign in?</router-link>
                            </p>
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