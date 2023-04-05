<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <select @change="sortParoisse()" v-model="district_select"  id="">
                        <option selected  value="">--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select  v-model="form.id_paroisse"  name="" id="">
                        <option selected  value="" >--PAROISSE--</option>
                        <option v-for="par in paroisses" :key="par.id" :value="par.id">{{par.nom_paroisse}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <input  v-model="date_debut" class="select_"  type="date" name="" id="">
                </div>
                <div class="btn1">
                    <input class="select_"  v-model="date_fin"  type="date" name="" id="">
                </div>
                <div class="search_btn">
                    <button @click="searchInDBAll()">Valider</button>
                </div>
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
             
                <div class="search">
                   <input v-model="inputSearch"  type="text" placeholder="Rechercher...">
                </div>
            </div>
            <div class="part_right">
                
                <!-- <div class="add_btn">
                    <button @click="dialog=true,modifier=false">+</button>
                </div> -->
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
                        <td colspan="100">
                        </td>
                    </tr>
                   
                    <tr v-for="pen in pensionsListe" :key="pen">
                        <td>{{pen.id}}</td>
                        <td>{{pen.nom_membre}}</td>
                        <td>{{pen.prenom_membre}}</td>
                        <td>{{pen.nom_district}}</td>
                        <td>{{pen.nom_paroisse}}</td>
                        <td>{{ ageCal(pen.date_naissance_membre) }} Ans</td>
                        <td>{{ pen.nom_categorie }}</td>
                        <td>{{ datetime(pen.created_at_pension) }} </td>
                        <td>
                          
                            <div v-if="pen.statut=='pensionne'" id="pensionne">
                                {{pen.statut}}
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
            inputSearch:'',
            district_select:'',
            districts:'',
            date_debut:'',
            date_fin:'',
            form:{
                id_paroisse:'',
            },
            paroisses: [],
            paroisse:'',
            pensionsListe : [],
        }
    },
    methods:{
        close(){
            this.dialog=false
            this.dialog_cotisation = false
        },
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
        searchInDBAll(){
            axios
            .get(this.url+'pensions?district_select=' + this.district_select + '&id_paroisse=' +this.form.id_paroisse + '&date_debut=' +this.date_debut + '&date_fin=' + this.date_fin )
            .then((res)=>{
                this.$store.state.pensions=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

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
        getPensions(){
            axios
            .get(this.url+'pensions')
            .then((res)=>{
                this.pensionsListe = res.data

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
            this.getDistricts()
        },
        computed:{

        
    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>