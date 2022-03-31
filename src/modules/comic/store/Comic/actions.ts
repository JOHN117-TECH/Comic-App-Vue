import { api } from 'src/boot/axios';
import { StateInterface } from 'src/store';
import { ActionTree } from 'vuex';
import { ComicStateInterface } from './state';

const actions: ActionTree<ComicStateInterface, StateInterface> = {
  getComicData: async(context, numberComic=1) => {
    try {
      const resp =await api.get(`${numberComic}/info.0.json `)
      const {data} = resp
      
      resp.status === 200 && context.commit('addComic',data)
      
    } catch (error) {
      console.error(error);
    }
  }
};

export default actions;
