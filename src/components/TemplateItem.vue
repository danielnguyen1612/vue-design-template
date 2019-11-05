<template lang="pug">
  .border.rounded.px-2.py-1
    label.d-block(:for="data.id") {{data.label}}
    input.form-control(:id="data.id")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TemplateComponent extends Vue {
    @Prop({required: true, default: {}}) public data!: any;
}
</script>
