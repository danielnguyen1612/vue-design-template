<template lang="pug">
  draggable.list-unstyled.d-flex.m-0(:list="itemList", :group="{name: 'templateComponents', pull: 'clone', put: 'false'}", @end="onEnd")
    .mr-3(v-for="item in itemList")
      template-item(:data="item")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TemplateItem from '@/components/TemplateItem.vue';
import Draggable from 'vuedraggable';

@Component({
    components: {TemplateItem, Draggable},
})
export default class TemplateItemList extends Vue {
    @Prop({required: true, default: []}) public itemList!: any[];
    public onEnd(event: any): void {
        if (event.to.className === 'fake') {
            this.$emit('dragEnd', {x: event.originalEvent.offsetX, y: event.originalEvent.offsetY});
        }
    }
}
</script>
