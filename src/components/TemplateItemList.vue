<template lang="pug">
  .wrapper
    .p-4.border-bottom
      h5 Template item list
      ul.list-unstyled
        li(v-for="item in itemList")
          template-item(:data="item")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TemplateItem from '@/components/TemplateItem.vue';
@Component({
    components: {TemplateItem},
})
export default class TemplateItemList extends Vue {
    @Prop({required: true, default: []}) public itemList!: any[];
}
</script>
