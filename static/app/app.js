const NotFoundComponent = { template: "<not-found></not-found>"};

const LoginForm = { template: "<login-form></login-form>" };
const SignUpForm = { template: "<signup-form></signup-form>"};
const ForgotPassword = {template : "<forgot-password-form></forgot-password-form>"};


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: "/", component: LoginForm },
        { path: "/login/", component: LoginForm},
        { path: "/signup/", component: SignUpForm},
        { path: "/forgot-password/", component: ForgotPassword },




        { path: '*', component: NotFoundComponent },
    ]
});

var app = new Vue({
    router,
    el: "#wrapper",
})