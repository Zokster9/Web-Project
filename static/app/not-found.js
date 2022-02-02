Vue.component("not-found", {
    template:`
    <div class="page-wrap d-flex flex-row align-items-center" style="min-height: 100vh; background-image: linear-gradient(to bottom right, dodgerblue, aliceblue);">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">404</span>
                    <div class="mb-4 lead">The page you are looking for was not found.</div>
                    <router-link v-if="role === 'Administrator'" class="btn btn-dark btn-lg btn-block" exact to="/search">Return to search page</router-link>
                    <router-link v-else-if="role === 'User'" class="btn btn-dark btn-lg btn-block" exact to="/feed">Return to main page</router-link>
                    <router-link v-else class="btn btn-dark btn-lg btn-block" exact to="/login">Return to login</router-link>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return{
            role: null,
        }
    },

    mounted() {
        if (window.sessionStorage.getItem("user") !== null) {
            this.role = JSON.parse(window.sessionStorage.getItem("user")).role;
        }
    }
})