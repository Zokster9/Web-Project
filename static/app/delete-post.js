Vue.use(vuelidate.default)

Vue.component("delete-post", {
    template:`
    <div style="width:100%;height:100%;">
        <main-navbar></main-navbar>
        <div class="App">
            <div class="vertical-center">
                <div class="inner-block">
                    <div class="delete-post">
                        <form @submit.prevent>
                            <div class="form-group">
                                <label>Deletetion reason</label>
                                <textarea v-model="form.text" @focus="inFocus('text')" @blur="outFocus('text')" rows="6" class="form-control"/>
                                <div v-show="!isFocused('text') && $v.form.username.$invalid" class="alert alert-danger">Username is required.</div>
                            </div>
                            <div class="form-group">
                                <button @click="deletePost" class="btn btn-primary" :disabled="$v.form.$invalid">Delete post</button>
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
            user: null,
            form:{
                text: "",
            },
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
        deletePost(){
            axios.delete("/delete-post/"+this.$route.params.id+"/", {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem("user")).JWTToken,
                },
                params: {
                    message: this.form.text,
                }
            }).then(response => {
                alert("Post succesffuly deleted")
                router.push("/search")
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
    },
    mounted() {
        if (window.sessionStorage.getItem("user") !== null){
            if (JSON.parse(window.sessionStorage.getItem("user")).role === 'User'){
                router.push("/feed")
                return;
            }
        } else {
            router.push("/search")
            return;
        }
    },
})