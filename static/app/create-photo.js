Vue.use(vuelidate.default)

Vue.component("create-photo", {
    template:`
    <div  style="width:100%;height:100%;">
        <main-navbar></main-navbar>
        <div class="App">
            <div class="vertical-center">
                <div class="inner-block">
                    <div class="create-photo">
                        <form @submit.prevent>
                            <div class="form-group">
                                <label for="formFileLg" class="form-label">Photo</label>
                                <input class="form-control form-control-lg" accept="image/*" type="file" @change="processFile($event)">
                            </div>
                            <div class="form-group">
                                <label>Caption</label>
                                <textarea v-model="form.text" rows="5" class="form-control"/>
                            </div>
                            
                            <div class="form-group">
                                <button class="btn btn-primary" @click="addPhoto" :disabled="$v.form.$invalid">Post photo</button>
                            </div>
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
                text: "",
                picture: null,
            },
            username: JSON.parse(window.sessionStorage.getItem("user")).username
        }
    },
    methods: {
        processFile(event) {
            this.form.picture = event.target.files[0].name
        },
        addPhoto(){
            axios.post("/add-photo/", {
                text: this.form.text,
                picture: this.form.picture,
            },{
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                router.push("/profile/"+this.username)
                return;
            })
        }
    },

    validations:{
        form:{
            picture: {
                required: validators.required,
            },
            text : {
                maxLength: validators.maxLength(150)
            },
        }
    }

})