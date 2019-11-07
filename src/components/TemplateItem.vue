<template lang="pug">
  .border.rounded.px-2.py-1
    .d-block.mb-1 {{data.label}}
    input.form-control(:id="data.id")
    span(@click="$emit('remove', data)") &times;
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
    position: relative;

    * {
      cursor: pointer;
    }

    span {
      position: absolute;
      right: 0;
      top: -25px;
    }

    input {
      height: 30px;
    }
  }
</style>
