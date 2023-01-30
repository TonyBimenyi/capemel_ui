<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <select @change="sortDistrict"   v-model="conference_select" name="" id="">
                        <option selected value="">{{ conf_text }}</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select  v-model="district_select"  name="" id="">
                        <option selected value="">--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select v-model="trimestre_select"  name="" id="">
                        <option selected disabled value="">--TRIMESTRE--</option>
                        <option value="1er Trimestre">1er Trimestre</option>
                        <option value="2eme Trimestre">2eme Trimestre</option>
                        <option value="3eme Trimestre">4eme Trimestre</option>
                        <option value="4eme Trimestre">4eme Trimestre</option>
                    </select>
                </div>
             
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <div class="search">
                   <input v-model="annee_select"  type="number" placeholder="Annee...">
                </div>
                <div class="search">
                   <input v-model="inputSearch" readonly @keydown="inputSearchMethods" type="text" placeholder="Rechercher...">
                </div>
                <div class="search_btn">
                    <button @click="searchInDb()">Rechercher</button>
                </div>
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <router-link to="add-cotisations"><button @click="dialog=true,modifier=false">+ <span id="add_text">AJOUTER COTISATION</span> </button></router-link>
                </div>
            </div>
        </div>
        <div class="table_content">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Montant Payé</th>
                        <th>Montant non Payé</th>
                        <th>Periode</th>
                        <th>Bordereau</th>
                        <th>Date</th>
                        <th colspan="2">Options</th>
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="cot in cotisations" :key="cot.id">
                        <td>{{cot.id}}</td>
                        <td>{{cot.matricule_membre}}</td>
                        <td>{{cot.membre[0]?.nom_membre}}</td>
                        <td>{{cot.membre[0]?.prenom_membre}}</td>
                        <td>{{money(cot.montant_paye)}} Fbu</td>
                        <td>{{money(cot.montant_a_paye-cot.montant_paye)}} Fbu</td>
                        <td>{{cot.trimestre}} {{cot.annee}}</td>    
                        <td>{{cot.numero_bordereau}}</td>    
                        <td>{{datetime(cot.date_paiement)}}</td>
                        <td>
                            <div v-if="cot.montant_paye==0">
                                <button @click="edit_cotisation(cot)" id="mod_btn">Payer</button>
                            </div>
                            <div v-else>
                               
                            </div>
                        </td>  
                        <td><button @click="delete_cotisation(cot)" id="delete_btn"><i class='bx bxs-trash'></i></button></td>         
                    </tr> 
                    
                    <tr id="total">
                        <td >TOTAL</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td >{{money(totalPaye())}} Fbu</td>
                        <td >{{money(totalNonPaye()-totalPaye())}} Fbu</td>
                        <td colspan="5"></td>
                    </tr>
                </tbody>
                
            </table>         
            
        </div>
     
        <form_modal @update="getCotisations" :edit_cotisation="modifier" @getCotisations="getCotisations"  @close="close" v-if="dialog"></form_modal> 
        <delete_modal @getCotisations="getCotisations" @close="close" v-if="dialog_delete"></delete_modal>
    </div>
</template>
<script>
import axios from 'axios'
import form_modal from '../components/cotisations/modals/form_cotisation.vue'
import cotisation_modal from '../components/cotisations/modals/form_cotisation.vue'
import delete_modal from '../components/cotisations/modals/delete_modal.vue'
export default {
    components:{
        delete_modal,
        form_modal,
        cotisation_modal,
        delete_modal,
    },
    data(){
        return{
            modifier:false,
            dialog:false,
            dialog_cotisation:false,
            allData:[],
            dialog_delete:false,
            conferences:[],
            conference_select:'',
            district_select:'',
            inputSearch:'',
            districts:[],
            conf_text:'--CONFERENCE--',
            montant_cotisation:0,
        }
    },
    methods:{
        totalPaye(){
            let total =0;
            for(let item in this.$store.state.cotisations){
                total = total +(this.$store.state.cotisations[item].montant_paye)
            } 
            return total;
        },
        totalNonPaye(){
            let total =0;
            for(let item in this.$store.state.cotisations){
                total = total +(this.$store.state.cotisations[item].montant_a_paye)
            } 
            return total;
        },
        getCotisations(){
            axios
            .get(this.url+'cotisations')
            .then((res)=>{
                this.$store.state.cotisations = res.data
                this.allData = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        payerCotisation(item){
            axios.put(this.url+'update_cotisation/'+this.$store.state.cotisation.id,this.form)
                .then((response)=>{
                // this.loading = false;
                this.close();
                this.getCotisations();
                this.$toast.success(`Operation reussi`)  
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
            .get(this.url+'cotisations?id_district='+this.district_select+'&trimestre_select'+this.trimestre_select)
            .then((res)=>{
                this.$store.state.cotisations = res.data
                this.allData = res.data
                this.links = res.data
                console.log(this.district_select)
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        inputSearchMethods(){
            this.$store.state.paroisses = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))          
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
        delete_cotisation(item){
            this.dialog_delete=true,
            this.$store.state.cotisation = item
        },
        edit_cotisation(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.membre_cotisation = item
            this.$store.state.paroisse = item
            this.$store.state.categorie = item
        },
        close(){
            this.dialog = false
            this.dialog_delete  = false
            this.dialog_cotisation = false
        },
        add_cot(membre){

        }
     
      
    },
    mounted(){
        this.getCotisations()
        this.getConferences()
     },
    computed:{
        cotisations(){
            const cotisations = this.$store.state?.cotisations
            return cotisations
        }
    }
}
</script>
<style src="../assets/css/table.css" scoped>
    
</style>