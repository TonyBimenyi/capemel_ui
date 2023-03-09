<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title"><h5>{{ modal_title }}</h5></div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_categorie" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.montant_a_paye" class="input" type="number" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Montant </label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.montant_pension" class="input" type="number" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Montant de pension</label>
                </div>
               
        </div>
       

       
            
         </div>
      <button  class="submit" @click="saveCategorie()">{{loading?"Chargement...":btn}}</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['edit_paroisse'],
    data(){
        return{
            form:{
                nom_categorie:'',
                montant_a_paye:'',
                montant_pension:'',
                id_uti:this.$store.state.user.user.id,
            },
            btn:'Enregister',
            loading:false,
            modal_title:'Ajouter categorie',
            
        }
    },
    methods:{
     
        close(){
            this.$emit('close')
        },
        image(e){
            this.photo_membre = e.target.files[0]
        },
        saveCategorie(){
           
            if(this.edit_paroisse){
                this.loading = true;
                axios.put(this.url+'update_paroisse/'+this.$store.state.paroisse.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getParoisses();
                this.$toast.success(`Paroisse Modifier`)  
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
            axios.post(this.url+'store_categorie',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.$toast.success(`Categorie enregistre avec succes`) 
                this.getCat()
                
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
        getCat(){
            this.$emit('getPensions')
        }
    },
    computed:{
      user(){
        return this.$store.state.user.user.id
      }
    },  
    mounted(){
   this.getCat()
        if(this.edit_paroisse){
            this.form.nom_paroisse = this.$store.state.paroisse.nom_paroisse;
            this.form.id_district = this.$store.state.paroisse.id_district;
            this.btn = 'Modifier'
            this.modal_title = 'Modifier '+this.$store.state.paroisse.nom_paroisse; 
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