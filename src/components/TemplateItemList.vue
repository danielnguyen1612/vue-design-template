<template lang="pug">
  draggable.list-unstyled.d-flex.m-0(:list="itemList", :group="{name: 'templateComponents', pull: 'clone', put: 'false'}", @end="onEnd", @choose="onChoose")
    .mr-3(v-for="item in itemList")
      template-item(:data="item", :canRemove="false")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TemplateItem from '@/components/TemplateItem.vue';
import Draggable from 'vuedraggable';
import { processCoordinate } from '@/utils';

@Component({
    components: { TemplateItem, Draggable },
})
export default class TemplateItemList extends Vue {
    @Prop({required: true, default: []}) public itemList!: any[];
    private mouseOffset: any = {};
    public onEnd(event: any): void {
      if (event.to.className === 'fake') {
        const componentCoordinate = event.originalEvent;
        const parentCoordinate = event.to.getBoundingClientRect();
        this.$emit('dragEnd', {
          x: processCoordinate(Math.round(componentCoordinate.x - parentCoordinate.x - this.mouseOffset.x)),
          y: processCoordinate(Math.round(componentCoordinate.y - parentCoordinate.y - this.mouseOffset.y)),
        });
      }
    }

    public onChoose(event: any): void {
      const componentCoordinate = event.originalEvent;
      const parentCoordinate = event.item.getBoundingClientRect();
      this.mouseOffset = {
        x: componentCoordinate.x - parentCoordinate.x,
        y: componentCoordinate.y - parentCoordinate.y,
      };
    }
}
</script>
