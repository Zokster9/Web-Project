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

// Vue.component("chat-page", {
//     components: {
//         chatSidebar: ChatSidebarComponent,
//         chatHeader: ChatHeaderComponent,
//         chatMessage: ChatMessageComponent,
//         chatInput: ChatInputComponent,
//     },
//     template: `
//     <div>
//         <main-navbar></main-navbar>
//         <div class="container" style="margin-top: 90px;">
//             <div class="row clearfix h-100">
//                 <div class="col-lg-12 h-100">
//                     <div class="card chat-app h-100">
//                         <!-- Komponenta chat sidebar -->
//                         <chat-sidebar></chat-sidebar>
//                         <div class="chat">
//                             <!-- Komponenta osobe iznad poruka -->
//                             <chat-header></chat-header>
//                             <!-- Komponenta same poruke -->
//                             <chat-message></chat-message>
//                             <!-- Komponenta polja za send -->
//                             <chat-input></chat-input>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
    
//     `
// });

Vue.component("chat-page", {
    template: `
    <div class="h-100 w-100">
        <main-navbar></main-navbar>
        <div class="d-flex flex-column align-items-center h-100 w-100">
            <div class="d-flex justify-content-center h-100 w-100">
                <div class="window d-flex" style="height:70vh; width:70vw;margin-top:150px;">
                    <div class="d-flex flex-column side-chats overflow-auto h-100 shadow rounded" style="width:20vw;gap:5px;">
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                        <chat-list-item></chat-list-item>
                    </div>
                    <div class="chat d-flex flex-column" style="width:50vw;margin-left:5px;margin-right:5px;">
                        <div class="chat-header d-flex shadow" style="gap:5px;">
                            <div class="flex-shrink-0" style="height:50px;width:50px;">
                                <profile-picture></profile-picture>
                            </div>
                            <div class="d-flex flex-column">
                                <div class="name">
                                    Teodor Sakal Franciskovic
                                </div>
                                <div class="username">
                                    @cummingtime
                                </div>
                            </div>
                        </div>
                        <div class="chat-messages overflow-auto" style="height:57vh;padding-left:10px;padding-right:10px;padding-bottom:10px;">
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                            <my-chat-message></my-chat-message>
                            <incoming-chat-message></incoming-chat-message>
                        </div>
                        <div class="d-flex">
                            <button class="btn btn-primary flex-shrink-0"><i class="fas fa-paper-plane"></i></button>
                            <input type="text" class="w-100 form-control form-control-lg"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})

Vue.component("chat-list-item", {
    template: `
    <div class="d-flex w-90 chat-list-item rounded align-items-center" style="height:60px;gap:5px;margin-left:10px;margin-right:10px;padding:10px;">                        
        <div class="flex-grow-0" style="height:50px;width:50px;">
            <profile-picture></profile-picture>
        </div>
        <div class="d-flex flex-column">
            <div class="name">
                Teodor Sakal Franciskovic
            </div>
            <div class="username">
                @cummingtime
            </div>
        </div>
    </div>
    `
})

Vue.component("my-chat-message", {
    template: `
    <div class="d-flex flex-column justify-content-end">
        <div class="d-flex justify-content-end">
            <div class="message-data-time">
                Date and time
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <div class="message my-message p-2">
                E brate
            </div>
        </div>
    </div>
    `
})

Vue.component("incoming-chat-message", {
    template:`
    <div class="d-flex flex-column justify-content-start">
        <div class="d-flex justify-content-start">
            <div class="message-data-time">
                Date and time
            </div>
        </div>
        <div class="d-flex justify-content-start">
            <div class="message incoming-message p-2">
                E brate
            </div>
        </div>
    </div>
    `

})