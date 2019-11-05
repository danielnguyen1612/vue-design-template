<template lang="pug">
  .border.rounded.px-2.py-1
    p.d-block {{data.label}}
    input.form-control(:id="data.id")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TemplateComponent extends Vue {
    @Prop({required: true, default: {}}) public data!: any;
}
</script>

<style lang="scss" scoped>
  div {
    * {
      cursor: pointer;
    }
  }
</style>
