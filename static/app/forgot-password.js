Vue.component("forgot-password-form", {
    template: `
    <div class="password gifbg">
    <login-navbar></login-navbar>
    <div class="App">
        <div class="vertical-center">
            <div class="inner-block">
                <div class="password">
                    <form  @submit.prevent>
                        <h3>Forgot Password</h3>

                        <div class="form-group">
                            <label >Email address</label>
                            <input type="email" class="form-control form-control-lg" />
                        </div>

                        <div class="form-group">
                            <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>
                        </div>
                        <div class="form-group">
                            <div class="alert alert-info">This functionality is not available at the moment. Our team is working hard on making it available ;)</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    `,
    mounted() {
        if (window.sessionStorage.getItem("user") !== null) {
            let role = JSON.parse(window.sessionStorage.getItem("user")).role;
            if (role === "Administrator")
                router.push("/search/")
            else
                router.push("/feed/")
        }
    }
});

// For testing
// new Vue({
// }).$mount("#wrapper")