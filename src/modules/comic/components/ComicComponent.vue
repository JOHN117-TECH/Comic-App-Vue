<template>
<div class="row q-ma-sm">
    <div class="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12 q-pa-md">
        <div class="row" > 
            <div class="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-xs-12 center">
                <q-btn class="custom-margin custom-height custom-width" color="green-10" label="random Comic" @click="generateNumberRandom" /> 
            </div>
            <div class="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-xs-12 center"> 
                <q-input
                color="teal"
                class="q-my-md custom-width"
                v-model="numbComic"
                type="number"
                outlined
                @keyup.enter="search"
                :rules="[
                    (val) => (val && val > 0) || 'Invalid number must be greater than 1',
                    (val) => (val && val <= 2600) || 'Invalid number must be less than 2601',
                  ]"
                />
            </div>
            <div class="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-xs-12 center q-mb-md">      
                <q-rating
                class="q-pb-md"
                v-model="ratingModel"
                :max="5"
                size="3em"
                color="light-green-9"
                :icon="icons"
                :icon-selected="icons"
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
            <template v-if="q.screen.width >= 1440">
                <q-scroll-area class="scrroll q-mt-md">
                    <div v-show="getComic.transcript" class="col-12 ">      
                        <p class="q-mt-lg custom-size"><strong>Description </strong></p>
                        <p> {{getComic.transcript}}</p>
                    </div>
                </q-scroll-area>    
            </template>
        </div>
    </div>
    <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12 q-px-sm">
        <p class="col-12 bg-blue-grey-3 text-center size"> {{getComic.title}}</p>
        <div class="col-12 center"><img class="custom-width-img" :src="getComic.img" :alt="getComic.alt" /></div>
        <template v-if="q.screen.width < 1440">
            <p v-show="getComic.transcript" class="col-12 q-mt-lg custom-size "><strong>Description </strong></p>
            <p v-show="getComic.transcript" class="col-12"> {{getComic.transcript}}</p>
        </template>
    </div>
    
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
  
    const {getComicData,changeRatingValue,getComic} = useComic();

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
        ratingModel,
        search,
        generateNumberRandom,
        icons: [
            'sentiment_very_dissatisfied',
            'sentiment_dissatisfied',
            'sentiment_neutral',
            'sentiment_satisfied',
            'sentiment_very_satisfied'
        ]
    }
     
 }
}
</script>

<style lang="sass" scoped>
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