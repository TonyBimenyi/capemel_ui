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
                    <input id="firstname" v-model="form.nom_conference" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom Conference*</label>
                </div>
     
   
                
        </div>
      
            
         </div>
      <button  class="submit" @click="saveConference()">{{loading?"Chargement...":btn}}</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['edit_district'],
    data(){
        return{
            form:{
                nom_conference:'',
                id_conference:'',
                nom_sur_conference:'',
                email_sur_district:'',
                nom_sur_district:'',
            },
            btn:'Enregister',
            conferences:[],
            errorMessage:"",
            loading:false,
            modal_title:'Ajouter une conference'
        }
    },
    methods:{
        getConferences(){
            this.$emit('getConferences')
        },
       
        close(){
            this.$emit('close')
        },
        saveConference(){
            if(this.edit_district){
                this.loading = true;
                axios.put(this.url+'update_conference/'+this.$store.state.conference.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getConferences();
                this.$toast.success(`conference Modifiée`)  
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
            axios.post(this.url+'store_conference',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.getConferences();
                this.$toast.success(`Conference enregistré`)  
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
    },
    mounted(){
        this.getConferences()
     
        if(this.edit_district){
            this.form.nom_conference = this.$store.state.conference.nom_conference;
            this.form.nom_sur_district = this.$store.state.district.nom_sur_district;
            this.form.email_sur_district = this.$store.state.district.email_sur_district;
            this.form.phone_sur_district = this.$store.state.district.phone_sur_district;
            this.form.id_conference = this.$store.state.district.id_conference;
            this.btn = 'Modifier'
            this.modal_title = 'Modifier '+this.$store.state.conference.nom_conference; 
        }
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