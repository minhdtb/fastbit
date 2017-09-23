<template>
    <div>
        <v-layout row wrap style="margin-top: 5px">
            <v-flex sm2 offset-sm5>
                <h5 class="volume orange--text">{{market}}</h5>
            </v-flex>
            <v-flex sm4>
                <h5 class="volume green--text">{{balance}}</h5>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 5px">
            <v-flex sm3>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">BUY ORDERS</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table1.headers" v-bind:items="items1" hide-actions
                                      class="elevation-2">
                            <template slot="headers" scope="props">
                                <tr>
                                    <th v-for="header in props.headers" :key="header.text" :width="header.width">
                                        {{ header.text }}
                                    </th>
                                </tr>
                            </template>
                            <template slot="items" scope="props">
                                <td class="text-xs-right">{{ props.item.Rate.toFixed(8) }}</td>
                                <td class="text-xs-right">{{ props.item.Quantity.toFixed(8) }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex sm3>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">SELL ORDERS</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table2.headers" v-bind:items="items2" hide-actions
                                      class="elevation-2">
                            <template slot="headers" scope="props">
                                <tr>
                                    <th v-for="header in props.headers" :key="header.text" :width="header.width">
                                        {{ header.text }}
                                    </th>
                                </tr>
                            </template>
                            <template slot="items" scope="props">
                                <td class="text-xs-right">{{ props.item.Rate.toFixed(8) }}</td>
                                <td class="text-xs-right">{{ props.item.Quantity.toFixed(8) }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex sm6>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">MY OPEN ORDERS</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table4.headers" v-bind:items="items4" hide-actions
                                      class="elevation-2">
                            <template slot="headers" scope="props">
                                <tr>
                                    <th v-for="header in props.headers" :key="header.text" :width="header.width">
                                        {{ header.text }}
                                    </th>
                                </tr>
                            </template>
                            <template slot="items" scope="props">
                                <td v-if="props.item.OrderType === 'LIMIT_BUY'" class="text-xs-center green--text">
                                    {{ props.item.OrderType }}
                                </td>
                                <td v-else="" class="text-xs-center red--text">{{ props.item.OrderType }}</td>
                                <td class="text-xs-right">{{ props.item.Price.toFixed(8) }}</td>
                                <td class="text-xs-right">{{ props.item.Quantity.toFixed(8) }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-top: 10px">
            <v-flex sm6>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">TRADES</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table3.headers" v-bind:items="items3"
                                      v-bind:pagination.sync="table3.pagination" hide-actions class="elevation-2">
                            <template slot="headers" scope="props">
                                <tr>
                                    <th v-for="header in props.headers" :key="header.text" :width="header.width">
                                        {{ header.text }}
                                    </th>
                                </tr>
                            </template>
                            <template slot="items" scope="props">
                                <td v-if="props.item.OrderType === 'BUY'" class="text-xs-center green--text">
                                    {{ props.item.OrderType }}
                                </td>
                                <td v-else="" class="text-xs-center red--text">{{ props.item.OrderType }}</td>
                                <td class="text-xs-right">{{ props.item.Price.toFixed(8) }}</td>
                                <td class="text-xs-right">{{ props.item.Quantity.toFixed(8) }}</td>
                                <td class="text-xs-right">{{ props.item.Total.toFixed(8) }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex sm6>
                <v-layout row wrap>
                    <v-flex sm12 class="text-xs-center">
                        <h5 class="title">MY COMPLETED ORDERS</h5>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex sm12 style="padding: 0 3px">
                        <v-data-table v-bind:headers="table5.headers" v-bind:items="items5" hide-actions
                                      class="elevation-2">
                            <template slot="headers" scope="props">
                                <tr>
                                    <th v-for="header in props.headers" :key="header.text" :width="header.width">
                                        {{ header.text }}
                                    </th>
                                </tr>
                            </template>
                            <template slot="items" scope="props">
                                <td v-if="props.item.OrderType === 'LIMIT_BUY'" class="text-xs-center green--text">
                                    {{ props.item.OrderType }}
                                </td>
                                <td v-else="" class="text-xs-center red--text">{{ props.item.OrderType }}</td>
                                <td class="text-xs-right">{{ props.item.Price.toFixed(8) }}</td>
                                <td class="text-xs-right">{{ props.item.Quantity.toFixed(8) }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex sm6 class="pa-1 mt-1">
                <v-card class=" elevation-3">
                    <v-card-media class="pa-1 pl-3">
                        <h5 class="lb">Available: {{srcAvailable}} ({{srcCurrency}})</h5>
                        <v-layout>
                            <v-flex sm3>
                                <v-radio-group v-model="radioBuy" :mandatory="false">
                                    <v-radio label="All (100%)" value="radio-buy-all"></v-radio>
                                    <v-radio label="Amount" value="radio-buy-amount"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm2 class="pr-2">
                                <v-text-field v-model="buyNowAmount" type="number"
                                              :disabled="radioBuy === 'radio-buy-all'" class="mr-1"
                                              style="width: 70px; margin-top: 30px"></v-text-field>
                            </v-flex>
                            <v-flex sm1 style="margin-top: 53px"><span>{{srcCurrency}}</span></v-flex>
                            <v-flex sm6 class="text-sm-center">
                                <v-btn :disabled="action" @click.stop="buyNow" primary
                                       style="width: 180px; height: 50px;margin-top: 17px">
                                    BUY NOW
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-media>
                    <v-card-media class="pa-1 pl-3">
                        <v-layout>
                            <v-flex sm4 class="text-sm-center">
                                <v-text-field type="number" v-model="buyRate"
                                              style="width: 120px; margin-bottom: -20px; margin-top: -15px"></v-text-field>
                            </v-flex>
                            <v-flex sm4 class="text-sm-center">
                                <v-btn primary @click.stop="buyRateNow">BUY</v-btn>
                            </v-flex>
                            <v-flex sm4 class="text-sm-center">
                                <v-btn warning>CANCEL</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4 class="text-sm-center">
                                <v-layout row>
                                    <v-flex>
                                        <v-text-field type="number" v-model="buyRatePercent"
                                                      style="width: 120px"></v-text-field>
                                    </v-flex>
                                    <v-flex style="margin-top: 37px"><span>(%)</span></v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex sm4 class="text-sm-center">
                                <v-btn primary @click.stop="buyRatePercentNow" style="margin-top: 20px">BUY</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-media>
                </v-card>
            </v-flex>
            <v-flex sm6 class="pa-1 mt-1">
                <v-card class=" elevation-3">
                    <v-card-media class="pa-1 pl-3">
                        <h5 class="lb">Available: {{dstAvailable}} ({{dstCurrency}})</h5>
                        <v-layout>
                            <v-flex sm3>
                                <v-radio-group v-model="radioSell" :mandatory="false">
                                    <v-radio label="All (100%)" value="radio-sell-all"></v-radio>
                                    <v-radio label="Amount" value="radio-sell-amount"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm2 class="pr-2">
                                <v-text-field v-model="sellNowAmount" type="number"
                                              :disabled="radioSell === 'radio-sell-all'" class="mr-1"
                                              style="width: 70px; margin-top: 30px"></v-text-field>
                            </v-flex>
                            <v-flex sm1 style="margin-top: 53px"><span>{{dstCurrency}}</span></v-flex>
                            <v-flex sm6 class="text-sm-center">
                                <v-btn :disabled="action" @click.stop="sellNow" error
                                       style="width: 180px; height: 50px;margin-top: 17px">
                                    SELL NOW
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-media>
                    <v-card-media class="pa-1 pl-3">
                        <v-layout>
                            <v-flex sm4 class="text-sm-center">
                                <v-text-field type="number" v-model="sellRate"
                                              style="width: 120px; margin-bottom: -20px; margin-top: -15px"></v-text-field>
                            </v-flex>
                            <v-flex sm4 class="text-sm-center">
                                <v-btn error @click.stop="sellRateNow">SELL</v-btn>
                            </v-flex>
                            <v-flex sm4 class="text-sm-center">
                                <v-btn warning>CANCEL</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4 class="text-sm-center">
                                <v-layout row>
                                    <v-flex>
                                        <v-text-field type="number" v-model="sellRatePercent"
                                                      style="width: 120px"></v-text-field>
                                    </v-flex>
                                    <v-flex style="margin-top: 37px"><span>(%)</span></v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex sm4 class="text-sm-center">
                                <v-btn error @click.stop="sellRatePercentNow" style="margin-top: 20px">SELL</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-media>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import {ipcRenderer} from 'electron'
    import * as bittrex from 'node.bittrex.api'
    import * as _ from 'lodash'

    export default {
        data() {
            return {
                action: false,
                radioBuy: 'radio-buy-amount',
                radioSell: 'radio-sell-amount',
                buyNowAmount: 0,
                buyRate: 0,
                buyRatePercent: 0,
                sellRate: 0,
                sellRatePercent: 0,
                sellNowAmount: 0,
                table1: {
                    pagination: {
                        sortBy: 'Price'
                    },
                    headers: [
                        {text: 'PRICE', align: 'center', value: 'Rate', width: '50%'},
                        {text: 'QUANTITY ', align: 'center', value: 'Quantity'},
                    ]
                },
                table2: {
                    pagination: {
                        sortBy: 'Price'
                    },
                    headers: [
                        {text: 'PRICE', align: 'center', value: 'Rate', width: '50%'},
                        {text: 'QUANTITY ', align: 'center', value: 'Quantity'},
                    ]
                },
                table3: {
                    headers: [
                        {text: 'TYPE', align: 'center', value: 'OrderType', width: '25%'},
                        {text: 'PRICE ', align: 'center', value: 'Price', width: '25%'},
                        {text: 'QUANTITY ', align: 'center', value: 'Quantity', width: '25%'},
                        {text: 'TOTAL ', align: 'center', value: 'Total'},
                    ]
                },
                table4: {
                    headers: [
                        {text: 'TYPE', align: 'center', value: 'OrderType', width: '25%'},
                        {text: 'PRICE ', align: 'center', value: 'Price', width: '25%'},
                        {text: 'QUANTITY ', align: 'center', value: 'Quantity', width: '25%'},
                        {text: ' ', align: 'center', value: 'Total'},
                    ]
                },
                table5: {
                    headers: [
                        {text: 'TYPE', align: 'center', value: 'OrderType', width: '25%'},
                        {text: 'PRICE ', align: 'center', value: 'Price', width: '25%'},
                        {text: 'QUANTITY ', align: 'center', value: 'Quantity', width: '25%'},
                        {text: 'AMOUNT', align: 'center', value: 'Total'},
                    ]
                }
            }
        },
        computed: {
            market() {
                return this.$store.state.market;
            },
            balance() {
                return (!!this.$store.state.balance[1] && this.$store.state.balance[1].Balance) ? this.$store.state.balance[1].Balance : 0;
            },
            items1() {
                return this.$store.state.items1;
            },
            items2() {
                return this.$store.state.items2;
            },
            items3() {
                return this.$store.state.items3;
            },
            items4() {
                return this.$store.state.items4;
            },
            items5() {
                return this.$store.state.items5;
            },
            srcAvailable() {
                return (!!this.$store.state.balance[0] && this.$store.state.balance[0].Available) ? this.$store.state.balance[0].Available : 0;
            },
            srcCurrency() {
                return this.$store.state.market.split('-')[0];
            },
            dstAvailable() {
                return (!!this.$store.state.balance[1] && this.$store.state.balance[1].Available) ? this.$store.state.balance[1].Available : 0;
            },
            dstCurrency() {
                return this.$store.state.market.split('-')[1];
            }
        },
        watch: {
            market(val) {
                ipcRenderer.send('market:market', val);
            }
        },
        mounted() {
            ipcRenderer.send('market:market', this.market);
            ipcRenderer.send('market:config', this.$store.state.config);

            bittrex.options({
                'apikey': this.$store.state.config.apiKey,
                'apisecret': this.$store.state.apiSecret,
                'stream': false,
                'verbose': false,
                'cleartext': false
            });

            ipcRenderer.on('market:balance', (e, info) => this.$store.commit('SET_BALANCE', info));
            ipcRenderer.on('market:buy:orders', (e, items) => this.$store.commit('SET_ITEMS1', items));
            ipcRenderer.on('market:sell:orders', (e, items) => this.$store.commit('SET_ITEMS2', items));
            ipcRenderer.on('market:histories', (e, items) => this.$store.commit('SET_ITEMS3', items));
            ipcRenderer.on('market:open:orders', (e, items) => this.$store.commit('SET_ITEMS4', items));
            ipcRenderer.on('market:completed:orders', (e, items) => this.$store.commit('SET_ITEMS5', items));
        },
        methods: {
            buyNow() {
                let amount = this.radioBuy === 'radio-buy-amount' ? this.buyNowAmount : this.srcAvailable;

                if (amount > this.srcAvailable || amount <= 0)
                    return alert('Invalid buy amount.');

                this.action = true;
                bittrex.getorderbook({market: this.market, type: 'sell'}, res => {
                    let tempAmount = 0;
                    let rate = 0;

                    if (res && res.success) {
                        _.every(res.result, item => {
                            tempAmount += item.Price * item.Rate;
                            rate = item.Rate * 1.1;
                            return tempAmount >= amount;
                        });

                        let quantity = amount / rate;

                        bittrex.buylimit({
                            market: this.market,
                            quantity: quantity,
                            rate: rate
                        }, () => {
                            this.action = false;
                        })
                    }
                })
            },
            sellNow() {
                let amount = this.radioSell === 'radio-sell-amount' ? this.sellNowAmount : this.dstAvailable;

                if (amount > this.dstAvailable || amount <= 0)
                    return alert('Invalid sell amount.');

                this.action = true;
                bittrex.getorderbook({market: this.market, type: 'buy'}, res => {
                    let tempAmount = 0;
                    let rate = 0;

                    if (res && res.success) {
                        _.every(res.result, item => {
                            tempAmount += item.Price * item.Rate;
                            rate = item.Rate * 0.9;
                            return tempAmount >= amount;
                        });
                    }

                    let quantity = amount / rate;

                    bittrex.selllimit({
                        market: this.market,
                        quantity: quantity,
                        rate: rate
                    }, () => {
                        this.action = false;
                    })
                })
            },
            buyRateNow() {
                let amount = this.radioBuy === 'radio-buy-amount' ? this.buyNowAmount : this.srcAvailable;

                if (amount > this.srcAvailable || amount <= 0)
                    return alert('Invalid buy amount.');

                let rate = this.buyRate;

                if (rate < 0)
                    return alert('Invalid buy rate.');

                let quantity = amount / rate;

                this.action = true;
                bittrex.buylimit({
                    market: this.market,
                    quantity: quantity,
                    rate: rate
                }, () => {
                    this.action = false;
                })
            },
            sellRateNow() {
                let amount = this.radioSell === 'radio-sell-amount' ? this.sellNowAmount : this.dstAvailable;

                if (amount > this.dstAvailable || amount <= 0)
                    return alert('Invalid sell amount.');

                let rate = this.sellRate;

                if (rate < 0)
                    return alert('Invalid sell rate.');

                let quantity = amount / rate;

                bittrex.selllimit({
                    market: this.market,
                    quantity: quantity,
                    rate: rate
                }, () => {
                    this.action = false;
                })
            },
            buyRatePercentNow() {
                alert('buyRatePercentNow')
            },
            sellRatePercentNow() {
                alert('sellRatePercentNow')
            }
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

    .lb {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: -15px !important;
    }
</style>