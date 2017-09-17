<template>
    <v-layout row>
        <v-flex sm12>
            <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search"
                          v-bind:pagination.sync="pagination" hide-actions class="elevation-2">
                <template slot="items" scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.sodium }}</td>
                    <td class="text-xs-right">{{ props.item.calcium }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                search: '',
                pagination: {},
                selected: [],
                headers: [
                    {text: 'MARKET', align: 'left', value: 'market'},
                    {text: 'CURRENCY ', value: 'currency'},
                    {text: 'VOLUME', value: 'volume'},
                    {text: '% CHANGE (24h)', value: 'change24'},
                    {text: '% CHANGE', value: 'change'},
                    {text: 'LAST PRICE', value: 'lastPrice'},
                    {text: 'HIGH', value: 'high'},
                    {text: 'LOW', value: 'low'},
                    {text: '% SPREAD', value: 'spead'},
                    {text: 'ADDED \n', value: 'added'}
                ],
                items: []
            }
        },
        computed: {
            pages() {
                return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
            }
        }
    }
</script>