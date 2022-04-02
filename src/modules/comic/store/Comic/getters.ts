import { GetterTree } from 'vuex';
import { StateInterface } from 'src/store';
import { ComicStateInterface } from './state';

const getters: GetterTree<ComicStateInterface, StateInterface> = {
  getComic(context) {
    return context.comic
  },
  getRatingValue(context) {
    return context.ratingValue
  },
  getLoading(context) {
    return context.loadingComic
  }
};

export default getters;
