<template lang="pug">
  div(:class="showBorderClass")
    .input-label {{data.label}}
    input(:id="data.id")
    span(v-if="showCloseIcon", @click="$emit('remove', data)") &times;
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class TemplateComponent extends Vue {
  @Prop({required: true, default: {}}) public data!: any;
  @Prop({default: false}) public canRemove!: boolean;
  @Prop({default: false}) public showBorder!: boolean;
  @Prop({default: () => ({})}) private currentComponent!: any;

  public get showBorderClass(): string[] {
      return this.showBorder ? ['border', 'px-2', 'py-1', 'rounded'] : [];
  }

  public get showCloseIcon(): boolean {
      if (!this.currentComponent) {
          return false;
      }
      return this.currentComponent.id === this.data.id && this.canRemove;
  }
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
      right: 5px;
      top: -5px;
    }

    input {
      height: 30px;
      width: 100%;
      border-radius: 3px;
      border: 1px solid #ddd;
    }

    .input-label {
      line-height: 15px;
      margin-bottom: 5px;
    }
  }
</style>
