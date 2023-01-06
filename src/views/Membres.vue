<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <select @change="sortDistrict" class="select_"   v-model="conference_select" name="" id="">
                        <option selected value="">{{ conf_text }}</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select class="select_" @change="searchInDb" v-model="district_select"  name="" id="">
                        <option >--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <input class="select_"  type="date" name="" id="">
                </div>
                <div class="btn1">
                    <input class="select_"  type="date" name="" id="">
                </div>
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <div class="search">
                   <input v-model="inputSearch" @keydown="inputSearchMethods" type="text" placeholder="Rechercher...">
                </div>
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <button @click="dialog=true,modifier=false">+</button>
                </div>
            </div>
        </div>
        <div class="table_content">
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
                        <th>Debut Ministere</th>
                        <th>Status</th>
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="membre in membres" :key="membre.id">
                        <td>{{ membre.matricule_membre }}</td>
                        <td>{{membre.nom_membre}}</td>
                        <td>{{membre.prenom_membre}}</td>
                        <td>District x</td>
                        <td>{{ membre.paroisse[0]?.nom_paroisse }}</td>
                        <td>{{ ageCal(membre.date_naissance_membre) }} Ans</td>
                        <td>{{membre.categorie[0]?.nom_categorie}}</td>
                        <td>{{datetime(membre.debut_ministere_membre)}}</td>
                        <td>
                            <div v-if="membre.statut=='actif'" id="actif">
                                {{membre.statut}}
                            </div>
                        </td>
                        <td><button  id="mod_btn">Modifier</button></td>
                        <td><button @click="addCot(membre)"  id="mod_btn">Cotiser</button></td>
                        <td><button id="info_btn" @click="more_info(membre)"> <i class='bx bx-dots-horizontal-rounded'></i></button></td>                  
                    </tr>          
                        
                </tbody>
                
            </table>         
        </div>
     <add_membre  @close="close" v-if="dialog"></add_membre>
     <cotisation_modal @getMembres="getMembres"  @close="close" v-if="dialog_cotisation"></cotisation_modal>
        
    </div>
</template>
<script>
import axios from 'axios'
import add_membre from '../components/membres/modals/add_membre.vue'
import cotisation_modal from '../components/cotisations/modals/form_cotisation.vue'
export default{
    components:{
        add_membre,
        cotisation_modal
    },
    data(){
        return{
            dialog:false,
            dialog_cotisation:false,
            membres:[],
        }
    },
    methods:{
        close(){
            this.dialog=false
            this.dialog_cotisation = false
        },
        getMembres(){
            axios
            .get(this.url+'membres')
            .then((res)=>{
                this.$store.state.membres = res.data
                this.allData = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.res.data.message)
                console.log(error.res.data.message)
            })
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
        }
        
        
    },
        mounted(){
            this.getMembres()
        },
        computed:{
            membres(){
            const membres = this.$store.state?.membres
            return membres
        },
    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>