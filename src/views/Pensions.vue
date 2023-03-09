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
                        <th>Date</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="aba in pensions" :key="aba.id">
                        <td>{{ aba.membre[0]?.matricule_membre }}</td>
                        <td>{{aba.membre[0]?.nom_membre}}</td>
                        <td>{{aba.membre[0]?.prenom_membre}}</td>
                        <td>District x</td>
                        <td>{{ aba.membre[0]?.id_paroisse }}</td>
                        <td>{{ ageCal( aba.membre[0]?.date_naissance_membre) }} Ans</td>
                        <td>{{ aba.membre[0]?.id_categorie}}</td>
                        <td>{{datetime(aba.created_at)}}</td>
                        <td>
                            <div v-if="aba.membre[0]?.statut=='actif'" id="actif">
                                {{aba.membre[0]?.statut}}
                            </div>
                            <div v-if="aba.membre[0]?.statut=='abandon'" id="abandon">
                                {{aba.membre[0]?.statut}}
                            </div>
                            <div v-if="aba.membre[0]?.statut=='deserteur'" id="deserteur">
                                {{aba.membre[0]?.statut}}
                            </div>
                            <div v-if="aba.membre[0]?.statut=='pensionne'" id="pensionne">
                                {{aba.membre[0]?.statut}}
                            </div>
                        </td>
                       
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
        getPensions(){
            axios
            .get(this.url+'pensions')
            .then((res)=>{
                this.$store.state.pensions = res.data
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
            this.getPensions()
        },
        computed:{
            pensions(){
            const pensions = this.$store.state?.pensions
            return pensions
        },
    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>