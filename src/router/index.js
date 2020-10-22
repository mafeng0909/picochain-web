import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import main from "../components/main";
import register from "../components/register";
import introduction from "../components/introduction";
import picochainRegister from "../components/picochainRegister";
import PersonalCenter from "../components/PersonalCenter"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/main'
    },
    { path: '/main', name: 'main', component: main},
    { path: '/login', name: 'Login', component: Login},
    { path: '/register', name: 'register', component: register},
    { path: '/introduction', name: 'introduction', component: introduction},
    { path: '/picochainRegister', name: 'picochainRegister', component: picochainRegister},
    { path: '/PersonalCenter', name: 'PersonalCenter', component: PersonalCenter},
  ]
})
