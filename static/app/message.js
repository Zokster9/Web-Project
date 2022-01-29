let ChatSidebarComponent = Vue.component("chat-sidebar", {
    template: `
    <div id="plist" class="people-list">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Search...">
        </div>
        <ul class="list-unstyled chat-list mt-2 mb-0">
            <li class="clearfix">
                <img src="imgs/sss.jpg" alt="avatar">
                <div class="about">
                    <div class="name">Aiden Chavez</div>                                           
                </div>
            </li>
        </ul>
    </div>
    `
});

let ChatHeaderComponent = Vue.component("chat-header", {
    template: `
    <div class="chat-header clearfix">
        <div class="row">
            <div class="col-lg-6">
                <!-- bice komponenta prof slike -->
                <div class="chat-about">
                    <router-link to="profile/:id"><h6 class="m-b-0">Aiden Chavez</h6></router-link>
                </div>
            </div>
        </div>
    </div>
    `
});

let ChatMessageComponent = Vue.component("chat-message", {
    template: `
    <div class="chat-history">
        <ul class="m-b-3">
            <li class="clearfix">
                <div class="message-data text-right">
                    <span class="message-data-time text-right">10:09 AM, Today</p>
                </div>
                <div class="message other-message float-right"> Majmubneeasdfasd </div>
            </li>
            <li class="clearfix">
                <div class="message-data text-center">
                    <span class="message-data-time text-center">10:10 AM, Today</p>
                </div>
                <div class="message other-message float-right"> Gde si baki </div>
            </li>
            <li class="clearfix">
                <div class="message-data">
                    <span class="message-data-time">10:12 AM, Today</span>
                </div>
                <div class="message my-message">Are we meeting today?</div>                                    
            </li> 
        </ul>
    </div>
    `
});

let ChatInputComponent = Vue.component("chat-input", {
    template: `
    <div class="chat-message clearfix">
        <div class="input-group mb-0">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-send"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Enter text here...">                                    
        </div>
    </div>
    `
});

Vue.component("chat-page", {
    components: {
        chatSidebar: ChatSidebarComponent,
        chatHeader: ChatHeaderComponent,
        chatMessage: ChatMessageComponent,
        chatInput: ChatInputComponent,
    },
    template: `
    <div class="container">
        <div class="row clearfix">
            <div class="col-lg-12">
                <div class="card chat-app">
                    <!-- Komponenta chat sidebar -->
                    <chat-sidebar></chat-sidebar>
                    <div class="chat">
                        <!-- Komponenta osobe iznad poruka -->
                        <chat-header></chat-header>
                        <!-- Komponenta same poruke -->
                        <chat-message></chat-message>
                        <!-- Komponenta polja za send -->
                        <chat-input></chat-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
});

// var app = new Vue({
//     el: "#wrapper",
// })