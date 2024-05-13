import { createStore } from 'vuex'

export default createStore({
  state: {
    url:'https://backend.capeml.fmc-burundi.org/api/',
    user:null,
    user_store:{},
    users:[],
    district:{},
    districts:[],
    paroisses:[],
    paroisse:{},
    membres:[],
    categories:[],
    categorie:{},
    membre:{},
    membre_info:{},
    sumCotisation:{},
    conjoint:{},
    enfant:{},
    membres_cotisation:[],
    membre_cotisation:{},
    cotisations:[],
    cotisation:{},
    abandons:[],
    abandon:{},
    dashboard:'-',
    paroisse_count:'-',
    membre_count:'-',
    pension_count:'-',
    conference_count:'-',
    categorie_count:'-',
    cotisation_total:'-',
    cotisation_a_paye:'-',
    recent_cot:[],
    top_cot:[],
    pensions:[],
    photo_homme:{},
    conferences:[],
    conference:{},
    
    
  },
  getters: {
    user : state =>{
      if(state.user === null){
          return JSON.parse(localStorage.getItem('user'))
      }
      return state.user
    },
    token : (state, getters)=> getters?.user?.token
  },
  mutations: {
    login(state, user) {
      state.user = user;
      localStorage.setItem('user', state.user);
       window.location.href = "/" 
    },
    logout(state) {
        state.user = '';
        localStorage.removeItem('user');
        
    },
   initializeStore(state) {
    if(localStorage.getItem('user')){
        state.user = JSON.parse(localStorage.getItem('user'));
    }else{
       this.commit("logout");
    }
  }
  },
  actions: {
  },
  modules: {
  }
})
