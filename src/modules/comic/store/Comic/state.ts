import { ComicInterface } from '../../components/models';


export interface ComicStateInterface {
  comic: ComicInterface,
  ratingValue: number,
}

function state(): ComicStateInterface {
  return {
    comic: {
      month:  '',
      num:       0,
      link:       '',
      year:       '',
      news:       '',
      safe_title: '',
      transcript: '',
      alt:        '',
      img:        '',
      title:      '',
      day:        '',
    },
    ratingValue:0
  }
}

export default state;
