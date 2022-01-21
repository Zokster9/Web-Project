import 'css/bootstrap.min.css'

const LoginForm = { template: '<login-form></login-form>' };

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: "/", component: LoginForm },
    ]
});

new Vue({
    router,
    el: "#wrapper",
})