<template>
  <q-layout class="bg-grey-3" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar  class="bg-teal-6">
        <q-toolbar-title>
           <q-icon size="3em" name="img:/icons/Comic.png" /> Comic # {{getComic.num}}
        </q-toolbar-title>

        <div>Rating Comic {{getRatingValue}}/5</div>
      </q-toolbar>
    </q-header>
    <q-page-container class="q-mt-xs">
      <ComicComponent />
    </q-page-container>
    <q-footer>
      <q-banner dense inline-actions class="text-center text-black bg-teal-2">
        Developed with
      
         <q-icon size="2.5em" name="img:/icons/Vue.png" /> 
         +
         <q-icon size="2.5em" name="img:/icons/Quasar.png" /> 
         +
         <q-icon size="2.5em" name="img:/icons/Sass.webp" />
         +
         <q-icon size="2.5em" name="img:/icons/JavaScript.png" />
         +
         <q-icon size="2.5em" name="img:/icons/Typescript.png" />
      
      </q-banner>
    </q-footer>
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
