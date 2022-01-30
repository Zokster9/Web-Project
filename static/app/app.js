const NotFoundComponent = { template: "<not-found></not-found>"};

const LoginForm = { template: "<login-form></login-form>" };
const SignUpForm = { template: "<signup-form></signup-form>"};
const ForgotPassword = { template : "<forgot-password-form></forgot-password-form>" };
const ChatPage = { template: "<chat-page></chat-page>" };
const Status = {template: "<status-ui></status-ui>"};
const Feed = {template: "<feed-page></feed-page>"};
const Profile = { template: "<profile-page></profile-page>" };
const Gallery = {template: "<gallery-page></gallery-page>"};

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: "/", component: LoginForm },
        { path: "/login/", component: LoginForm},
        { path: "/signup/", component: SignUpForm},
        { path: "/forgot-password/", component: ForgotPassword },
        { path: "/feed/", component: Feed},
        { path: "/chat/", component: ChatPage},
        { path: "/profile", component: Profile},
        { path: "/gallery", component: Gallery},


        { path: '*', component: NotFoundComponent },
    ]
});

var app = new Vue({
    router,
    el: "#wrapper",
})