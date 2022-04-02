import { api } from 'src/boot/axios';
import { StateInterface } from 'src/store';
import { ActionTree } from 'vuex';
import { ComicStateInterface } from './state';

const actions: ActionTree<ComicStateInterface, StateInterface> = {
  getComicData: async(context, numberComic=1) => {
    try {
      context.commit('changeLoading')
      const resp =await api.get(`${numberComic}`)
      const {data} = resp
      
      resp.status === 200 && (
        context.commit('addComic',data),
        setTimeout(() => {context.commit('changeLoading')},1000) 
      )
      
    } catch (error) {
      console.error(error);
    }
  }
};

export default actions;
