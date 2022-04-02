import { ComicInterface } from 'src/modules/comic/components/models';
import { computed } from 'vue';
import { useStore } from '../store/index';

const useComic = () => {
  const store = useStore();
  return {
    getComic:              computed<ComicInterface>(() => store.getters['Comic/getComic']),
    getRatingValue:        computed<number>(() => store.getters['Comic/getRatingValue']),
    getLoading:            computed<boolean>(() => store.getters['Comic/getLoading']),
    getComicData:          (numberComic:number) => store.dispatch('Comic/getComicData',numberComic),
    changeRatingValue:     (value:number) => store.commit('Comic/changeRatingValue',value),
  };
};

export default useComic;
