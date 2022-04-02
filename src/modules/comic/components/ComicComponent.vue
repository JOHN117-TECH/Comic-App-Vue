<template>
<div class="row q-ma-sm">
    <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12 q-pa-md">
        <div class="row q-mt-sm" > 
            <div class="col-xl-12 col-lg-12 col-md-3 col-sm-4 col-xs-12 center">
                <q-btn class="custom-margin custom-height custom-width" color="green-5" label="random Comic" @click="generateNumberRandom" >
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        <strong>Search for a random comic book</strong>
                    </q-tooltip>
                </q-btn>     
            </div>
            <div class="col-xl-12 col-lg-12 col-md-3 col-sm-4 col-xs-12 center"> 
                <q-input
                color="teal-9"
                class="q-my-md custom-width"
                v-model="numbComic"
                type="number"
                outlined
                @keyup.enter="search"
                :rules="[
                    (val) => (val && val > 0) || 'Invalid number must be greater than 1',
                    (val) => (val && val <= 2600) || 'Invalid number must be less than 2601',
                  ]"
                >
                    <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]">
                        <strong>Search for a comic page number</strong>
                         (<q-icon name="keyboard_return"/>)
                    </q-tooltip>
                </q-input>
            </div>
            <div class="row col-xl-12 col-lg-12 col-md-5 col-sm-4 col-xs-12 center q-mb-md">      
                <p class="col-12 custom-size center"> <b> Rate this comic</b></p>
                <q-rating
                class="q-pb-md"
                v-model="ratingModel"
                size="3em"
                color="grey-10"
                :color-selected="ratingColors"
                :icon="icons"
                :icon-selected="iconsSelect"
                :icon-half="icons"
                >
                
                    <template v-slot:tip-1>
                     <q-tooltip>Very bad</q-tooltip>
                    </template>
                    <template v-slot:tip-2>
                     <q-tooltip>Bad</q-tooltip>
                    </template>
                    <template v-slot:tip-3>
                      <q-tooltip>Ummm ...</q-tooltip>
                    </template>
                    <template v-slot:tip-4>
                     <q-tooltip>Good</q-tooltip>
                    </template>
                    <template v-slot:tip-5>
                     <q-tooltip>Very Good</q-tooltip>
                    </template>
                </q-rating>
                
            </div>
            <template v-if="getLoading && q.screen.width >= 1440">
                <div class=" col-12 center">
                    <q-spinner-ios
                        color="teal-4"
                        size="4em"
                    />
                </div>
            </template>
            <template v-else>
                <template v-if="q.screen.width >= 1440">
                    <q-scroll-area class="scrroll q-mt-md">
                        <div v-show="getComic.transcript" class="col-12 ">      
                            <p class="q-mt-lg custom-size"><strong>Description </strong></p>
                            <p> {{getComic.transcript}}</p>
                        </div>
                    </q-scroll-area>    
                </template>
            </template>
        </div>
    </div>
    <template v-if="getLoading">
        <div class="col-10 center">
            <q-spinner-ios
             color="teal-4"
             size="8em"
            />
        </div>
    </template>
    <template v-else>
        <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12 q-px-sm q-mt-lg">
            <p class="col-12 bg-blue-grey-2 text-center size"> {{getComic.title}}</p>
            <div class="col-12 center"><img class="container-img custom-width-img" :src="getComic.img" :alt="getComic.alt" /></div>
            <template v-if="q.screen.width < 1440">
                <p v-show="getComic.transcript" class="col-12 q-mt-lg custom-size "><strong>Description </strong></p>
                <p v-show="getComic.transcript" class="col-12"> {{getComic.transcript}}</p>
            </template>
        </div>

    </template>
    
</div>  
</template>

<script>
import { onMounted, ref } from 'vue';
import useComic from '../../../composable/useComic';
import { useQuasar } from 'quasar'
import { watch } from 'vue';
export default {
 name: 'ComicComponent',
 setup() {
  
    const {getComicData,changeRatingValue,getComic, getLoading} = useComic();

    const q = useQuasar()

    const numbComic = ref(1)
    const numbRandom = ref(1)
    const ratingModel = ref(0)

    onMounted ( 
        () => getComicData()
    ) 
    watch(ratingModel ,(ratingValue)=> {
        changeRatingValue(ratingValue)

    })

    const search = () => {
       getComicData(numbComic.value)
       ratingModel.value=0
    }

    const generateNumberRandom = () => {
        numbRandom.value = Math.floor(Math.random()*2601);
        getComicData(numbRandom.value)
        numbComic.value = 1
        ratingModel.value=0
    }
    
    return {
        q,
        numbComic,
        getComic,
        getLoading,
        ratingModel,
        search,
        generateNumberRandom,
        icons: [
            'star_outline',
            'star_outline',
            'star_outline',
            'star_outline',
            'star_outline'
        ],
        iconsSelect: [
            'star',
            'star',
            'star',
            'star',
            'star'
        ],
        ratingColors: [ 'yellow-2', 'yellow-3', 'yellow-4', 'yellow-5', 'yellow-6' ]
    }
    }
     
 }

</script>

<style lang="sass" scoped>
.container
    display: flex
    align-content: center
    justify-content: center
    
.container-img
    box-shadow: 1px 1px 10px 4px $teal-3
.container
    height: 10%
.col-6
    height: auto
.custom-margin
    margin-top: 0px
    @media (max-width: $breakpoint-lg-max)
      margin-top: 0px   
      @media (max-width: $breakpoint-xs-max)
         margin-top: 10px
        
.custom-size
    font-size: 1.5rem
.custom-width
    width:100%
    @media (max-width: $breakpoint-md-max)
     width:50%
.custom-height
    height: 50% 
.custom-width-img
    max-width: 80%
    min-width: 50% 
.custom-height-img
    max-height: 500px
    min-height: 400px

.center 
  display: flex
  align-items: center
  align-content: center
  justify-content: center
  

.size 
  font-size:4rem 

.scrroll
    max-height: 1000px 
    min-height: 500px
    width: 100%
</style>