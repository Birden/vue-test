<script>
export default {
    name: "VueTableRow",
    props: {
        item: Object,
        highlight: Boolean
    },
    computed: {
        formattedPrice () {
            return new Intl.NumberFormat('ru').format(this.item.price)
        }
    },
    methods: {
        select: function (value, item) {
            this.$emit('change', value, item)
        }
    }
}
</script>

<template>
    <tr class="cell">
        <td>{{ item.brand }}</td>
        <td>{{ item.model }}</td>
        <td :class="highlight ? 'highlight' : ''">{{ formattedPrice }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td class="cell-checkbox">
            <input
                type="checkbox"
                :checked="highlight"
                @change="(event) => select(event.target.checked, item)"
            >
        </td>
    </tr>
</template>

<style scoped>
.cell {
    text-align: center;
}
.cell-checkbox {
    width: 40px
}
.highlight {
    background-color: yellow;
}
</style>
