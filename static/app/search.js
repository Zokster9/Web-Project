Vue.component("search-ui", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <user-search-ui v-if="role !== 'Administrator'"></user-search-ui>
        <admin-search-ui v-else></admin-search-ui>
    </div>
    `,
    data(){
        return{
            role:null,
        }
    },
    mounted() {
        if (window.sessionStorage.getItem("user") !== null) {
            this.role = JSON.parse(window.sessionStorage.getItem("user")).role;
        }
    }
});

Vue.component("user-search-ui", {
    template: `
    <div class="d-flex" style="width:100%; height:100%;" >
        <div class="shadow-lg rounded" style="flex-shrink:0">
            <div style="width:300px;height:100%;">
                <form @submit.prevent style="padding:10px;padding-top:100px">
                    <div class="form-group">
                        <label for="first-name">First name</label>
                        <input v-model="form.firstName" id="first-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last name</label>
                        <input v-model="form.lastName" id="last-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label>Date of birth range</label>
                        <date-picker v-model="form.dateRange" range format="D.MM.YYYY" :disabled-date="disabledDate" range-separator=" - " style="width:100%;"></date-picker>
                    </div>
                    <div class="form-group">
                        <button @click="search" type="submit" class="btn btn-primary btn-lg btn-block">Search</button>
                    </div>
                    <div class="form-group">
                        <label>Sort by</label>
                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                          <input type="radio" class="btn-check" id="btnradio1" autocomplete="off" value="name" v-model="sortBy" checked>
                          <label class="btn btn-outline-primary" for="btnradio1">Name</label>
                        
                          <input type="radio" class="btn-check" id="btnradio2" autocomplete="off" value="surname" v-model="sortBy">
                          <label class="btn btn-outline-primary" for="btnradio2">Surname</label>
                        
                          <input type="radio" class="btn-check" id="btnradio3" autocomplete="off" value="dateOfBirth" v-model="sortBy">
                          <label class="btn btn-outline-primary" for="btnradio3">Date of birth</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div style="width:100%;height:100%;margin:auto;margin-top:100px;">
            <div class="vertical-center">
                <div class="inner-block-search">
                    <div class="search-results d-flex flex-column align-items-center">
                        <search-result v-for="result in orderedResults" :user="result" :key="result.username"></search-result>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            sortBy: "name",
            results: null,
            form: {
                firstName: "",
                lastName:"",
                dateRange: null
            }
        }
    },
    methods: {
        disabledDate(date) {
            return date.getTime() > new Date().getTime() - 24 * 3600 * 1000;
        },
        search() {
            let username = null;
            if (window.sessionStorage.getItem("user") !== null) {
                username = JSON.parse(window.sessionStorage.getItem("user")).username
            }
            let date = null;
            if (this.form.dateRange !== null && !this.form.dateRange.every(x => x === null)){
                date = JSON.stringify([this.form.dateRange[0].getTime(), this.form.dateRange[1].getTime()]);
            }
            axios.get("/search/", {
                params: {
                    username: username,
                    name: this.form.firstName,
                    surname: this.form.lastName,
                    dateRange: date,
                    }
            }).then((response) => {
                this.results = response.data;
                router.push( {path: "/search/",
                    query: {name: this.form.firstName, surname: this.form.lastName, dateRange: this.form.dateRange}})
            })
        }
    },
    computed: {
        orderedResults: function () {
            return _.orderBy(this.results, this.sortBy)
        }
    },
    mounted() {
        let username = null;
        if (window.sessionStorage.getItem("user") !== null) {
            username = JSON.parse(window.sessionStorage.getItem("user")).username
        }
        axios.get("/search/", {
            params: {
                username: username,
                name: this.form.firstName,
                surname: this.form.lastName,
                dateRange: this.form.dateRange,
            }
        }).then((response) => {
            this.results = response.data;
        })
    }
});

