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
                    <select @change="searchInDb" v-model="district_select"  name="" id="">
                        <option selected value="">--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select v-model="form.trimestre"  name="" id="">
                        <option selected disabled value="">--TRIMESTRE--</option>
                        <option value="1er Trimestre">1er Trimestre</option>
                        <option value="2eme Trimestre">2eme Trimestre</option>
                        <option value="3eme Trimestre">4eme Trimestre</option>
                        <option value="4eme Trimestre">4eme Trimestre</option>
                    </select>
                </div>
                <div class="annee">
                    <input v-model="form.annee" id="annee"  type="number" placeholder="Annee...">
                 </div>
                 
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
               
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <button @click="saveCotisations()" >+</button>
                </div>
            </div>
        </div>
        <div class="table_content">
            <table>
                <thead>
                    <tr>
                        <th>Matricuke</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Paroisse</th>
                        <th>Categorie</th>
                        <th>Montant à cotisé</th>
                        <th>Montant Paye</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="(membre,m) in membres" :key="membre.matricule_membre">
                        <td>{{membre.matricule_membre}}</td>
                        <td>{{membre.nom_membre}}</td>
                        <td>{{membre.prenom_membre}}</td>             
                        <td>{{membre.paroisse[0]?.nom_paroisse}}</td>
                        <td>{{membre.categorie[0]?.nom_categorie}}</td>
                        <td>{{money(membre.categorie[0]?.montant_a_paye)}} Fbu</td>
                        <td>
                            <div class="search">
                                <input v-model="form.montant_paye[m]"  type="text" placeholder="Entrer le montant...">
                            </div> 
                        </td>
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
export default {
    components:{
        delete_modal,
        form_modal
    },
    data(){
        return{
            modifier:false,
            dialog:false,
            allData:[],
            dialog_delete:false,
            conferences:[],
            conference_select:'',
            district_select:'',
            inputSearch:'',
            districts:[],
            conf_text:'--CONFERENCE--',
            annee:new Date().getFullYear(),
            form:{
                id_uti:this.$store.state.user.user.id,
                trimestre:'',
                annee:new Date().getFullYear(),
                montant_paye:{},
                montant_a_paye:this.$store.state.membre_cot[0]?.categorie.montant_a_paye,
                cotis:this.$store.state.membre_cot
            }
            
        }
    },
    methods:{
        // saveCoti(){
        //     this.carts.push(this.$store.state.membre_cot);
        //     console.log(this.carts)
        //     this.$store.state.carts = this.carts
        // },  
        saveCotisations(){
            axios.post(this.url+'store_cotisation',this.form,this.headers)
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
                    this.$toast.error(error.data.message,{
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
            .get(this.url+'membres?district_select=' +this.district_select)
            .then((res)=>{
                this.$store.state.membre_cot = res.data
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
        },
        getParoisses(){
            axios
            .get(this.url+'paroisses')
            .then((res)=>{
                this.$store.state.paroisses = res.data
                this.allData = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
      
    },
    mounted(){
        this.getParoisses()
        this.getConferences()
     },
    computed:{
        membres(){
            const membres = this.$store.state?.membre_cot
            return membres
        }
    }
}
</script>
<style src="../assets/css/table.css" scoped>
    
</style>