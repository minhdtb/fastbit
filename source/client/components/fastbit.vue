<template>
    <div>
        <v-layout row wrap style="margin-top: 10px">
            <v-flex sm4>
                <h4 class="volume orange--text">{{market}}</h4>
            </v-flex>
            <v-flex sm2>
                <h5 class="volume green--text">{{volume}}</h5>
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
                        <v-data-table v-bind:headers="headers" v-bind:items="items" hide-actions class="elevation-2">
                            <template slot="items" scope="props">
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
                        <v-data-table v-bind:headers="headers" v-bind:items="items" hide-actions class="elevation-2">
                            <template slot="items" scope="props">
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
                        <v-data-table v-bind:headers="table3.headers" v-bind:items="items" hide-actions class="elevation-2">
                            <template slot="items" scope="props">

                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                headers: [
                    {text: 'PRICE', align: 'center', value: 'price'},
                    {text: 'AMOUNT ', align: 'center', value: 'amount'},
                ],
                items: [],
                table3: {
                    headers: [
                        {text: 'PRICE', align: 'center', value: 'price'},
                        {text: 'AMOUNT ', align: 'center', value: 'amount'},
                        {text: 'AMOUNT ', align: 'center', value: 'amount'},
                        {text: 'AMOUNT ', align: 'center', value: 'amount'},
                    ]
                }
            }
        },
        computed: {
            market() {
                return this.$store.state.market;
            },
            volume() {
                return this.$store.state.volume;
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
</style>