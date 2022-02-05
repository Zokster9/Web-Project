Vue.use(vuelidate.default)

Vue.component("create-status", {
    template:`
    <div  style="width:100%;height:100%;">
        <main-navbar></main-navbar>
        <div class="App">
            <div class="vertical-center">
                <div class="inner-block">
                    <div class="create-status">
                        <form @submit.prevent>
                            <div class="form-group">
                                <label>Status text</label>
                                <textarea v-model="form.text" @focus="inFocus('text')" @blur="outFocus('text')" rows="10" class="form-control"/>
                                
                            </div>
                            <div class="form-group">
                                <label for="formFileLg" class="form-label">Status photo</label>
                                <input class="form-control form-control-lg" accept="image/*" type="file" @change="processFile($event)">
                            </div>
                            <div class="form-group">
                                <button @click="addStatus" class="btn btn-primary" :disabled="$v.form.$invalid">Post status</button>
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
            },
            picture:null,
            infocus: {
                text: true,
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
        processFile(event) {
            this.picture = event.target.files[0].name
        },
        addStatus(){
            let picture = "";
            if (this.picture !== null) {
                picture = this.picture
            }
            axios.post("/add-status/", {
                text: this.form.text,
                picture: picture,
            },{
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                }
            }).then(response => {
                router.push("/feed/")
            })
        }
    },

    validations:{
        form:{
            text : {
                required: validators.required,
                minLength: validators.minLength(1),
                maxLength: validators.maxLength(200)
            },
        }
    }  
})