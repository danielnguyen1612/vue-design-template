<template lang="pug">
  .wrapper.flex-grow-1
    side-nav
    main.d-flex.flex-column.flex-grow-1
      section.border-bottom.p-4.component-menu
        h4 Component list
        template-item-list.component-list.overflow-auto(:itemList="templateComponentsList", @dragEnd="handleCompDragEnd")
      section.flex-grow-1.p-5.page-bg
        .controls.mx-auto.d-flex.justify-content-end
          .form-check.form-check-inline.mr-0
            input#showGrid.form-check-input(v-model="showGrid", type="checkbox")
            label.form-check-label(for="showGrid") Show grid
        .page.mx-auto.position-relative(:style="gridStyleObject")
          draggable.fake(ref="page", :list="fakeComponentList", :group="{name: 'templateComponents'}", @change="handleCompDragChange")
          vue-draggable-resizable(
            :w="item.width", :h="item.height",
            :minWidth="COMPONENT_DEFAULT_WIDTH", :min-height="COMPONENT_DEFAULT_HEIGHT",
            :x="item.x", :y="item.y",
            :handles="['mr', 'ml']"
            @dragstop="onDragStop",
            @resizestop="onResizeStop",
            @activated="setCurrentComponent(item)",
            @deactivated="setCurrentComponent({})",
            :parent="true", className="design-page", classNameActive="active",
            :grid="[DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE]",
            v-for="item in currentComponentList", :key="item.id")
            template-item(:data="item", @remove="removeComponent", :canRemove="true", :currentComponent="currentComponent")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNav from '@/components/SideNav.vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import Draggable from 'vuedraggable';
import TemplateItemList from '@/components/TemplateItemList.vue';
import TemplateItem from '@/components/TemplateItem.vue';
import { COMPONENT_DEFAULT_WIDTH, COMPONENT_DEFAULT_HEIGHT, DEFAULT_GRID_SIZE } from '@/constant';
import { processCoordinate } from '@/utils';

@Component({
    components: { TemplateItem, SideNav, TemplateItemList, VueDraggableResizable, Draggable },
})
export default class Home extends Vue {
  public COMPONENT_DEFAULT_WIDTH = COMPONENT_DEFAULT_WIDTH;
  public COMPONENT_DEFAULT_HEIGHT = COMPONENT_DEFAULT_HEIGHT;
  public DEFAULT_GRID_SIZE = DEFAULT_GRID_SIZE;
  public showGrid: boolean = false;
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
      label: 'Label 4',
    },
    {
      id: 5,
      label: 'Label 5',
    },
    {
      id: 6,
      label: 'Label 6',
    },
  ];
  private componentIndex: number = 0;

  public get gridStyleObject(): any {
    return {
      background: this.showGrid
        ? `linear-gradient(-90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px) 0% 0% / ${DEFAULT_GRID_SIZE}px ${DEFAULT_GRID_SIZE}px, linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px) 0% 0% / ${DEFAULT_GRID_SIZE}px ${DEFAULT_GRID_SIZE}px white`
        : 'white',
    };
  }

  public onDragStop(x: number, y: number): void {
    const coordinates = processCoordinate({x, y});
    this.currentComponent = { ...this.currentComponent, ...coordinates };
    this.currentComponentList = [
      ...this.currentComponentList.filter((item: any) => (item.id < this.currentComponent.id)),
      this.currentComponent,
      ...this.currentComponentList.filter((item: any) => (item.id > this.currentComponent.id)),
    ];
  }

  public onResizeStop(left: number, top: number, width: number, height: number): void {
    const coordinates = processCoordinate({x: left, y: top});
    this.currentComponent = { ...this.currentComponent, ...coordinates , width, height};
    this.currentComponentList = [
      ...this.currentComponentList.filter((item: any) => (item.id < this.currentComponent.id)),
      this.currentComponent,
      ...this.currentComponentList.filter((item: any) => (item.id > this.currentComponent.id)),
    ];
  }

  public setCurrentComponent(component: any): void {
    this.currentComponent = component;
  }

  public handleCompDragChange(event: any): void {
    console.log(event);
    if (event && event.added) {
      this.currentComponent = {...event.added.element};
    }
  }

  public handleCompDragEnd(coordinates: any): void {
    console.log(coordinates);
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
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0 0 / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0 0 / 10px 10px white;

    .fake {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .page-bg {
    background: #ddd;
    height: calc(100vh - 150px);
    overflow: auto;
  }

  .controls {
    width: 21cm;
  }

  .component-menu {
    height: 150px;
  }

  .handler {
    width: 5px;
    height: 5px;
  }
</style>
