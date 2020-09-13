import Vue from 'vue'
import VueRouter from 'vue-router'




const Login = () => import('../components/Login/index')
const Home = () => import('../views/Home')
const Welcome = () => import('../views/Welcome')

const Users = () => import('../components/user/Users')
const Rights = () => import('../components/power/Rights')
const Roles= () => import('../components/power/Roles')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        component:Welcome,
      },
      {
        path:'/users',
        component:Users,
      },
      {
        path:'/rights',
        component:Rights,
      },
      {
        path:'/roles',
        component:Roles,
      },
    ]  
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router
