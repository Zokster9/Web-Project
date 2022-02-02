Vue.use(vuelidate.default)

Vue.component("signup-form", {
    template: `
    <div class="signup gifbg">
    <!-- Navigation -->
        <login-navbar></login-navbar>
        <div class="App">
            <div class="vertical-center">
                <div class="inner-block">
                    <div class="signup">
                        <form @submit.prevent>
                            <h3>Sign Up</h3>

                            <div class="form-group">
                                <label>Username</label>
                                <input v-model="form.username" @focus="inFocus('username')" @blur="outFocus('username')" type="text" pattern="[a-zA-Z0-9\.]+$" class="form-control form-control-lg"/>
                                <div v-show="!isFocused('username') && $v.form.username.$invalid" class="alert alert-danger">Username is required. Min. 4 characters.</div>
                            </div>

                            <div class="form-group">
                                <table>
                                <tr>
                                <td>
                                <label for="first-name">First name</label>
                                <input v-model="form.firstName" @focus="inFocus('firstName')" @blur="outFocus('firstName')" id="first-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                                <div v-show="!isFocused('firstName') && $v.form.firstName.$invalid" class="alert alert-danger">First name is required</div>
                                </td>
                                <td>
                                <label for="last-name">Last name</label>
                                <input v-model="form.lastName" @focus="inFocus('lastName')" @blur="outFocus('lastName')" id="last-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                                <div v-show="!isFocused('lastName') && $v.form.lastName.$invalid" class="alert alert-danger">Last name is required</div>
                                </td>
                                </tr>
                                </table>
                            </div>

                            <div class="form-group">
                                <label>Email address</label>
                                <input v-model="form.email" @focus="inFocus('email')" @blur="outFocus('email')" type="email" class="form-control form-control-lg" />
                                <div v-show="!isFocused('email') && $v.form.email.$invalid" class="alert alert-danger">Email is required</div>
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input v-model="form.password" @focus="inFocus('password')" @blur="outFocus('password')" type="password" class="form-control form-control-lg"/>
                                <div v-show="!isFocused('password') && $v.form.password.$invalid" class="alert alert-danger">Password is required. Min. 4 characters.</div>
                            </div>

                            <div class="form-group">
                                <label>Confirm password</label>
                                <input v-model="form.confirmPassword" @focus="inFocus('confirmPassword')" @blur="outFocus('confirmPassword')" type="password" class="form-control form-control-lg" />
                                <div v-show="!isFocused('confirmPassword') && $v.form.confirmPassword.$invalid" class="alert alert-danger">Passwords don't match.</div>
                            </div>

                            <div class="form-group">
                                <label>Gender</label><br>
                                <select class="form-select form-select-lg mb-3">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <button @click="register" @ :disabled="$v.form.$invalid" type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
                            </div>

                            <p class="forgot-password text-right">
                                Already registered 
                                <router-link to="/login">sign in?</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            form:{
                username: "",
                firstName: "",
                lastName: "",
                email : "",
                password : "",
                confirmPassword : "",
            },
            infocus:{
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                confirmPassword: true,
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
        },
        clicked(msg){
            console.log(msg)
        },
        register(){
            axios.post("/signup/", {
                username: this.form.username,
                password: this.form.password,
                email: this.form.email,
                name: this.form.firstName,
                surname: this.form.lastName,
            }).then(function(response) {
                router.push("/login/")
            }).catch(function(error) {
                alert("Username or email already taken!");
                console.log("Ne ide brt");
            });
        }
    },

    validations:{
        form:{
            username : {
                required: validators.required,
                minLength: validators.minLength(4),
                maxLength: validators.maxLength(20)
            },
            firstName : {
                required : validators.required,
                minLength: validators.minLength(1),
                maxLength: validators.maxLength(30)
            },
            lastName : {
                required : validators.required,
                minLength : validators.minLength(1),
                maxLength: validators.maxLength(30)
            },
            email : {
                required : validators.required,
                email : validators.email,
                maxLength: validators.maxLength(50)
            },
            password : {
                required : validators.required,
                minLength : validators.minLength(4),
                maxLength : validators.maxLength(30)
            },
            confirmPassword : {
                required : validators.required,
                sameAsPassword : validators.sameAs('password')
            }
        }
    },

    mounted() {
        if (window.sessionStorage.getItem("user") !== null) {
            let role = JSON.parse(window.sessionStorage.getItem("user")).role;
            if (role === "Administrator")
                router.push("/feed/")
            else
                router.push("/search/")
        }
    }
});


// For testing
// new Vue({
// }).$mount("#wrapper")