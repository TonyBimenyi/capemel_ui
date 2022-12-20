<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title">Ajouter un District</div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.name" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom</label>
                </div>
                <div class="input-container ic2">
                    <select class="input" v-model="form.role" name="" id="">
                        <option value="">--Selectionner la conference--</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>   
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Conference</label>
                </div>
            </div>
            
         </div>
      <button  class="submit" @click="saveUser()">{{loading?"Chargement...":"Ajouter"}}</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            form:{
                name:'',
                email:'',
                telephone:'',
                role:'',
                password:'',
                c_password:'',
            },
            conferences:[],
            errorMessage:"",
            loading:false,
        }
    },
    methods:{
        getUsers(){
            this.$emit('getUsers')
        },
        getConferences(){
            axios
            .get(this.url+'users')
            .then((res)=>{
                this.conferences = res.data
                this.allData = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }, 
        close(){
            this.$emit('close')
        },
        saveUser(){
            this.loading = true;
            axios.post(this.url+'register',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.getUsers()
                this.$toast.success(`Utilisateur enregistre`)  
            })
            .catch((error)=>{
                if (error.message == "Network Error"){
                    this.errorMessage = "Vous n'êtes pas connecté au serveur"
                  
                }else{
                    this.errorMessage = error.response.data.message;
                    this.loading = false;
                    this.$toast.error(error.response.data.message,{
                        position:"bottom-right"
                    });
                }
                
            })
        },
    },
    mounted(){
        this.getConferences()
    }
}
</script>
<style src='../../../assets/css/modal.css' scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
</style>