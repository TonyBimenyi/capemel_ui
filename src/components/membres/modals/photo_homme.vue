<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div style="font-size:20px" class="title">Photo de {{membre[0]?.nom_membre}} {{membre[0]?.prenom_membre}}</div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <form @submit.prevent="savePhoto()" enctype="multipart/form-data" >
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1" >
                    <input @change="e=> imageOne(e)" id="photo"  
                    class="input" type="file" file-selector-button="aod" 
                    required placeholder=" " />
                    
                </div>
                    
        </div>
     
         </div>
      <button  class="submit" >{{loading?"Chargement...":btn}}</button>
    </form>
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
            image1:null,
            btn:'Enregister',
            conferences:[],
            errorMessage:"",
            loading:false,
            membre:{},
        }
    },
    methods:{
        imageOne(e){
            this.image1 = e.target.files[0]
        },
        close(){
            this.$emit('close')
        },
        getMembres(){
            let pk = this.$route.params.id
            axios
            .get(this.url+'info_membre/'+pk)
            .then((res)=>{
                this.$store.state.membre = res.data
                this.membre = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        savePhoto(){
            const config = {

                headers: { 'content-type': 'multipart/form-data' }

                }
                let data = new FormData()
                data.append('image_1', this.image1)
                this.loading = true;
                axios.post(this.url+'update_photo_membre/'+this.membre[0]?.matricule_membre, data, config)
                .then((response)=>{
                this.loading = false;
                this.close();
                // this.getDistricts();
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
    },
    mounted(){
        this.getMembres()

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