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
                    <input id="firstname" v-model="form.nom_enfant" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.prenom_enfant" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Prenom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.date_naissance_enfant" class="input" type="date" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Date de naissance</label>
                </div>
             
        </div>
        
            
         </div>
      <button  class="submit" @click="saveConjoint()">{{loading?"Chargement...":btn}}</button>
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
                nom_enfant:'',
                prenom_enfant:'',
                date_naissance_enfant:'',
                matricule_membre:'',

            },
            btn:'Enregister',
            districts:[],
            categories:[],
            paroisses:[],
            membre:{},
            errorMessage:"",
            district_select:'',
            loading:false,
            modal_title:'Abandon pour',
            
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
        saveConjoint(){
            let data = new FormData()
            data.append('nom_enfant',this.form.nom_enfant)
            data.append('prenom_enfant',this.form.prenom_enfant)
            data.append('date_naissance_enfant',this.form.date_naissance_enfant)
            data.append('matricule_membre',this.membre[0].matricule_membre)
            data.append('id_uti',this.$store.state.user.user.id)
            if(this.edit_enfant){
                this.loading = true;
                axios.put(this.url+'update_enfant/'+this.$store.state.enfant.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getEnfants();
                this.$toast.success(`Enfant Modifier`)  
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
            axios.post(this.url+'store_enfant',data,this.headers)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.$toast.success(`Enfant est enregistré(e)`) 
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