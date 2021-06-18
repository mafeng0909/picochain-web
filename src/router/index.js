import Vue from 'vue';
import Router from 'vue-router';
import Login from "../components/Login";
import main from "../components/main";
import register from "../components/register";
import introduction from "../components/introduction";
import picochainRegister from "../components/picochainRegister";
import PersonalCenter from "../components/PersonalCenter";
import picochainApplication from "../components/picochainApplication";
import applicationMain from "../components/picochainApplication/applicationMain";
import share from "../components/picochainApplication/share";
import exchange from "../components/picochainApplication/exchange";
import crowdsourcing from "../components/picochainApplication/crowdsourcing";
import Home from "../components/picochainApplication/share/Home";
// import New from "../components/picochainApplication/share/New";
// import Pic from "../components/picochainApplication/share/Pic";
// import Star from "../components/picochainApplication/share/Star";
// import Check from "../components/picochainApplication/share/Check";
// import CopyRightBusiness from "../components/picochainApplication/share/CopyRightBusiness";
// import CopyrightCheck from "../components/picochainApplication/share/CopyrightCheck";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: introduction
    },
    {
      path: '/picochainRegister',
      name: 'picochainRegister',
      component: picochainRegister
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/picochainApplication',
      name: 'picochainApplication',
      component: picochainApplication,
      redirect: '/applicationMain',
      children: [
        {
          path: '/applicationMain',
          name: 'applicationMain',
          component: applicationMain
        },
        {
          path: '/crowdsourcing',
          name: 'crowdsourcing',
          component: crowdsourcing
        },
        {
          path: '/exchange',
          name: 'exchange',
          component: exchange
        },
        {
          path: '/share',
          me: 'share',
          component: share,
          redirect: '/share/home',
          children: [
            {
              path: 'home',
              name: 'home',
              component: Home
            },
            // {
            //   path: 'new',
            //   name: 'New',
            //   component: New
            // },
            // {
            //   path: 'pic',
            //   name: 'Pic',
            //   component: Pic
            // },
            // {
            //   path: 'check',
            //   name: 'check',
            //   component: Check
            // },
            // {
            //   path: 'copyrightCheck',
            //   name: 'copyrightCheck',
            //   component: CopyrightCheck
            // },
            // {
            //   path: 'copyrightBusiness',
            //   name: 'copyrightBusiness',
            //   component: CopyRightBusiness
            // },
            // {
            //   path: 'star',
            //   name: 'star',
            //   component: Star
            // }
          ]
        }
      ]
    }
  ]
})
