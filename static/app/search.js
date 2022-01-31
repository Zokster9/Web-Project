Vue.component("search-ui", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <user-search-ui v-if="true"></user-search-ui>
        <admin-search-ui v-else></admin-search-ui>
    </div>
    `,
    data() {
        return {
            date: null,
        }
    },
    methods: {
        clicked(msg){
            console.log(msg)
        },
        disabledDate(date) {
            return date.getTime() > new Date().getTime() - 24 * 3600 * 1000;
        },
    },
})

Vue.component("user-search-ui", {
    template: `
    <div class="d-flex" style="width:100%; height:100%;" >
        <div class="shadow-lg rounded" style="flex-shrink:0">
            <div style="width:300px;height:100%;">
                <form @submit.prevent style="padding:10px;padding-top:100px">
                    <div class="form-group">
                        <label for="first-name">First name</label>
                        <input id="first-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last name</label>
                        <input id="last-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label>Date of birth range</label>
                        <date-picker v-model="date" range format="D.MM.YYYY" :disabled-date="disabledDate" range-separator=" - " style="width:100%;"></date-picker>
                    </div>
                    <div class="form-group">
                        <button @click="clicked('')" type="submit" class="btn btn-primary btn-lg btn-block">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div style="width:100%;height:100%;margin:auto;margin-top:100px;">
            <div class="vertical-center">
                <div class="inner-block-search">
                    <div class="search-results d-flex flex-column align-items-center">
                        <search-result></search-result>
                        <search-result></search-result>
                        <search-result></search-result>
                        <search-result></search-result>
                        <search-result></search-result>
                        <search-result></search-result>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            date: null,
        }
    },
    methods: {
        clicked(msg){
            console.log(msg)
        },
        disabledDate(date) {
            return date.getTime() > new Date().getTime() - 24 * 3600 * 1000;
        },
    },
})

Vue.component("admin-search-ui", {
    template: `
    <div class="d-flex" style="width:100%;height:100%;">
        <div class="shadow-lg" style="flex-shrink:0">
            <div style="width:300px;height:100%;">
                <form @submit.prevent style="padding:10px;padding-top:100px">
                    <div class="form-group">
                        <label for="first-name">First name</label>
                        <input id="first-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last name</label>
                        <input id="last-name" type="text" pattern="[a-zA-Z\.]+$" class="form-control form-control-lg"/>
                    </div>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="text" class="form-control form-control-lg" />
                    </div>
                    <div class="form-group">
                        <button @click="clicked('')" type="submit" class="btn btn-primary btn-lg btn-block">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div style="width:100%;height:100%;margin:auto;margin-top:100px;">
            <div class="vertical-center">
                <div class="inner-block-search">
                    <div class="search-results d-flex flex-column align-items-center">
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                        <search-result-admin></search-result-admin>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            date: null,
        }
    },
    methods: {
        clicked(msg){
            console.log(msg)
        },
        disabledDate(date) {
            return date.getTime() > new Date().getTime() - 24 * 3600 * 1000;
        },
    },
})

Vue.component("search-result", {
    template: `
    <div class="search-result d-flex" style="width:100%;">
        <profile-picture-details></profile-picture-details>
    </div>
    `
})

Vue.component("search-result-admin", {
    template: `
    <div class="friend-request d-flex" style="width:100%;">
        <profile-picture-details></profile-picture-details>
        <div class="d-flex align-items-center justify-content-end ms-auto p-2" style="gap:10px;">
            <button type="button" class="btn btn-danger">Block</button>
        </div>
    </div>
    `
})