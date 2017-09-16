<template>
    <v-app toolbar>
        <v-toolbar>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon v-if="isAuth">fa-user</v-icon>
            <v-toolbar-title v-if="isAuth">{{user.username}}</v-toolbar-title>
            <v-btn v-if="isAuth" class="button mr-2 ml-2" @click.stop="logout" fab error>
                <v-icon>fa-sign-out</v-icon>
            </v-btn>
            <v-btn class="button" @click.stop="close" fab warning>
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
                title: `FastBit Pro v${remote.app.getVersion()}`
            }
        },
        computed: {
            isRunning() {
                return this.$store.state.running;
            },
            isAuth() {
                return !!this.$store.state.authUser;
            },
            user() {
                return this.$store.state.authUser;
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

                remote.dialog.showMessageBox(window, {
                    type: 'question',
                    buttons: ['Yes', 'No'],
                    title: 'FastBit',
                    message: 'Do you really want to quit?'
                }, function (res) {
                    if (res === 0) {
                        if (window)
                            window.close();
                    }
                })
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

    .button {
        min-width: 0;
        width: 35px;
        height: 35px;
    }
</style>