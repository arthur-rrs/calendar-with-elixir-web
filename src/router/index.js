import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewEvent from '../views/NewEvent'
import MyEvents from '../views/MyEvents'
import CreateUser from "../views/CreateUser"
import Login from "../views/Login"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/event/new',
    name: 'NewEvent',
    component: NewEvent
  },
  {
    path: '/events/:date',
    name: 'MyEvents',
    component: MyEvents
  }, 
  {
    path: "/user/new",
    name: "NewUser",
    component: CreateUser
  }, 
  {
    path: "/login",
    name: "Login",
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router