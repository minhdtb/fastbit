import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './App.vue'
import Home from './pages/home.vue'
import Login from './pages/login.vue'
import Register from './pages/register.vue'
import Key from './pages/key.vue'
import axios from 'axios'
import * as fs from 'fs'
import {remote} from 'electron'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/key', component: Key},
    {path: '/', component: Home}
];

const router = new VueRouter({routes});

const MAIN_CONFIG = remote.app.getPath('userData') + '/config_main.json';
const API_URL = 'http://127.0.0.1:3000/api';

export const getSettings = () => {
    if (fs.existsSync(MAIN_CONFIG)) {
        return JSON.parse(fs.readFileSync(MAIN_CONFIG, 'utf8').toString());
    } else
        return {};
};

export const setSettings = (settings) => {
    fs.writeFileSync(MAIN_CONFIG, JSON.stringify(settings), 'utf8');
};

const store = new Vuex.Store({
    state: {
        authUser: null,
        items: [],
        config: {
            apiKey: null,
            apiSecret: null
        },
        active: null,
        market: 'BTC-ETH'
    },
    actions: {
        LOGIN({commit}, credentials) {
            return axios.post(`${API_URL}/login`, credentials)
                .then((response) => {
                    let data = response.data;
                    localStorage.setItem('authUser', JSON.stringify(data.user));
                    commit('SET_AUTH', data.user);
                });
        },
        REGISTER({}, credentials) {
            return axios.post(`${API_URL}/register`, credentials);
        }
    },
    mutations: {
        SET_AUTH(state, user) {
            state.authUser = user;
        },
        SET_CONFIG(state, config) {
            state.config = config;
        },
        SET_ITEMS(state, items) {
            state.items = items;
        },
        SET_TAB(state, tab) {
            state.active = tab;
        },
        SET_MARKET(state, market) {
            state.market = market;
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.authUser;
        }
    }
});

const isAuthRoute = route => route.fullPath.indexOf('/login') !== -1 ||
    route.fullPath.indexOf('/register') !== -1;
const loadFromLocalStorage = () => {
    if (localStorage) {
        let user = JSON.parse(localStorage.getItem('authUser'));
        if (user) {
            store.commit('SET_AUTH', user);
            return true;
        }
    }

    return false;
};

router.beforeEach((to, from, next) => {
    const isLogged = store.getters.isLoggedIn || loadFromLocalStorage();
    if (!isAuthRoute(to) && !isLogged) {
        next('/login')
    } else {
        next()
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');