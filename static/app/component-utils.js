Vue.component("profile-picture", {
    props: ["profilePicture", "username", "loggedUser"],
    template:`
    <div style="width:100%;height:100%;">
        <router-link v-if="loggedUser && loggedUser.username === username" to="/change-profile-picture">
            <img :src="'imgs/'+profilePicture" class="profile-pic">
        </router-link>
        <router-link v-else exact :to="'/profile/'+username">
            <img :src="'imgs/'+profilePicture" class="profile-pic">
        </router-link>
    </div>
    `
})

Vue.component("profile-picture-details", {
    props: ["user"],
    template: `
    <div style="display:flex;gap:10px;padding:15px">
        <div style="width:70px;height:70px;">
            <profile-picture :username="user.username" :profilePicture="user.profilePicture"></profile-picture>
        </div>
        <div style="border-radius:15px;width:auto;height:60px;padding-left:10px;padding-right:10px;">
            <router-link exact :to="'/profile/'+user.username" class="profile-details font-weight-large fs-5 text-left" style="text-decoration:none;color:black;">{{user.name + " " + user.surname}}</router-link><br>
            <router-link exact :to="'/profile/'+user.username" class="profile-details font-weight-light" style="text-decoration:none;color:black;">{{user.username}}</router-link>    
        </div>
    </div>
    `
})