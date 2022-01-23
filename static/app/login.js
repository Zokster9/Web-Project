Vue.use(vuelidate.default)

Vue.component("login-form", {
    template: `
    <div class="login">
    <!-- Navigation -->
    <login-navbar></login-navbar>
    <div class="App">
        <div class="vertical-center">
            <div class="inner-block">
                <div class="login">
                    <form>
                        <h3>Sign In</h3>

                        <div class="form-group">
                            <label>Email address</label>
                            <input v-model="form.email" @focus="inFocus('email')" @blur="outFocus('email')" type="email" class="form-control form-control-lg" />
                            <div v-show="!isFocused('email') && $v.form.email.$invalid" class="alert alert-danger">Email field must match email format.</div>
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
                email: "",
                password: ""
            },
            infocus:{
                email: true,
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
            email: {
                required: validators.required,
                email: validators.email
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