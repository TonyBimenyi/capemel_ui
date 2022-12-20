<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title">Ajouter un utilisateur</div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.name" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom et Prenom</label>
                </div>
                <div class="input-container ic2">
                    <input id="lastname" v-model="form.email" class="input" required type="email" placeholder=" " />
                    <div class="cut"></div>
                    <label for="lastname" class="placeholder">Email</label>
                </div>
                <div class="input-container ic2">
                    <input id="email" v-model="form.telephone" class="input" required type="number" min="0" placeholder=" " />
                    <div class="cut"></div>
                    <label for="email"  class="placeholder">Telephone</label>
                </div>
            </div>
            <div class="part1">
                <div class="input-container ic1">
                    <select class="input" v-model="form.role" name="" id="">
                        <option value="">--Selectionner le Role--</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Role</label>
                </div>
                <div class="input-container ic2">
                    <input id="lastname" v-model="form.password" class="input" type="password" placeholder=" " />
                    <div class="cut"></div>
                    <label for="lastname" required class="placeholder">Mot de passe</label>
                </div>
                <div class="input-container ic2">
                    <input id="email" v-model="form.c_password" class="input" type="password" placeholder=" " />
                    <div class="cut"></div>
                    <label for="email" required class="placeholder">Confirmer mot de passe</label>
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
            errorMessage:"",
            loading:false,
        }
    },
    methods:{
        getUsers(){
            this.$emit('getUsers')
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
        }
    },
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