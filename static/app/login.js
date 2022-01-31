Vue.use(vuelidate.default)

Vue.component("login-form", {
    template: `
    <div class="login gifbg">
    <!-- Navigation -->
    <login-navbar></login-navbar>
    <div class="App">
        <div class="vertical-center">
            <div class="inner-block">
                <div class="login">
                    <form @submit.prevent>
                        <h3>Sign In</h3>

                        <div class="form-group">
                            <label>Username</label>
                            <input v-model="form.username" @focus="inFocus('username')" @blur="outFocus('username')" type="text" pattern="[a-zA-Z0-9\.]+$" class="form-control form-control-lg"/>
                            <div v-show="!isFocused('username') && $v.form.username.$invalid" class="alert alert-danger">Username is required.</div>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="form.password" @focus="inFocus('password')" @blur="outFocus('password')" type="password" class="form-control form-control-lg" />
                            <div v-show="!isFocused('password') && $v.form.password.$invalid" class="alert alert-danger">Password field must be filled.</div>
                        </div>

                        <div class="form-group">
                            <button :disabled="$v.form.$invalid" type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
                        </div>

                        <div class="form-group">
                            <router-link to="/search">
                                <button role="button" type="button" class="btn btn-outline-primary btn-lg btn-block">Sign in as guest</button>
                            </router-link>
                        </div>
 
                        <p class="forgot-password text-right mt-2 mb-4">
                            <router-link to="/forgot-password">Forgot password?</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    `,

    data () {
        return {
            form:{
                username: "",
                password: ""
            },
            infocus:{
                username: true,
                password: true
            }
        }
    },

    methods: {
        isFocused(field){
            return this.infocus[field]
        },
        inFocus(field){
            this.infocus[field] = true
        },
        outFocus(field){
            this.infocus[field] = false
        }
    },

    validations: {
        form:{
            username : {
                required: validators.required,
                minLength: validators.minLength(4),
                maxLength: validators.maxLength(20)
            },
            password: {
                required: validators.required,
                minLength: validators.minLength(1)
            }
        }
    }
});

// For testing
// new Vue({
//     el: "#wrapper"
// });