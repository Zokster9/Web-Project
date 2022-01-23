Vue.component("forgot-password-form", {
    template: `
    <div class="password">
    <login-navbar></login-navbar>
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
// new Vue({
// }).$mount("#wrapper")