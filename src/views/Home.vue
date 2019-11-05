<template lang="pug">
  .wrapper.flex-grow-1
    side-nav
    main.d-flex.flex-column
      section.border-bottom.p-4
        h4 Component list
        template-item-list.component-list.overflow-auto(:itemList="templateComponentsList")
      section.flex-grow-1.bg-dark.p-5
        draggable.page.bg-white.mx-auto.position-relative(ref="page", :list="currentComponentList", group="templateComponents", @change="log")
          // vue-draggable-resizable(:w='318', :h='90', @dragging='onDrag', @resizing='onResize', :parent="true", v-for="item in currentComponentList")
          template-item(:data="{id: item.id, label: item.label}", v-for="item in currentComponentList")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNav from '@/components/SideNav.vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import Draggable from 'vuedraggable';
import TemplateItemList from '@/components/TemplateItemList.vue';
import TemplateItem from '@/components/TemplateItem.vue';

@Component({
    components: {TemplateItem, SideNav, TemplateItemList, VueDraggableResizable, Draggable },
})
export default class Home extends Vue {
  public currentComponentList: any[] = [];
  public templateComponentsList: any[] = [
      {
          id: 1,
          label: 'Label 1',
      },
      {
          id: 2,
          label: 'Label 2',
      },
      {
          id: 3,
          label: 'Label 3',
      },
      {
          id: 4,
          label: 'Label 1',
      },
      {
          id: 5,
          label: 'Label 2',
      },
      {
          id: 6,
          label: 'Label 3',
      },
  ];

  public onDrag(): void {
      console.log('on drag');
  }

  public onResize(): void {
      console.log('on resize');
  }

  public log(event: any): void {
      console.log(event);
  }
}
</script>

<style lang="scss" scoped>
  .component-list {
    width: calc(100vw - 1.5rem - 280px);
  }

  .page {
    height: 29.7cm;
    width: 21cm;
  }
</style>
