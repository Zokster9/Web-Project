Vue.component("friend-requests", {
    template: `
    <div>
    <main-navbar></main-navbar>

    <div style="width:100%;height:100%;margin-top:100px;">
        <div class="vertical-center">
            <div class="inner-block-requests">
                <div class="friend-requests d-flex flex-column align-items-center">
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                    <friend-request></friend-request>
                </div>
            </div>
        </div>
    </div>
    </div>
    `
})

Vue.component("friend-request", {
    template: `
    <div class="friend-request d-flex" style="width:100%;">
        <profile-picture-details></profile-picture-details>
        <div class="d-flex align-items-center justify-content-end ms-auto p-2" style="gap:10px;">
            <button type="button" class="btn btn-success">Accept</button>
            <button type="button" class="btn btn-danger">Deny</button>
        </div>
    </div>
    `
})