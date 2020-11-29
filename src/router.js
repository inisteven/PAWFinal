import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
    return () => import (`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/admin-dashboard/",
            name: "admin",
            component: importComponent('admin/DashboardLayout'),
            children: [
                //Dashboard
                {
                    path: "/admin-dashboard",
                    name: "Root",
                    component: importComponent('admin/Dashboard'),
                },
                {
                    path: "/admin/man",
                    name: "Man",
                    component: importComponent('admin/Man')
                },
                {
                    path: "/admin/woman",
                    name: "Woman",
                    component: importComponent('admin/Woman')
                },
                {
                    path: "/admin/acc",
                    name: "Acc",
                    component: importComponent('admin/Acc')
                }

            ]
        },
        //homepage
        {
            path : "/",
            meta: {title: "Homepage"},
            component : importComponent('Layout'),
        },
        //home
        {
            path : "/home",
            name : "Homepage",
            meta: {title: "Homepage"},
            component : importComponent('Layout'),
        },
        //about us
        {
            path : "/about-us",
            name : "Abous Us",
            meta: {title: "About us"},
            component : importComponent('Homepage/aboutUs'),
        },
        // man
        {
        path : "/man",
        name : "Man",
        meta: {title: "Man"},
        component : importComponent('Homepage/Man'),
        },
        // woman
        {
            path : "/woman",
            name : "Woman",
            meta: {title: "Woman"},
            component : importComponent('Homepage/Woman'),
        },
        // accesoris
        {
            path : "/acc",
            name : "Accessories",
            meta: {title: "Accessories"},
            component : importComponent('Homepage/Accessories'),
        },
        // login
        {
            path : "/signIn",
            name : "Sign In",
            meta: {title: "Sign In"},
            component : importComponent('Login'),
        },
        // signUp
        {
            path : "/signUp",
            name : "Sign Up",
            meta: {title: "Sign Up"},
            component : importComponent('SignUp'),
        },
    ]
});

export default router;