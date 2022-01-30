Vue.component("profile-page", {
    template: `
    <div>
        <main-navbar></main-navbar>
        <div style="margin-top: 80px">
            <div class="d-flex justify-content-center align-items-center" style="height:150px; width:150px; margin:auto;">
                <profile-picture></profile-picture>
            </div>
            <div class="d-flex justify-content-center flex-column align-items-center mt-3">
                <h2>Majmunko Majmunic</h2>
                <h4>@Majmun.Majmun</h4>
                <h5>20.10.2022.</h5>
            </div>
            <div class="d-flex justify-content-center align-items-center" style="gap: 25px;">
                <button class="btn" id="request"><i class="fas fa-user-plus"></i> Send friend request</button>
                <router-link class="btn" to="/"><i class="fab fa-facebook-messenger"></i> Send message</router-link>
            </div>
            <div class="mt-4">
                <ul class="nav nav-tabs nav-justified mx-auto" style="max-width: 900px;">
                    <li class="nav-item"><router-link class="nav-link active" to="/">Status</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/">Gallery</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/">Common friends</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/">Edit account</router-link></li>
                </ul>
            </div>
        </div>
    </div>
    `
})