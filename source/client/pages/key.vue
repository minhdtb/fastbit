<template>
    <v-container>
        <v-layout row wrap>
            <v-flex sm6 offset-sm3>
                <v-form ref="form">
                    <v-card style="padding: 25px; text-align: center">
                        <v-text-field label="Bittrex API Key" placeholder="Key" :rules="[rules.apiKey]"
                                      v-model="apiKey" prepend-icon="fa-key fa-lg"></v-text-field>
                        <v-text-field label="Bittrex API Secret" placeholder="Secret" :rules="[rules.apiSecret]"
                                      v-model="apiSecret" prepend-icon="fa-lock fa-lg"></v-text-field>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex sm12 style="text-align: center; padding-top: 10px">
                <v-btn warning style="width: 150px" @click.stop="submit">Continue</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import {getSettings, setSettings} from '../main'

    export default {
        data() {
            return {
                errors: [],
                apiKey: null,
                apiSecret: null,
                rules: {
                    apiKey: (v) => {
                        return !!v || 'API Key is required.';
                    },
                    apiSecret: (v) => {
                        return !!v || 'API Secret is required.';
                    }
                }
            }
        },
        methods: {
            submit() {
                this.errors = [];
                if (this.$refs.form.validate()) {
                    let config = getSettings();
                    config.apiKey = this.apiKey;
                    config.apiSecret = this.apiSecret;
                    setSettings(config);

                    this.$store.commit('SET_CONFIG', config);
                    this.$router.push('/');
                }
            }
        }
    }
</script>