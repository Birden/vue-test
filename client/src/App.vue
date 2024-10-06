<template>
    <div>
        <div class="container">
            <VueTable :products="products" />
            <ProductForm @add="addProduct"/>
        </div>
        <p v-if="error" class="error">
            {{error.message}}
        </p>
    </div>
</template>

<script>
import VueTable from './components/VueTable.vue'
import ProductForm from './components/ProductForm.vue'
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_ADDR || 'http://localhost:3000/api';

export default {
    name: 'App',
    components: {
        VueTable, ProductForm
    },
    data() {
        return {
            products: [],
            error: null
        }
    },
    async mounted () {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts () {
            this.error = null;
            try {
                this.products = (await axios.get('/product')).data;
            } catch (e) {
                this.error = e;
            }
        },
        async addProduct (product) {
            this.error = null;
            try {
                await axios.post('/product', product);
                await this.fetchProducts();
            } catch (e) {
                this.error = e;
            }
        }
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: row;
    width: 1200px;
}
.error {
    color: red;
}
</style>
