Vue.component("post-comments", {
    template:`
    <div class="comment-part" style="margin-left:10px; margin-right:10px;height:100%;">
        <div class="write-comment d-flex">
            <!-- Comment must have text to be posted -->
            <input type="text" rows="1" style="width:100%;height:auto;" placeholder="Write a comment..."/>
            <button type="button" class="btn btn-primary">Submit</button>
        </div>
        <div class="multiple-comments overflow-auto" style="height:100%;">
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
            <single-comment></single-comment>
        </div>
    </div>
    `
})

Vue.component("single-comment", {
    template: `
    <div class="single-comment d-flex" style="gap:5px;width:100%;max-width:30vw;margin-top:10px;">
        <div class="profile-picture" style="width:40px;height:40px;flex-shrink:0;">
            <profile-picture></profile-picture>
        </div>
        <div class="d-flex flex-column">
            <div class="username">
                @monkeybars.are.cool
            </div>
            <div class="comment-text rounded shadow-lg" style="background-color:lightblue;">
                <p class="font-weight-large fs-6">
                I eat bannanas every day and that makes me happy!!! 
                Awesome picture you got there I hope I try crack some day
                </p>
            </div>
        </div>
    </div>
    `
})