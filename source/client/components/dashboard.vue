<template>
    <div>
        <v-layout row wrap>
            <v-flex sm2>
                <v-select :items="currencies" item-value="text" label="Base Currency" single-line>
                    <template slot="item" scope="data">
                        <img :src="data.item.icon" :width="data.item.width" style="margin: 0 5px"/>
                        {{data.item.text}}
                    </template>
                    <template slot="selection" scope="data">
                        <img :src="data.item.icon" :width="data.item.width" style="margin: 0 5px"/>
                        {{data.item.text}}
                    </template>
                </v-select>
            </v-flex>
        </v-layout>
        <v-layout row style="margin-top: 5px">
            <v-flex sm12>
                <v-data-table v-bind:headers="headers" v-bind:items="items" :rows-per-page-items="[20]"
                              v-bind:pagination.sync="pagination" hide-actions class="elevation-2">
                    <template slot="items" scope="props">
                        <td>
                            <a href="#" @click.stop="click">{{ props.item.market }}</a>
                        </td>
                        <td class="">{{ props.item.currency }}</td>
                        <td class="text-xs-right">{{ props.item.volume }}</td>
                        <td v-if="props.item.change24 <= 0" class="text-xs-right error--text">{{ props.item.change24 }}
                            <v-icon error>fa-arrow-down fa-1</v-icon>
                        </td>
                        <td v-else="" class="text-xs-right green--text">{{ props.item.change24 }}
                            <v-icon class="green--text">fa-arrow-up fa-1</v-icon>
                        </td>
                        <td class="text-xs-right">{{ props.item.change }}</td>
                        <td class="text-xs-right">{{ props.item.lastPrice }}</td>
                        <td class="text-xs-right">{{ props.item.high }}</td>
                        <td class="text-xs-right">{{ props.item.low }}</td>
                        <td class="">{{ props.item.added }}</td>
                    </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import {ipcRenderer, remote} from 'electron'

    export default {
        data() {
            return {
                pagination: {
                    sortBy: 'volume',
                    descending: true
                },
                headers: [
                    {text: 'MARKET', align: 'left', value: 'market'},
                    {text: 'CURRENCY ', align: 'center', value: 'currency'},
                    {text: 'VOLUME', align: 'center', value: 'volume'},
                    {text: '% CHANGE (24h)', align: 'center', value: 'change24'},
                    {text: '% CHANGE', align: 'center', value: 'change'},
                    {text: 'LAST PRICE', align: 'center', value: 'lastPrice'},
                    {text: 'HIGH', align: 'center', value: 'high'},
                    {text: 'LOW', align: 'center', value: 'low'},
                    {text: 'ADDED', align: 'center', value: 'added'}
                ],
                currencies: [
                    {text: 'BTC', icon: 'static/images/btc.svg', width: 20},
                    {text: 'ETH', icon: 'static/images/eth.svg', width: 20},
                    {text: 'USDT', icon: 'static/images/tether.svg', width: 20}
                ]
            }
        },
        computed: {
            pages() {
                return this.pagination.rowsPerPage ? Math.ceil(this.$store.state.items.length / this.pagination.rowsPerPage) : 0
            },
            items() {
                return this.$store.state.items;
            }
        },
        mounted() {
            ipcRenderer.on('market:summaries', (e, items) => this.$store.commit('SET_ITEMS', items))
        },
        methods: {
            click(e) {
                let market = e.target.innerText;
                this.$store.commit('SET_MARKET', market);
                this.$store.commit('SET_TAB', 'fastbit');
            }
        }
    }
</script>
<style>
    .table th {
        font-weight: 700;
        font-size: 11px;
        transition: .3s cubic-bezier(.25, .8, .5, 1);
        white-space: nowrap;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #f4f4f4;
    }

    .table {
        border-collapse: collapse;
        border: 1px solid #c6c6c6;
    }

    .datatable__progress tr {
        height: 3px !important;
    }

    thead tr {
        height: 35px !important;
        line-height: 10px !important;
    }

    th, td {
        border: 1px solid #c6c6c6;
        padding: 0 5px !important;
    }

    .table td {
        height: 22px !important;
    }

    .table .icon {
        padding-left: 5px;
        font-size: 13px;
    }
</style>