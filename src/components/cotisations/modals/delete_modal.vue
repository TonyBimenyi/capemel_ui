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
            <p style="margin-top:20px">Voulez-vous vraiment supprimer la cotisation <strong>{{ $store.state.cotisation.membre[0]?.nom_membre + ' ' + $store.state.cotisation.membre[0]?.prenom_membre + ' '}} </strong>? </p>
         </div>
         <div class="valider">
           <button @click="deleteCotisation()">Oui, Supprimer</button>
         </div>
      <button  class="delete_btn" @click="close()">Annuler</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {

    methods:{
        deleteCotisation(){
            axios.post(this.url+'delete_cotisation/'+this.$store.state.cotisation.id)
                .then((response)=>{
                // this.loading = false;
                this.close();
                this.getCotisations();
                this.$toast.success(`Cotisation est Supprimé`)  
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
        getCotisations(){
            this.$emit('getCotisations')
        },
 
        close(){
            this.$emit('close')
        },
     
    },
    mounted(){
        this.getCotisations()
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