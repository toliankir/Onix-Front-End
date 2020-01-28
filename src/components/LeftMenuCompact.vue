<template lang="pug">
    aside
        i.fas.fa-bars(@click="$emit('show')")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LeftMenuCompacr extends Vue {
}
</script>

<style lang="less" scoped>
@import "../constants.less";

aside {
    background-color: @aside-background-color;
    display: none;
    @media @sm {
        display: block;
    }
    & i {
        margin: 25px 10px;
        color: @nav-active-line-color;
        font-size: 24px;
        cursor: pointer;
    }
}
</style>
