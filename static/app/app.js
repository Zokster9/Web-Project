const NotFoundComponent = { template: "<not-found></not-found>"};

const LoginForm = { template: "<login-form></login-form>" };
const SignUpForm = { template: "<signup-form></signup-form>"};
const ForgotPassword = { template : "<forgot-password-form></forgot-password-form>" };
const ChatPage = { template: "<chat-page></chat-page>" };
const Status = {template: "<status-ui></status-ui>"};
const Feed = {template: "<feed-page></feed-page>"};
const Profile = { template: "<profile-page></profile-page>" };
const Post  = { template: "<post-ui></post-ui>"}


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: "/", component: Profile },
        { path: "/login/", component: LoginForm},
        { path: "/signup/", component: SignUpForm},
        { path: "/forgot-password/", component: ForgotPassword },
        { path: "/feed/", component: Feed},
        { path: "/post/",  component: Post},
        { path: "/chat/", component: ChatPage},


        { path: '*', component: NotFoundComponent },
    ]
});

var app = new Vue({
    router,
    el: "#wrapper",
})