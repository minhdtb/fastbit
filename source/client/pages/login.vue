<template>
    <v-container>
        <v-layout row>
            <v-flex sm6 offset-sm3>
                <v-form ref="form">
                    <v-card>
                        <v-card-media style="padding: 40px">
                            <v-layout row>
                                <v-flex sm12 style="text-align: center">
                                    <img src="static/images/logo.svg" style="width: 120px">
                                    <v-text-field label="Username" placeholder="Username" v-model="username"
                                                  :rules="[rules.username]" prepend-icon="fa-user fa-lg"
                                                  v-on:keyup.native.enter.prevent="submit">
                                    </v-text-field>
                                    <v-text-field label="Password" placeholder="Password" v-model="password"
                                                  :rules="[rules.password]" prepend-icon="fa-lock fa-lg"
                                                  type="password" v-on:keyup.native.enter.prevent="submit">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex sm12 style="text-align: center">
                                    <div>
                                        <pulse-loader :loading="loading" color="green" size="10px"></pulse-loader>
                                    </div>
                                    <div class="error" v-for="error in errors">
                                        <span>{{error}}</span>
                                    </div>
                                    <v-btn :disabled="loading" warning style="width: 200px" @click.stop="submit">
                                        <v-icon>fa-sign-in fa-lg fa-fw</v-icon>
                                        Login
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex sm12 style="text-align: center; margin-top: 10px;">
                                    <router-link to="/register">Register</router-link>
                                </v-flex>
                            </v-layout>
                        </v-card-media>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        components: {
            PulseLoader
        },
        data() {
            return {
                loading: false,
                errors: [],
                username: null,
                password: null,
                rules: {
                    username: (v) => {
                        return !!v || 'Username is required.';
                    },
                    password: (v) => {
                        return !!v || 'Password is required.';
                    }
                }
            }
        },
        methods: {
            submit() {
                this.errors = [];
                if (this.$refs.form.validate()) {
                    if (this.username && this.password) {
                        this.loading = true;
                        this.$store.dispatch('LOGIN', {
                            username: this.username,
                            password: this.password
                        }).then(() => {
                            this.loading = false;
                            this.$router.push('/');
                        }).catch(e => {
                            this.loading = false;
                            if (e.response) {
                                let data = e.response.data;
                                this.errors.push(data.message);
                            }
                            else
                                this.errors.push(e.message);
                        });
                    }
                }
            }
        }
    }
</script>