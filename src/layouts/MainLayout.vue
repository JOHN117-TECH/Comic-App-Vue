<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-green-5">
        <q-toolbar-title>
          Comic # {{getComic.num}}
        </q-toolbar-title>

        <div>Rating Comic {{getRatingValue}}/5</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <ComicComponent />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import useComic from 'src/composable/useComic';
import { defineComponent} from 'vue';
import ComicComponent from '../modules/comic/components/ComicComponent.vue';
export default defineComponent({
  name: 'MainLayout',
  components: {
    ComicComponent 
  },
  setup () {
     const {getComic, getRatingValue} = useComic();
    return {
     getComic,
     getRatingValue
    }
  }
});
</script>
