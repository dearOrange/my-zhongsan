import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Login from '@/components/login'
import Main from '@/components/main'
import Adminmanage from '@/components/adminmanage'
import Power from '@/components/power'
import Trade from '@/components/trade'
import Usermanage from '@/components/usermanage'
import Function from '@/components/function'
import Notice from '@/components/notice'
import PowerSet from '@/components/powerSet'
import RoleId from '@/components/roleId'
import TakeMoney from '@/components/takeMoney'
import Settings from '@/components/settings'
import Handsmanage from '@/components/handsmanage'
import Agencymanage from '@/components/agencymanage'
import Addagency from '@/components/agencymanage/addagency'
import Waitlookhand from '@/components/handsmanage/waitlookhand'
import Entryandexit from '@/components/moneymanage/entryandexit'
import Platform from '@/components/moneymanage/platform'
import Rakeback from '@/components/moneymanage/rakeback'
import Adduser from '@/components/usermanage/adduser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      name:'',
      hidden: true
    },{
      path:"/main",
      component:Main,
      iconCls: 'android-apps',
      leaf: true,
      children: [
            {path:"/function",component:Function,name:"功能管理"}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'ios-locked',
      leaf: true,
      children: [
            {path:"/power",component:Power,name:"权限管理"},
            {path:"/powerSet",component:PowerSet,name:"用户组权限设置"},
            {path:"/roleId",component:RoleId,name:"角色权限设置"}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'android-person',
      leaf: true,
      children: [
            {path:"/adminmanage",component:Adminmanage,name:"管理员管理"}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'social-yen',
      leaf: true,
      children: [
            {path:"/trade",component:Trade,name:"交易管理"}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'person-stalker',
      name:"用户管理",
      children: [
      			{ path: '/usermanage', component: Usermanage, name: '用户管理'},
            { path: '/adduser', component: Adduser, name: '添加用户'}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'android-hand',
      name:"操盘手管理",
      children: [
      			{ path: '/handsmanage', component: Handsmanage, name: '操盘手管理'},
            { path: '/waitlookhand', component: Waitlookhand, name: '待审核操盘手' }
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'ios-people',
      name:"代理管理",
      leaf: true,
      children: [
      			{ path: '/agencymanage', component: Agencymanage, name: '代理管理' },
            { path: '/addagency', component: Addagency, name: '添加代理' }
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'social-usd',
      name:"财务管理",
      children: [
            { path: '/rakeback', component: Rakeback, name: '返佣记录' },
            { path: '/entryandexit', component: Entryandexit, name: '出入金统计' },
            { path: '/platform', component: Platform, name: '平台收入统计' }
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'social-bitcoin',
      leaf: true,
      children: [
            {path:"/takeMoney",component:TakeMoney,name:"提现管理"}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'chatbubble-working',
      leaf: true,
      children: [
            {path:"/notice",component:Notice,name:"公告管理"}
      ]
    },{
      path:"/main",
      component:Main,
      iconCls: 'settings',
      leaf: true,
      children: [
            {path:"/settings",component:Settings,name:"设置管理"}
      ]
    },{
      path:"/",
      hidden: true,
      redirect:"/login"
    }
  ]
})