Vue.component("search-result", {
    props: ["user"],
    template: `
    <div class="search-result d-flex align-items-center" style="width:100%;gap:10px">
        <profile-picture-details :user="user"></profile-picture-details>
        <div class="ms-auto fw-normal" v-if="date">
            {{date}}
        </div>
    </div>
    `,
    data(){
        return {
            date: null,
        }
    },
    mounted() {
        let date = JSON.stringify(new Date(this.user.dateOfBirth)).split("-");
        this.date = date[2].split("T")[0] + "." + date[1] + "." + date[0].substring(1)+".";
    }
})

Vue.component("admin-search-ui", {
    template: `
    <div class="d-flex" style="width:100%;height:100%;">
        <div class="shadow-lg" style="flex-shrink:0">
            <div style="width:300px;height:100%;">
                <form @submit.prevent style="padding:10px;padding-top:100px">
                    <div class="form-group">
                        <label for="first-name">First name</label>
                        <input v-model="form.firstName" id="first-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last name</label>
                        <input v-model="form.lastName" id="last-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label>Email address</label>
                        <input v-model="form.email" type="text" class="form-control form-control-lg" />
                    </div>
                    <div class="form-group">
                        <button @click="search" type="submit" class="btn btn-primary btn-lg btn-block">Search</button>
                    </div>
                    <div class="form-group">
                        <label>Sort by</label>
                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                          <input type="radio" class="btn-check" id="btnradio1" autocomplete="off" value="name" v-model="sortBy" checked>
                          <label class="btn btn-outline-primary" for="btnradio1">Name</label>
                        
                          <input type="radio" class="btn-check" id="btnradio2" autocomplete="off" value="surname" v-model="sortBy">
                          <label class="btn btn-outline-primary" for="btnradio2">Surname</label>
                        
                          <input type="radio" class="btn-check" id="btnradio3" autocomplete="off" value="dateOfBirth" v-model="sortBy">
                          <label class="btn btn-outline-primary" for="btnradio3">Date of birth</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div style="width:100%;height:100%;margin:auto;margin-top:100px;">
            <div class="vertical-center">
                <div class="inner-block-search">
                    <div class="search-results d-flex flex-column align-items-center">
                        <search-result-admin v-for="result in orderedResults" :user="result" :key="result.username"></search-result-admin>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            sortBy: "name",
            results: null,
            form: {
                firstName: "",
                lastName:"",
                email: "",
            }
        }
    },
    methods: {
        search() {
            let username = null;
            if (window.sessionStorage.getItem("user") !== null) {
                username = JSON.parse(window.sessionStorage.getItem("user")).username
            }
            axios.get("/search/", {
                params: {
                    username: username,
                    name: this.form.firstName,
                    surname: this.form.lastName,
                    email: this.form.email,
                }
            }).then((response) => {
                this.results = response.data;
                router.push( {path: "/search/",
                    query: {name: this.form.firstName, surname: this.form.lastName, email: this.form.email}})
            })
        }
    },
    computed: {
        orderedResults: function () {
            return _.orderBy(this.results, this.sortBy)
        }
    },
    mounted() {
        let username = null;
        if (window.sessionStorage.getItem("user") !== null) {
            username = JSON.parse(window.sessionStorage.getItem("user")).username
        }
        axios.get("/search/", {
            params: {
                username: username,
                name: this.form.firstName,
                surname: this.form.lastName,
                email: this.form.email,
            }
        }).then((response) => {
            this.results = response.data;
        })
    }
})


Vue.component("search-result-admin", {
    props: ["user"],
    template: `
    <div class="friend-request d-flex" style="width:100%;">
        <profile-picture-details :user="user"></profile-picture-details>
        <div class="d-flex align-items-center justify-content-end ms-auto p-2" style="gap:10px;">
            <button v-show="!user.isBlocked" @click="changeBlock" type="button" class="btn btn-danger">Block</button>
            <button v-show="user.isBlocked" @click="changeBlock" type="button" class="btn btn-warning">Unblock</button>
        </div>
    </div>
    `,
    methods: {
        changeBlock() {
            axios.put("/block-unblock/" + this.user.username +"/", {
            }).then((response) => {
                    this.user.isBlocked = !this.user.isBlocked;
                })
        }
    }
})