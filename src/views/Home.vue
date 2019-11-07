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
            :w='item.width', :h='item.height',
            :minWidth='COMPONENT_DEFAULT_WIDTH', :min-height='COMPONENT_DEFAULT_HEIGHT',
            :x="item.x", :y="item.y",
            @dragstop='onDragStop',
            @resizestop='onResizeStop',
            :onDragStart='setCurrentComponent(item)',
            :onResizeStart='setCurrentComponent(item)',
            :parent="true",
            :grid=[20,20],
            v-for="item in currentComponentList")
            template-item(:data="item", @remove="removeComponent")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNav from '@/components/SideNav.vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import Draggable from 'vuedraggable';
import TemplateItemList from '@/components/TemplateItemList.vue';
import TemplateItem from '@/components/TemplateItem.vue';
import { COMPONENT_DEFAULT_WIDTH, COMPONENT_DEFAULT_HEIGHT } from '@/constant';

@Component({
    components: {TemplateItem, SideNav, TemplateItemList, VueDraggableResizable, Draggable },
})
export default class Home extends Vue {
  public COMPONENT_DEFAULT_WIDTH = COMPONENT_DEFAULT_WIDTH;
  public COMPONENT_DEFAULT_HEIGHT = COMPONENT_DEFAULT_HEIGHT;
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
  private componentIndex: number = 0;

  public onDragStop(x: number, y: number): void {
    const currentComponent = { ...this.currentComponent, x, y };
    this.currentComponentList = [
        ...this.currentComponentList.filter((item: any) => (item.id !== this.currentComponent.id)),
        currentComponent];
  }

  public onResizeStop(left: number, top: number, width: number, height: number): void {
    const currentComponent = { ...this.currentComponent, width, height};
    this.currentComponentList = [
        ...this.currentComponentList.filter((item: any) => (item.id !== this.currentComponent.id)),
      currentComponent];
  }

  public setCurrentComponent(component: any): void {
    this.currentComponent = component;
  }

  public handleCompDragChange(event: any): void {
    if (event && event.added) {
      this.currentComponent = {...event.added.element};
    }
  }

  public handleCompDragEnd(coordinates: any): void {
    this.currentComponent = {...this.currentComponent, ...coordinates, ... {
        id: ++this.componentIndex,
        componentId: this.currentComponent.id,
        width: COMPONENT_DEFAULT_WIDTH,
        height: COMPONENT_DEFAULT_HEIGHT,
      }};
    this.currentComponentList.push(this.currentComponent);
    this.currentComponent = {};
  }

  public removeComponent(component: any): void {
    this.currentComponentList = this.currentComponentList.filter((item: any) => {
        return item.id !== component.id;
    });
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
