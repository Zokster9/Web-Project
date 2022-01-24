Vue.component("not-found", {
    template:`
    <div class="page-wrap d-flex flex-row align-items-center" style="min-height: 100vh; background-image: linear-gradient(to bottom right, dodgerblue, aliceblue);">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">404</span>
                    <div class="mb-4 lead">The page you are looking for was not found.</div>
                    <router-link to="/#/">
                        <button role="button" type="button" class="btn btn-dark btn-lg btn-block">Return to home page</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    `
})