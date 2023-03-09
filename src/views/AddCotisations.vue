<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
         
                <div class="btn1">
                    <select @change="sortDistrict" class="select_"   v-model="conference_select" name="" id="">
                        <option selected value="">--CONFERENCES--</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select class="select_" @change="searchInDb" v-model="form.id_district"  name="" id="">
                        <option selected value="" >--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select style="width:150px;font-size:11px" required v-model="form.trimestre"  name="" id="">
                        <option selected disabled value="">--TRIMESTRE--</option>
                        <option value="1er Trimestre">1er Trimestre</option>
                        <option value="2eme Trimestre">2eme Trimestre</option>
                        <option value="3eme Trimestre">3eme Trimestre</option>
                        <option value="4eme Trimestre">4eme Trimestre</option>
                    </select>
                </div>
                <div  class="annee">
                    <input style="width:200px" required v-model="form.annee" id="annee"  type="number" placeholder="Annee...">
                 </div>
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <div  class="search">
                    <input style="width:200px;font-size:11px" required type="number" placeholder="No Borderrau"  v-model="form.numero_bordereau"> 
                </div>
                <div  class="search">
                    <input style="width:200px" required type="date"  v-model="form.date_paiement"> 
                </div>
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <!-- <button @click="dialog=true,modifier=false">+</button> -->
                </div>
            </div>
        </div>
        <div v-if="membres.length>0" class="table_content">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>District</th>
                        <th>Paroisse</th>
                        <th>Age</th>
                        <th>Categorie</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="membre in membres" :key="membre.id">
                        <td>{{ membre.matricule_membre }}</td>
                        <td> <strong>{{membre.nom_membre}} </strong> </td>
                        <td> <strong>{{membre.prenom_membre}} </strong></td>
                        <td>District x</td>
                        <td>{{ membre.paroisse[0]?.nom_paroisse }}</td>
                        
                        <td>{{ ageCal(membre.date_naissance_membre) }} Ans</td>
                        <td>{{membre.categorie[0]?.nom_categorie}}</td>
                        <td>{{money(membre.categorie[0]?.montant_a_paye)}} Fbu</td>
                        <td>
                            <div v-if="membre.statut=='actif'" id="actif">
                                {{membre.statut}}
                            </div>
                            <div v-if="membre.statut=='Abandon'" id="abandon">
                                {{membre.statut}}
                            </div>
                        </td>
                        <!-- <td><button  id="mod_btn">Modifier</button></td> -->
                        <td><button @click="add_cotisation(membre)"  id="mod_btn">Payer</button></td>
                        <td><button @click="add_cotisation_non_paye(membre)" style="font-size:13px"  id="delete_btn">Non Payer</button></td>
                    </tr>
                        
                </tbody>
                
            </table>         
        </div>
        <div v-else>
            <h6 style="font-size:24px;margin-top:20px">Aucune donnée correspond à votre recherche,Réesayez!</h6>
        </div>
     <add_membre  @close="close" v-if="dialog"></add_membre>
     <cotisation_modal @getMembres="getMembres"  @close="close" v-if="dialog_cotisation"></cotisation_modal>
     <non_form_modal @update="getCotisations" :edit_cotisation="modifier" @getCotisations="getCotisations"  @close="close" v-if="dialog_non_cotisation"></non_form_modal>
        
    </div>
</template>
<script>
import axios from 'axios'
import add_membre from '../components/membres/modals/add_membre.vue'
import cotisation_modal from '../components/cotisations/modals/form_cotisation.vue'
import non_form_modal from '../components/cotisations/modals/non_paye_form.vue'

export default{
    components:{
        add_membre,
        cotisation_modal,
        non_form_modal,
    },
    data(){
        return{
            dialog:false,
            dialog_cotisation:false,
            dialog_non_cotisation:false,
            membres:[],
            conference_select:'',
            
            conferences:[],
            districts:[],
            form:{
                id_district:'',
                numero_bordereau:'',
                date_paiement:'',
                trimestre:'',
                annee:new Date().getFullYear(),
                montant_paye:'',
                matricule_membre:'',
                montant_a_paye:'',
                id_uti:''
            },
        }
    },
    methods:{
        add_cotisation(item){
            this.loading = true;
            this.form.matricule_membre = item.matricule_membre
            this.form.montant_paye = item.categorie[0]?.montant_a_paye
            this.form.montant_a_paye = item.categorie[0]?.montant_a_paye
            this.form.id_uti = this.$store.state.user.user.id
            if(this.form.numero_bordereau==''){
                this.$toast.error("Veuillez completer le numero de bordereau",{
                        position:"bottom-right"
                    });
            }else if(this.form.date_paiement==''){
                this.$toast.error("Veuillez completer la date",{
                        position:"bottom-right"
                    });
            }
            
            else{
           
            axios.post(this.url+'store_cotisation',this.form)
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
        add_cotisation_non_paye(item){
            this.loading = true;
            this.form.matricule_membre = item.matricule_membre
            this.form.montant_paye = 0
            this.form.montant_a_paye = item.categorie[0]?.montant_a_paye
            this.form.id_uti = this.$store.state.user.user.id
           
            this.form.id_uti = this.$store.state.user.user.id
            if(this.form.numero_bordereau==''){
                this.$toast.error("Veuillez completer le numero de bordereau",{
                        position:"bottom-right"
                    });
            }else if(this.form.date_paiement==''){
                this.$toast.error("Veuillez completer la date",{
                        position:"bottom-right"
                    });
            }
            
            else{
            axios.post(this.url+'store_cotisation',this.form)
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
        close(){
            this.dialog=false
            this.dialog_cotisation = false
            this.dialog_non_cotisation = false
        },
        
        
        more_info(n){
            this.$router.push({name:'info_membre',params:{id:n.matricule_membre},query:{'prodName':n.nom_membre}})
        },
        ageCal(n){
                        let currentDate = new Date();
                        let birthdate = + new Date(n);
                        // console.log(this.$store.state.membres[i].date_naissance_membre);
                        let difference = currentDate - birthdate;
                        let age = Math.floor(difference/31557600000);
                        return age;
        },
        addCot(membre){
            this.dialog_cotisation = true
            this.$store.state.membre_cotisation = membre;
        },
        addNonCot(membre){
            this.dialog_non_cotisation = true
            this.$store.state.membre_cotisation = membre;
        },
        getConferences(){
            axios
            .get(this.url+'conferences')
            .then((res)=>{
                this.conferences = res.data
                this.allData = res.data
              
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }, 
        sortDistrict(){
            axios
            .get(this.url+'districts?conference_select=' +this.conference_select)
            .then((res)=>{
                this.$store.state.districts = res.data
                if(this.conference_select!=0){
                    this.allData = res.data
                    this.districts = res.data
                 }
                 else{
                    this.districts=false
                 }
                console.log(this.conference_select)
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        searchInDb(){
            axios
            .get(this.url+'membres_cot?district_select=' +this.form.id_district)
            .then((res)=>{
                this.$store.state.membres_cotisation = res.data
                this.allData = res.data
                this.links = res.data
                console.log(this.district_select)
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },

        
        
    },
        mounted(){
            this.getConferences()
       
        },
        computed:{
            membres(){
            const membres = this.$store.state?.membres_cotisation
            return membres
        },
    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>