import { createStore } from 'vuex'

export default createStore({
  state: {
    url:'http://127.0.0.1:8000/api/',
    user:null,
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
