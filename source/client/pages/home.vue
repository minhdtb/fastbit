<template>
    <v-layout row>
        <v-flex sm12>
            <v-tabs dark v-model="active">
                <v-tabs-bar class="warning">
                    <v-tabs-item  v-for="tab in tabs" :key="tab.id" :href="'#' + tab.id" ripple>
                        <v-icon v-if="tab.id === 'dashboard'" style="margin-top: 3px">
                            fa-home fa-lg fa-fw
                        </v-icon>
                        <v-icon v-else style="margin-top: 3px">
                            fa-cog fa-lg fa-fw
                        </v-icon>
                        {{ tab.text }}
                    </v-tabs-item>
                    <v-tabs-slider class="error"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                    <v-tabs-content id="dashboard">
                        <dashboard></dashboard>
                    </v-tabs-content>
                    <v-tabs-content id="fastbit">
                        <fastbit></fastbit>
                    </v-tabs-content>
                </v-tabs-items>
            </v-tabs>
        </v-flex>
    </v-layout>
</template>
<script>
    import {ipcRenderer, remote} from 'electron'
    import dashboard from '../components/dashboard.vue'
    import fastbit from '../components/fastbit.vue'
    import {getSettings} from '../main'

    export default {
        components: {
            dashboard,
            fastbit
        },
        data() {
            return {
                tabs: [{
                    text: 'dashboard',
                    id: 'dashboard'
                }, {
                    text: 'fast trade',
                    id: 'fastbit'
                }],
                version: remote.app.getVersion(),
            }
        },
        computed: {
            active: {
                get() {
                    return this.$store.state.active;
                },
                set(val) {
                    this.$store.commit('SET_TAB', val)
                }
            }
        },
        beforeMount() {
            let config = getSettings();
            if (config && config.apiKey && config.apiSecret) {
                this.$store.commit('SET_CONFIG', config);
            } else {
                this.$router.push('/key')
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>