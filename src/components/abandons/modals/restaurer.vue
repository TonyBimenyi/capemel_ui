<template>
    <div class="container">
<transition name="fade" appear>
    <div style="margin-top:-130px" class="form" >
        <div class="top">
             <div class="title">Attention!</div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
         <div class="text_message">
            <p style="margin-top:20px">Voulez-vous vraiment restaurer <strong>{{ $store.state.abandon.membre[0]?.nom_membre }} {{ $store.state.abandon.membre[0]?.prenom_membre }}</strong>?</p>
         </div>
         <div class="valider">
           <button @click="deleteDistrict()">Oui, Restaurer</button>
         </div>
      <button  class="delete_btn" @click="close()">Annuler</button>
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
                nom_district:'',
                id_conference:'',
                nom_sur_conference:'',
                email_sur_district:'',
                nom_sur_district:'',
                matricule_membre:this.$store.state.abandon.matricule_membre
            },
            btn:'Enregister',
            conferences:[],
            errorMessage:"",
            loading:false,
        }
    },
    methods:{
        deleteDistrict(){
            axios.post(this.url+'restaurer/'+this.$store.state.abandon.id,this.form)
                .then((response)=>{
                // this.loading = false;
                this.close();
                this.getCat();
                this.$toast.success(`Membre Restaure`)  
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
        getConferences(){
            this.$emit('getConferences')
        },
        
        close(){
            this.$emit('close')
        },
        getCat(){
            this.$emit('getAbandons')
        },
        saveDistrict(){
            if(this.edit_district){
                this.loading = true;
                axios.put(this.url+'restaurer/'+this.$store.state.abandon.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getDistricts();
                this.$toast.success(`District Modifier`)  
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
            axios.post(this.url+'store_district',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.getDistricts();
                this.$toast.success(`District enregistre`)  
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
        this.getCat()
        
        if(this.edit_district){
            this.form.nom_district = this.$store.state.district.nom_district;
            this.form.nom_sur_district = this.$store.state.district.nom_sur_district;
            this.form.email_sur_district = this.$store.state.district.email_sur_district;
            this.form.phone_sur_district = this.$store.state.district.phone_sur_district;
            this.form.id_conference = this.$store.state.district.id_conference;
            this.btn = 'Modifier'
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