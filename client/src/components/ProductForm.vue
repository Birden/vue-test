<script>
export default {
    name: "ProductForm",
    data: function () {
        return {
            brand: '',
            model: '',
            price: 0,
            name: '',
            phone: ''
        }
    },
    computed: {
        isValid: function () {
            return this.brand && this.model && this.price && this.name && this.phone;
        }
    },
    methods: {
        onAdd: function () {
            this.$emit('add', {
                brand: this.brand,
                model: this.model,
                price: this.price,
                name: this.name,
                phone: this.phone
            });
        }
    }
}
</script>

<template>
    <div class="product-form">
        <label for="brand">Марка:</label>
        <input id="brand" type="text" v-model="brand">
        <label for="model">Модель:</label>
        <input id="model" type="text" v-model="model">
        <label for="price">Цена:</label>
        <input id="price" type="text" v-model="price">
        <label for="name">Магазин:</label>
        <input id="name" type="text" v-model="name">
        <label for="phone">Телефон:</label>
        <input id="phone" type="text" v-model="phone">
        <button class="add-button" @click="onAdd" :disabled="!isValid">Добавить</button>
    </div>

</template>

<style scoped>
.product-form {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    margin-left: 2rem;
}
.add-button {
    margin: 1rem 1rem;
}
</style>
