<template>
  <div class="product-table">
      <table class="table">
          <thead>
            <tr>
                <th class="table-column">Марка</th>
                <th class="table-column">Модель</th>
                <th class="table-column">Цена</th>
                <th class="table-column">Магазин</th>
                <th class="table-column">Телефон</th>
            </tr>
          </thead>
          <tbody>
              <VueTableRow
                  v-for="product in products"
                  :key="product.id"
                  :item="product"
                  :highlight="selected.has(product.brand+product.model)"
                  @change="onSelect"
              />
          </tbody>
      </table>
  </div>
</template>

<script>
import VueTableRow from "@/components/VueTableRow.vue";

export default {
    name: 'VueTable',
    components: {VueTableRow},
    props: {
        products: Array
    },
    data: function () {
        return {
            selected: new Set()
        }
    },
    methods: {
        onSelect(value, item) {
            if (item == null) return;
            const name = item.brand + item.model;
            if (value) {
                this.selected.add(name);
            } else {
                this.selected.delete(name);
            }
        }
    }
}
</script>

<style scoped>
.table {
    border: 1px solid #ddd;
    width: 680px;
}
.table-column {
    width: 80px;
}
</style>
