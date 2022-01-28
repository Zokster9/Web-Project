Vue.component("profile-picture", {
    template:`
    <div style="width:100%;height:100%;">
        <router-link to="/profil">
            <img src="imgs/favicon.ico" class="profile-pic">
        </router-link>
    </div>
    `
})

Vue.component("profile-picture-details", {
    template: `
    <div style="display:flex;gap:10px;padding:15px">
        <div style="width:70px;height:70px;">
            <profile-picture></profile-picture>
        </div>
        <div style="border-radius:15px;width:auto;height:60px;padding-left:10px;padding-right:10px;">
            <router-link to="kurcina" class="font-weight-large fs-5 text-left" style="text-decoration:none;color:black;">Nikola Tesletina</router-link><br>
            <router-link to="kiturina" class="font-weight-light" style="text-decoration:none;color:black;">@yummy.cummy.in.my.tummy</router-link>    
        </div>
    </div>
    `
})