const NotFoundComponent = { template: "<not-found></not-found>"};

const LoginForm = { template: "<login-form></login-form>" };
const SignUpForm = { template: "<signup-form></signup-form>"};
const ForgotPassword = { template : "<forgot-password-form></forgot-password-form>" };
const ChatPage = { template: "<chat-page></chat-page>" };
const Status = {template: "<status-ui></status-ui>"};
const Feed = {template: "<feed-page></feed-page>"};
const Profile = { template: "<profile-page></profile-page>" };
const Gallery = {template: "<gallery-page></gallery-page>"};
const MutualFriends = {template: "<mutual-friends></mutual-friends>"};
const Post  = { template: "<post-ui></post-ui>"};
const Search = {template: "<search-ui></search-ui>"};
const EditProfile = {template: "<edit-profile></edit-profile>"};
const CreateStatus = {template: "<create-status></create-status>"};
const CreatePhoto = {template: "<create-photo></create-photo>"};
const FriendRequests = {template: "<friend-requests></friend-requests>"};
const Messages = {template: "<chat-page></chat-page>"};
const MessagesUser = {template: "<chat-page-user></chat-page-user>"}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: "/", component: LoginForm },
        { path: "/login/", component: LoginForm},
        { path: "/signup/", component: SignUpForm},
        { path: "/forgot-password/", component: ForgotPassword },
        { path: "/feed/", component: Feed},
        { path: "/post/:id/",  component: Post},
        { path: "/chat/", component: ChatPage},
        { path: "/profile", component: Profile},
        { path: "/gallery", component: Gallery},
        { path: "/mutual-friends", component:MutualFriends},
        { path: "/search", component:Search},
        { path: "/edit-profile", component: EditProfile},
        { path: "/create-status/", component: CreateStatus},
        { path: "/create-photo/", component: CreatePhoto},
        { path: "/friend-requests/", component: FriendRequests},
        { path: "/messages/", component: Messages},
        { path: "/messages/:username/", component: MessagesUser},


        { path: '*', component: NotFoundComponent },
    ]
});

var app = new Vue({
    router,
    el: "#wrapper",
})