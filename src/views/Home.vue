<template lang="pug">
  .wrapper.flex-grow-1
    side-nav
    main
      template-item-list(:itemList="templateComponentsList")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNav from '@/components/SideNav.vue';
import TemplateItemList from '@/components/TemplateItemList.vue';

@Component({
    components: { SideNav, TemplateItemList },
})
export default class Home extends Vue {
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
  ];
}
</script>
