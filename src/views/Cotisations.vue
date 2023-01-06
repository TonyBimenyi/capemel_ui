<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <!-- <div class="btn1">
                    <button>Imprimer</button>
                </div> -->
                <div class="btn1">
                    <select @change="sortDistrict"   v-model="conference_select" name="" id="">
                        <option selected value="">{{ conf_text }}</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select @change="searchInDb" v-model="district_select"  name="" id="">
                        <option selected value="">--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select v-model="trimestre"  name="" id="">
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
                   <input v-model="annee"  type="number" placeholder="Annee...">
                </div>
                <div class="search">
                   <input v-model="inputSearch" readonly @keydown="inputSearchMethods" type="hidden" placeholder="Rechercher...">
                </div>
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <button @click="dialog=true,modifier=false">+</button>
                </div>
            </div>
        </div>
        <div class="cotisation_list">
            <table>
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Cotisation Trimestrielle</th>
                        <th>Categorie</th>
                        <th>Derniere cotisation</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="mem in membres" :key="mem.id">
                        <td>{{mem.matricule_membre}}</td>
                        <td>{{mem.nom_membre}}</td>
                        <td>{{mem.prenom_membre}}</td>             
                        <td>  <div class="search">
                                     <input v-model="montant_cotisation"  @keydown="inputSearchMethods" type="text" placeholder="Entrer le montant...">
                                </div>
                        </td>
                        <td>{{mem.categorie[0]?.nom_categorie}}</td>
                        <td>1er trimestre 2022</td>     
                        <td><button @click="add_cot(mem)" id="mod_btn">Appliquer</button></td>           
                    </tr>          
                </tbody>
                
            </table>         
            
        </div>
     
        <form_modal @update="getParoisses" :edit_paroisse="modifier" @getParoisses="getParoisses"  @close="close" v-if="dialog"></form_modal>
        <delete_modal @getParoisses="getParoisses" @close="close" v-if="dialog_delete"></delete_modal>
    </div>
</template>
<script>
import axios from 'axios'
import form_modal from '../components/paroisse/modals/add_paroisse.vue'
import delete_modal from '../components/paroisse/modals/delete_paroisse.vue'
import cotisation_modal from '../components/cotisations/modals/form_cotisation.vue'
export default {
    components:{
        delete_modal,
        form_modal,
        cotisation_modal,
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
            .get(this.url+'membres?district_select=' +this.district_select)
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
        delete_paroisse(item){
            this.dialog_delete=true,
            this.$store.state.paroisse = item
        },
        edit_paroisse(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.paroisse = item
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
      
        this.getConferences()
     },
    computed:{
        membres(){
            const membres = this.$store.state?.membres_cotisation
            return membres
        }
    }
}
</script>
<style src="../assets/css/table.css" scoped>
    
</style>