/* jshint esversion: 6 */
import Vue from 'vue'
import Router from 'vue-router'
// 1.1 底部Tabbar
import HomePage from './../views/navigation/NavIgation'

// 1.2 配置其他页面路由
// -----------
import Home from "../views/HomePage/HomePage";
import Sort from "../views/Sort/Sort";
import Cart from "../views/Cart/Cart";
import Mine from "../views/Mine/Mine";
import Login from "../views/Login/Login";
// ------------
import Logout from "../views/Mine/Logout";
import Order from "../views/Order/Order";
import MyAddress from "../views/Order/children/MyAddress";
import AddAddress from "../views/Order/children/children/AddAddress";
import EditAddress from "../views/Order/children/children/EditAddress";
import MyProduct from "../views/Order/children/MyProduct";
import ViewAllOrders from "../views/Mine/children/ViewAllOrders";
Vue.use(Router);
const router = new Router({
    routes: [
        // 配置根目录
        // {path: '/',redirect: "/homepage"},
        // {
        //     path: '/homepage',
        //     name: "nav",
        //     component: Nav,
        //     children: [
        //         // 配置根目录
        //         {path: '/homepage',redirect: "/homepage/home"},
        //         {
        //             path: "home", component: HomePage
        //         },
        //         {
        //             path: "sort", component: Sort
        //         },
        //         {
        //             path: "cart", component: Cart
        //         },
        //         {
        //             path: "mine", component: Mine
        //         }
        //     ]
        // },
        {
            path: "/",
            component: HomePage,
            redirect: "/home",
            children: [
                {
                    path: "home", name:"home", component:Home
                },
                {
                    path: "sort", name:"sort", component:Sort
                },
                {
                    path: "cart", name:"cart", component:Cart
                },
                {
                    path: "mine",
                    name:"mine",
                    component:Mine,
                    children: [
                        {
                            path: "logout",
                            name: "logout",
                            component: Logout,
                        },
                        {
                            path: "ViewAllOrders",
                            name: "ViewAllOrders",
                            component: ViewAllOrders,
                        },
                    ]
                },
            ]
        },
        {
            path: "/login",
            name:"login",
            component: Login
        },
        {
            path: "/order",
            name:"order",
            component: Order,
            children: [
                {
                    path: "MyAddress",
                    name: "MyAddress",
                    component: MyAddress,
                    children: [
                        {
                            path: "AddAddress",
                            name: "AddAddress",
                            component: AddAddress,
                        },
                        {
                            path: "EditAddress",
                            name: "EditAddress",
                            component: EditAddress,
                        }
                    ]
                },
                {
                    path: "MyProduct",
                    name: "MyProduct",
                    component: MyProduct,
                }
            ]
        }
    ]
});
export default router;
