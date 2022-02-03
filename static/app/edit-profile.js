Vue.component("edit-profile", {
    props: ["user"],
    template: `
    <div class="App">
        <div class="vertical-center">
            <div class="inner-block my-4">
                <div class="edit-profile">
                    <form @submit.prevent>
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
                            <div v-show="!isFocused('email') && $v.form.email.$invalid" class="alert alert-danger">Incorrect format</div>
                        </div>

                        <div class="form-group">
                            <label>Date of birth</label>
                            <date-picker v-model="form.date" format="D.MM.YYYY" :disabled-date="disabledDate" style="width:100%;"></date-picker>
                        </div>

                        <div class="form-group">
                            <label>Current Password</label>
                            <input v-model="form.currentPassword" @focus="inFocus('currentPassword')" @blur="outFocus('currentPassword')" type="password" class="form-control form-control-lg"/>
                            <div v-show="!isFocused('currentPassword') && $v.form.currentPassword.$invalid" class="alert alert-danger">Password is required. Min. 4 characters.</div>
                        </div>

                        <div class="form-group">
                            <label>New Password</label>
                                <input v-model="form.password" @focus="inFocus('password')" @blur="outFocus('password')" type="password" class="form-control form-control-lg"/>
                            <div v-show="!isFocused('password') && $v.form.password.$invalid" class="alert alert-danger">Password is required. Min. 4 characters.</div>
                        </div>

                        <div class="form-group">
                            <label>Confirm password</label>
                            <input v-model="form.confirmPassword" @focus="inFocus('confirmPassword')" @blur="outFocus('confirmPassword')" type="password" class="form-control form-control-lg" />
                            <div v-show="!isFocused('confirmPassword') && $v.form.confirmPassword.$invalid" class="alert alert-danger">Passwords don't match.</div>
                        </div>

                        <div class="form-group">
                            <button @click="clicked('')" :disabled="$v.form.$invalid" type="submit" class="btn btn-dark btn-lg btn-block">Edit profile</button>
                        </div>

                        <div v-if="!user.isPrivate" class="form-group">
                            <button @click="clicked('private')" :disabled="$v.form.$invalid" type="submit" class="btn btn-primary btn-lg btn-block">Make profile private</button>
                        </div>
                        <div v-else class="form-group">
                            <button @click="clicked('public')" :disabled="$v.form.$invalid" type="submit" class="btn btn-primary btn-lg btn-block">Make profile public</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            form:{
                firstName: "",
                lastName: "",
                email : "",
                date: null,
                currentPassword : "",
                password : "",
                confirmPassword : "",
            },
            infocus:{
                firstName: true,
                lastName: true,
                email : true,
                currentPassword : true,
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
        disabledDate(date) {
            return date.getTime() > new Date().getTime() - 24 * 3600 * 1000;
        },
    },
    mounted() {
        this.form.firstName = this.user.name;
        this.form.lastName = this.user.surname;
        this.form.email = this.user.email;
        this.form.date = this.user.dateOfBirth;
    },
    validations:{
        form:{
            firstName : {
                minLength: validators.minLength(1),
                maxLength: validators.maxLength(30)
            },
            lastName : {
                minLength : validators.minLength(1),
                maxLength: validators.maxLength(30)
            },
            email : {
                email : validators.email,
                maxLength: validators.maxLength(50)
            },
            currentPassword : {
                minLength : validators.minLength(4),
                maxLength : validators.maxLength(30)
            },
            password : {
                minLength : validators.minLength(4),
                maxLength : validators.maxLength(30)
            },
            confirmPassword : {
                sameAsPassword : validators.sameAs('password')
            }
        }
    }
})