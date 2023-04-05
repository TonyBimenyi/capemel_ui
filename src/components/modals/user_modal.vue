<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title">{{modal_title}}</div>
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
                    <input id="lastname" v-model="form.email" class="input" required type="text" placeholder=" " />
                    <div class="cut"></div>
                    <label for="lastname" class="placeholder">Nom d'utilisateur</label>
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
                        <option value="Coordinateur">Coordinateur</option>
                        <option value="Secretaire">Secretaire</option>
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
    props:['edit_user'],
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
            modal_title:'Ajouter Utilisateur'
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
            if(this.edit_user){
                this.loading = true;
                axios.put(this.url+'update_user/'+this.$store.state.user_store.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getUsers();
                this.$toast.success(`Categorie modifié`)  
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
            else{
            this.loading = true;
            axios.post(this.url+'register',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.getUsers()
                this.$toast.success(`Utilisateur enregistré`)  
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
        }
    },
    mounted(){
   this.getUsers()
        if(this.edit_user){
            this.form.name =   this.$store.state.user_store.name;
            this.form.email = this.$store.state.user_store.email;
            this.form.telephone =  this.$store.state.user_store.telephone;
            this.form.role =  this.$store.state.user_store.role;
            

            this.btn = 'Modifier'
            this.modal_title = 'Modifier un utilisateur'; 
        }
    }
}
</script>
<style src='../../assets/css/modal.css' scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
</style>