<template lang="pug">
  .wrapper.flex-grow-1
    side-nav
    main.d-flex.flex-column.flex-grow-1
      section.border-bottom.p-4
        h4 Component list
        template-item-list.component-list.overflow-auto(:itemList="templateComponentsList", @dragEnd="handleCompDragEnd")
      section.flex-grow-1.p-5.page-bg
        .page.bg-white.mx-auto.position-relative
          draggable.fake(ref="page", :list="fakeComponentList", :group="{name: 'templateComponents'}", @change="handleCompDragChange")
          vue-draggable-resizable(
            :w='318', :h='90', :minWidth='318', :min-height='90', :x="item.x", :y="item.y",
            @dragging='onDrag',
            @resizing='onResize',
            :parent="true",
            :grid=[20,20],
            v-for="item in currentComponentList")
            template-item(:data="{id: item.id, label: item.label}")
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
  public currentComponent: any = {};
  public currentComponentList: any[] = [];
  public fakeComponentList: any[] = [];
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

  public handleCompDragChange(event: any): void {
      if (event && event.added) {
        this.currentComponent = {...event.added.element};
      }
  }

  public handleCompDragEnd(coordinates: any): void {
      this.currentComponent = {...this.currentComponent, ...coordinates};
      this.currentComponentList.push(this.currentComponent);
      this.currentComponent = {};
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
    box-shadow: 5px 5px 15px rgba(0,0,0,0.4);

    .fake {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .page-bg {
    background: gray;
  }
</style>
