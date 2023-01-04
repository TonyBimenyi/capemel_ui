<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title"><h5>{{ modal_title }} de {{ membre[0]?.nom_membre }} {{ membre[0]?.prenom_membre }}</h5></div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.prenom_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Prenom</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_pere_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom du Pere</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_mere_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom de la Mere</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.date_naissance_conjoint" class="input" type="date" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Date de naissance</label>
                </div>
             
        </div>
        <div class="part1">
              
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.province_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Province</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.commune_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Commune</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.colline_conjoint" class="input" type="text" required placeholder=" " />
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
                    <select class="input" v-model="form.etat_civil_conjoint" name="" id="">
                        <option value="" selected disabled>--Selectionner la Categorie--</option>
                        <option value="Marie">Marie</option>
                        <option value="Divorce">Divorce</option>
                        <option value="Veuf">Veuf</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Etat Civil</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.cin_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Numero CNI</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.telephone_conjoint" class="input" type="number" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Telephone</label>
                </div>
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.fonction_conjoint" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Fonction</label>
                </div>
                <!-- <input type="hidden" v-model="form.matricule_membre" :value="}}"> -->
               
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
      <button  class="submit" @click="saveConjoint()">{{loading?"Chargement...":btn}}</button>
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
                nom_conjoint:'',
                prenom_conjoint:'',
                nom_pere_conjoint:'',
                nom_mere_conjoint:'',
                date_naissance_conjoint:'',
                province_conjoint:'',
                commune_conjoint:'',
                colline_conjoint:'',
                nationalite_conjoint:'',
                etat_civil_conjoint:'',
                cin_conjoint:'',
                telephone_conjoint:'',
                fonction_conjoint:'',
                email:'',
                photo_conjoint:null,
                id_uti:this.$store.state.user.user.id,
                id_paroisse:'',
                id_categorie:'',
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
            modal_title:'Ajouter un(e) conjoint(e)',
            
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
        getConjoint(){
            this.$emit('getConjoint')
        },
        close(){
            this.$emit('close')
        },
        image(e){
            this.photo_membre = e.target.files[0]
        },
        saveConjoint(){
            let data = new FormData()
            data.append('nom_conjoint',this.form.nom_conjoint)
            data.append('prenom_conjoint',this.form.prenom_conjoint)
            data.append('nom_pere_conjoint',this.form.nom_pere_conjoint)
            data.append('nom_mere_conjoint',this.form.nom_mere_conjoint)
            data.append('date_naissance_conjoint',this.form.date_naissance_conjoint)
            data.append('province_conjoint',this.form.province_conjoint)
            data.append('commune_conjoint',this.form.commune_conjoint)
            data.append('colline_conjoint',this.form.colline_conjoint)
            data.append('etat_civil_conjoint',this.form.etat_civil_conjoint)
            data.append('cin_conjoint',this.form.cin_conjoint)
            data.append('telephone_conjoint',this.form.telephone_conjoint)
            data.append('fonction_conjoint',this.form.fonction_conjoint)
            data.append('id_paroisse',this.form.id_paroisse)
            data.append('id_categorie',this.form.telephone_conjoint)
            data.append('matricule_membre',this.form.telephone_conjoint)
            data.append('id_uti',this.$store.state.user.user.id)
            data.append('matricule_membre',this.membre[0]?.matricule_membre)
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
            axios.post(this.url+'store_conjoint',data,this.headers)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.$toast.success(`Conjoint(e) est enregistré(e)`) 
                this.getConjoint();
                
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
        this.getParoisses()
        this.getCategories()
        this.getMembres()
        this.getConjoint()
        this.form.matricule_membre = this.$store.state.membre.matricule_membre;
 
    
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