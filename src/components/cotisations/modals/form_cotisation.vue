<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title"><h5 style="font-size:14px">{{ modal_title }} {{ this.$store.state.membre_cotisation.nom_membre }} {{ this.$store.state.membre_cotisation.prenom_membre }}</h5></div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="infos_membre">
                    <p> <strong>Nom:</strong>  {{this.$store.state.membre_cotisation.nom_membre}}</p>
                    <p> <strong>Prenom:</strong>  {{form.prenom_membre}}</p>
                    <p> <strong>Paroisse:</strong>  {{form.paroisse}}</p>
                    <p> <strong>Categorie:</strong>  {{form.categorie}}</p>
                    <p> <strong>Dirniere Cotisation:</strong>  1er Trimestre 2022</p>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.montant_total" class="input" type="number" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Montant</label>
                </div>
                <div class="input-container ic2">
                    <select class="input" v-model="form.trimestre" name="" id="">
                        <option  selected disabled >--TRIMESTRE--</option>
                        <option value="1er Trimestre">1er Trimestre</option>
                        <option value="2eme Trimestre">2eme Trimestre</option>
                        <option value="3eme Trimestre">3eme Trimestre</option>
                        <option value="4eme Trimestre">4eme Trimestre</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Trimestre</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.annee" class="input" type="number" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Annee</label>
                </div>
             
        </div>
        
            
         </div>
      <button  class="submit" @click="saveCot()">{{loading?"Chargement...":btn}}</button>
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
                nom_membre:this.$store.state.membre_cotisation.nom_membre,
                prenom_membre:this.$store.state.membre_cotisation.prenom_membre,
                paroisse:this.$store.state.membre_cotisation.paroisse[0]?.nom_paroisse,
                categorie:this.$store.state.membre_cotisation.categorie[0]?.nom_categorie,
                montant_total:0,
                trimestre:'',
                annee:new Date().getFullYear(),
                matricule_membre:this.$store.state.membre_cotisation.matricule_membre
            },
            btn:'Enregister',
            districts:[],
            categories:[],
            paroisses:[],
            membre:{},
            errorMessage:"",
            district_select:'',
            loading:false,
            modal_title:'Cotisation pour',
            
        }
    },
    methods:{
        saveCot(){
            let data = new FormData()
            data.append('montant_total',this.form.montant_total)
            data.append('trimestre_annee',this.form.trimestre+' '+this.form.annee )
            data.append('matricule_membre',this.$store.state.membre_cotisation.matricule_membre)
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
            axios.post(this.url+'store_cotisation',data,this.headers)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.$toast.success(`Cotisation est enregistré(e)`) 
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
        this.nom_membre = this.$store.state.membre_cotisation.nom_membre
        this.form.matricule_membre = this.$store.state.membre.matricule_membre;
        
        if(this.edit_enfant){
          
            this.btn = 'Modifier'
            this.modal_title = 'Modifier les données'; 
            this.form.prenom_enfant = this.$store.state.enfant.prenom_enfant
            this.form.date_naissance_enfant = this.$store.state.enfant.date_naissance_enfant           
        }else{
            
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