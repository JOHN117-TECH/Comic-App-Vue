import { Module } from 'vuex';
import { StateInterface } from 'src/store';
import state, { ComicStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const comicModule: Module<ComicStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default comicModule;
