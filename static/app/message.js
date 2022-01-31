

let ChatSidebarComponent = Vue.component("chat-sidebar", {
    template: `
    <div id="plist" class="people-list">
        <ul class="list-unstyled chat-list mb-4">
            <li class="clearfix d-flex align-items-start mb-3">
                <div class="flex-grow-0">
                    <profile-picture></profile-picture>
                </div>
                <div class="name">Teodor Sakal Franciskovic</div>
            </li>
            <li class="clearfix d-flex align-items-start mb-3">
                <div class="flex-grow-0">
                    <profile-picture></profile-picture>
                </div>
                <div class="name">Nikola Damjanovic</div>
            </li>
            <li class="clearfix d-flex align-items-start mb-3">
                <div class="flex-grow-0">
                    <profile-picture></profile-picture>
                </div>
                <div class="name">Matija Zaric</div>
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
                <div class="d-flex chat-about align-items-center">
                    <profile-picture></profile-picture>
                    <router-link to="profile/:id" tag="h5" class="m-b-0 mt-1 ms-3 flex-shrink-0">Aiden Chavez</router-link>
                </div>
            </div>
        </div>
    </div>
    `
});

let ChatMessageComponent = Vue.component("chat-message", {
    template: `
    <div class="chat-history overflow-auto m-b-3" style="height: 50vh;">
        <div class="clearfix">
            <div class="message-data text-center">
                <div class="message-data-time">10:09 AM, Today</div>
            </div>
            <div class="message my-message float-right">Majmubneeasdfasd</div>
            
            <div class="message-data text-center">
                <div class="message-data-time">10:09 AM, Today</div>
            </div>
            <div class="message other-message float-right">Ide gas</div>
            
            <div class="message-data text-center">
                <div class="message-data-time">10:09 AM, Today</div>
            </div>
            <div class="message my-message float-right">Napusi se</div>
        </div>
                
<!--        <ul class="m-b-3">-->
<!--            <li class="clearfix">-->
<!--                <div class="message-data text-center">-->
<!--                    <div class="message-data-time">10:09 AM, Today</div>-->
<!--                </div>-->
<!--                <div class="message my-message float-right"> Majmubneeasdfasd </div>-->
<!--            </li>-->
<!--        </ul>-->
    </div>
    `
});

let ChatInputComponent = Vue.component("chat-input", {
    template: `
    <div class="chat-message clearfix">
        <div class="input-group mb-0">
            <div class="d-flex input-group-prepend">
                <span class="input-group-text"><i class="fas fa-paper-plane"></i></span>
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
    <div>
        <main-navbar></main-navbar>
        <div class="container" style="margin-top: 90px;">
            <div class="row clearfix h-100">
                <div class="col-lg-12 h-100">
                    <div class="card chat-app h-100">
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
    </div>
    
    `
});