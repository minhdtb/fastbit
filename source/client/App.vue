<template>
    <v-app toolbar>
        <v-toolbar>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-icon>fa-user fa-lg</v-icon>
            <v-btn class="btnClose" @click="close" fab  warning>
                <v-icon>fa-close</v-icon>
            </v-btn>
        </v-toolbar>
        <router-view style="padding: 10px"></router-view>
    </v-app>
</template>
<script>
    import {remote} from 'electron';

    export default {
        data() {
            return {
                title: `FastBit v${remote.app.getVersion()}`
            }
        },
        computed: {
            isRunning() {
                return this.$store.state.running;
            },
            isAuth() {
                return !!this.$store.state.authUser;
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('authUser');
                this.$store.commit('SET_AUTH', null);
                this.$router.push('/login');

            },
            close() {
                let window = remote.getCurrentWindow();
                if (window)
                    window.close();
            }
        }
    }
</script>
<style>
    .toolbar__content {
        height: 50px;
    }

    .toolbar {
        -webkit-user-select: none;
        -webkit-app-region: drag;
    }

    button {
        -webkit-app-region: no-drag;
    }

    .btn {
        margin: 0;
    }

    .btnLogout {
        position: absolute;
        left: 855px;
    }

    .btnClose {
        position: absolute;
        left: 955px;
        min-width: 0;
        width: 35px;
        height: 35px;
    }
</style>