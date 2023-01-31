<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title"><h5 style="font-size:14px">{{ modal_title }} {{ membre[0]?.nom_membre }} {{ membre[0]?.prenom_membre }}</h5></div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    
                    <label for="firstname" class="placeholder">Frais de Pension : {{money(membre[0]?.categorie[0].montant_pension)}} Fbu</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.motif" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Motif</label>
                </div>
             
        </div>
        
            
         </div>
      <button  class="submit" @click="savePension()">{{loading?"Chargement...":btn}}</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['edit_enfant'],
    data(){
        return{
            form:{
                type_abandon:'',
                motif:'Age complet, Cotisation Reguliere',
                id_uti:'',
                matricule_membre:'',
            },
            btn:'Ajouter',
            districts:[],
            categories:[],
            paroisses:[],
            membre:{},
            errorMessage:"",
            district_select:'',
            loading:false,
            modal_title:'Pension pour',
            
        }
    },
    methods:{
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
        getParoisses(){
            this.$emit('getParoisses')
        },
        getDistricts(){
            axios
            .get(this.url+'districts')
            .then((res)=>{
                this.districts = res.data
                this.allData = res.data
              
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }, 
     
        getCategories(){
            axios
            .get(this.url+'categories')
            .then((res)=>{
                this.categories = res.data
                this.allData = res.data          
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }, 
        getEnfants(){
            this.$emit('getEnfants')
        },
        close(){
            this.$emit('close')
        },
        image(e){
            this.photo_membre = e.target.files[0]
        },
        savePension(){
            let data = new FormData()
   
            data.append('matricule_membre',this.membre[0].matricule_membre)
            data.append('id_uti',this.$store.state.user.user.id)
            data.append('motif_pension',this.form.motif)
           
            this.loading = true;
            axios.post(this.url+'store_pension',data,this.headers)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.$toast.success(`Pension est enregistré(e)`) 
                this.getEnfants();
                
            })
            .catch((error)=>{
                if (error.message == "Network Error"){
                
                  
                }else{
                    this.loading = false;
                    this.$toast.error(error.response.data.message,{
                        position:"bottom-right"
                    });
                }
                
            })
         }     
    },
    computed:{
      user(){
        return this.$store.state.user.user.id
      }
    },  
    mounted(){
        this.getDistricts()
        this.getParoisses()
        this.getCategories()
        this.getMembres()
        this.getEnfants()
        this.form.matricule_membre = this.$store.state.membre.matricule_membre;
        
        if(this.edit_enfant){
          
            this.btn = 'Modifier'
            this.modal_title = 'Modifier les données'; 
            this.form.nom_enfant = this.$store.state.enfant.nom_enfant
            this.form.prenom_enfant = this.$store.state.enfant.prenom_enfant
            this.form.date_naissance_enfant = this.$store.state.enfant.date_naissance_enfant           
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