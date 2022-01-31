
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