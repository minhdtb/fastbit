<template>
    <div>
        <v-layout row wrap style="margin-top: 10px">
            <v-flex sm4>
                <h4 class="volume orange--text">{{market}}</h4>
            </v-flex>
            <v-flex sm2>
                <h5 class="volume green--text">{{balance}}</h5>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 10px">
            <v-flex sm6>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">BUY ORDERS</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table1.headers" v-bind:items="items1" hide-actions
                                      class="elevation-2">
                            <template slot="items" scope="props">
                                <td class="text-xs-center">{{ props.item.Rate }}</td>
                                <td class="text-xs-center">{{ props.item.Quantity }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex sm6>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">SELL ORDERS</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table2.headers" v-bind:items="items2" hide-actions
                                      class="elevation-2">
                            <template slot="items" scope="props">
                                <td class="text-xs-center">{{ props.item.Rate }}</td>
                                <td class="text-xs-center">{{ props.item.Quantity }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 10px">
            <v-flex sm12>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">TRADES</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table3.headers" v-bind:items="items3" hide-actions
                                      class="elevation-2">
                            <template slot="items" scope="props">
                                <td v-if="props.item.OrderType === 'BUY'" class="text-xs-center green--text">{{ props.item.OrderType }}</td>
                                <td v-else="" class="text-xs-center red--text">{{ props.item.OrderType }}</td>
                                <td class="text-xs-center">{{ props.item.Price }}</td>
                                <td class="text-xs-center">{{ props.item.Quantity }}</td>
                                <td class="text-xs-center">{{ props.item.Total }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import {ipcRenderer} from 'electron'

    export default {
        data() {
            return {
                table1: {
                    headers: [
                        {text: 'PRICE', align: 'center', value: 'Rate'},
                        {text: 'AMOUNT ', align: 'center', value: 'Quantity'},
                    ]
                },
                table2: {
                    headers: [
                        {text: 'PRICE', align: 'center', value: 'Rate'},
                        {text: 'AMOUNT ', align: 'center', value: 'Quantity'},
                    ]
                },
                table3: {
                    headers: [
                        {text: 'SELL/BUY', align: 'center', value: 'amount'},
                        {text: 'PRICE ', align: 'center', value: 'amount'},
                        {text: 'AMOUNT ', align: 'center', value: 'amount'},
                        {text: 'TOTAL ', align: 'center', value: 'amount'},
                    ]
                }
            }
        },
        computed: {
            market() {
                return this.$store.state.market;
            },
            balance() {
                return this.$store.state.balance;
            },
            items1() {
                return this.$store.state.items1;
            },
            items2() {
                return this.$store.state.items2;
            },
            items3() {
                return this.$store.state.items3;
            }
        },
        watch: {
            market(val) {
                ipcRenderer.send('market:market', val);
            }
        },
        mounted() {
            ipcRenderer.send('market:market', this.market);

            ipcRenderer.on('market:balance', (e, info) => {
                this.$store.commit('SET_BALANCE', info.Balance ? info.Balance : 0);
            });

            ipcRenderer.on('market:buy:orders', (e, items) => this.$store.commit('SET_ITEMS1', items));
            ipcRenderer.on('market:sell:orders', (e, items) => this.$store.commit('SET_ITEMS2', items));
            ipcRenderer.on('market:histories', (e, items) => this.$store.commit('SET_ITEMS3', items));
        }
    }
</script>
<style scoped="">
    .title {
        font-size: 14px !important;
        margin-bottom: 5px;
    }

    .volume {
        margin-bottom: 0;
        text-shadow: 1px 1px #2a2a2a;
        transition: opacity 0.5s linear;
        -webkit-font-smoothing: antialiased;
    }
</style>