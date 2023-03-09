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
                    <input id="firstname" v-model="form.nom_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.prenom_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Prenom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_pere_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom du Pere</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_mere_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom du Mere</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.date_naissance_membre" class="input" type="date" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Date de naissance</label>
                </div>
             
        </div>
        <div class="part1">
              
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.province_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Province</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.commune_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Commune</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.colline_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Colline</label>
                </div>
               <div class="input-container ic2">
                    <select @change="sortParoisse" class="input" v-model="district_select" name="" id="">
                        <option value="">--Selectionner District--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">District</label>
                </div>
                <div class="input-container ic2">
                    <select class="input" v-model="form.id_paroisse" name="" id="">
                        <option value="">--Selectionner Paroisse--</option>
                        <option v-for="par in paroisses" :key="par.id" :value="par.id">{{par.nom_paroisse}}</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Parroisse</label>
                </div>
               
                
        </div>

        <div class="part1">
                <div class="input-container ic2">
                    <select class="input" v-model="form.id_categorie" name="" id="">
                        <option value="">--Selectionner la Categorie--</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.nom_categorie}}</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Categorie</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.cin_membre" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Numero CNI</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.debut_ministere_membre" class="input" type="date" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Debut du ministere</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.date_mariage" class="input" type="date" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Date de mariage</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.telephone_membre" class="input" type="number" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Telephone</label>
                </div>
               
                <!-- <div class="input-container ic2">
                    <select class="input" v-model="form.id_district" name="" id="">
                        <option value="">--Selectionner le District--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Conference</label>
                </div> -->
                
        </div>
        
       
            
         </div>
      <button  class="submit" @click="saveMembre()">{{loading?"Chargement...":btn}}</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['edit_membre'],
    data(){
        return{
            form:{
                nom_membre:'',
                prenom_membre:'',
                nom_pere_membre:'',
                nom_mere_membre:'',
                date_naissance_membre:'',
                colline_membre:'',
                commune_membre:'',
                province_membre:'',
                nationalite_conjoint:'',
                cin_membre:'',
                debut_ministere_membre:'',
                debut_cotisation_membre:'',
                date_mariage:'',
                email:'',
                telephone_membre:'',
                photo_membre:null,
                statut:'',
                id_uti:this.$store.state.user.user.id,
                id_paroisse:'',
                id_categorie:'',
            
            },
            btn:'Enregister',
            districts:[],
            categories:[],
            paroisses:[],
            errorMessage:"",
            district_select:'',
            loading:false,
            modal_title:'Ajouter un nouveau membre',
            
        }
    },
    methods:{
        sortParoisse(){
            axios
            .get(this.url+'paroisses?district_select=' +this.district_select)
            .then((res)=>{
                this.$store.state.paroisses = res.data
                if(this.district_select!=0){
                    this.allData = res.data
                    this.paroisses = res.data
                 }
                 else{
                    this.paroisses=false
                 }
                console.log(this.district_select)
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        getMembres(){
            this.$emit('getMembres')
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
        close(){
            this.$emit('close')
        },
        image(e){
            this.photo_membre = e.target.files[0]
        },
        saveMembre(){
           
            if(this.edit_membre){
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
            axios.post(this.url+'store_membre',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.$toast.success(`Membre enregistre avec succes`) 
                this.getMembres();
                
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
    computed:{
      user(){
        return this.$store.state.user.user.id
      }
    },  
    mounted(){
        this.getDistricts()
        this.getMembres()
        this.getCategories()
        if(this.edit_membre){
            this.form.nom_membre = this.$store.state.membre.nom_membre;
            this.form.prenom_membre = this.$store.state.membre.prenom_membre;
            this.form.nom_pere_membre = this.$store.state.membre.nom_pere_membre;
            this.form.nom_mere_membre = this.$store.state.membre.nom_mere_membre;
            this.form.date_naissance_membre = this.$store.state.membre.date_naissance_membre;
            this.form.province_membre = this.$store.state.membre.province_membre;
            this.form.commune_membre = this.$store.state.membre.commune_membre;
            this.form.colline_membre = this.$store.state.membre.colline_membre;
            this.form.cin_membre = this.$store.state.membre.cin_membre;
            this.form.debut_ministere_membre = this.$store.state.membre.debut_ministere_membre;
            this.form.date_mariage = this.$store.state.membre.date_mariage;
            this.form.telephone_membre = this.$store.state.membre.telephone_membre;
            
            this.form.id_district = this.$store.state.paroisse.id_district;
            this.btn = 'Modifier'
            this.modal_title = 'Modifier '+this.$store.state.membre.nom_membre + ' '+ this.$store.state.membre.prenom_membre; 
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