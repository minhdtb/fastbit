<template>
    <v-layout row>
        <v-flex sm12>
            <v-tabs dark v-model="active">
                <v-tabs-bar class="warning">
                    <v-tabs-item :disabled="tab === 'configuration'? isRunning: false" v-for="tab in tabs"
                                 :key="tab" :href="'#' + tab" ripple>
                        <v-icon v-if="tab === 'dashboard'" style="margin-top: 3px">
                            fa-home fa-lg fa-fw
                        </v-icon>
                        <v-icon v-else style="margin-top: 3px">
                            fa-cog fa-lg fa-fw
                        </v-icon>
                        {{ tab }}
                    </v-tabs-item>
                    <v-tabs-slider class="error"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                    <v-tabs-content id="dashboard">
                        <dashboard></dashboard>
                    </v-tabs-content>
                    <v-tabs-content id="configuration" style="height: 550px">
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
                tabs: ['dashboard', 'fast trade'],
                version: remote.app.getVersion(),
                active: null
            }
        },
        computed: {},
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