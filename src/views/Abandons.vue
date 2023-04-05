<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button @click="printPage">Imprimer</button>
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
                   <input v-model="inputSearch" type="text" placeholder="Rechercher...">
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
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="aba in abandons" :key="aba.id">
                        <td>{{ aba.membre[0]?.matricule_membre }}</td>
                        <td>{{aba.membre[0]?.nom_membre}}</td>
                        <td>{{aba.membre[0]?.prenom_membre}}</td>
                        <td>{{aba.membre[0]?.paroisse[0]?.district[0]?.nom_district}}</td>
                        <td>{{aba.membre[0]?.paroisse[0]?.nom_paroisse}}</td>
                        <td>{{ ageCal( aba.membre[0]?.date_naissance_membre) }} Ans</td>
                        <td>Pasteur</td>
                        <td>{{datetime(aba.created_at_abandon)}}</td>
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
                        </td>
                        <td><button  id="mod_btn" @click="Restaurer(aba)">Restaurer</button></td>
                        <!-- <td><button @click="addCot(membre)"  id="mod_btn">Cotiser</button></td> -->
                        <td><button id="info_btn" @click="more_info(aba)">Voir Plus <i class='bx bx-dots-horizontal-rounded'></i></button></td>                  
                    </tr>          
                        
                </tbody>
                
            </table>         
        </div>
     <!-- <add_membre  @close="close" v-if="dialog"></add_membre> -->
     <cotisation_modal @getMembres="getMembres"  @close="close" v-if="dialog_cotisation"></cotisation_modal>
     <restaurer_abandon @getAbandons="getAbandons"  @close="close" v-if="dialog"></restaurer_abandon>
        
    </div>
    <div class="printCode">
        <div class="container">
            <div class="paper">
                <div class="header">
                    <div class="left">
                        <h2>EGLISE METHODISTE LIBRE AU BURUNDI</h2>
                        <h2>Conference General</h2>
                        <h2>Departement des pensions</h2>
                    </div>
                    <div class="title">
                        <h2>LISTE DES ABANDONS</h2>
                    </div>
                </div>
                <div class="body">
                    <div class="table">
                        <table>
                        <thead>
                            <tr>
                                <th>MATRICULE</th>
                                <th>NOM </th>
                                <th>PRENOM</th>
                                <th>DISTRICT</th>
                                <th>PAROISSES</th>
                                <th>CATEGORIE</th>
                                <th>TYPE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="aba in abandons" :key="aba.id">
                                <td>{{ aba.membre[0]?.matricule_membre }}</td>
                                <td>{{aba.membre[0]?.nom_membre}}</td>
                                <td>{{aba.membre[0]?.prenom_membre}}</td>
                                <td>Ntahangwa Est</td>
                                <td>Nyakabondo</td>
                                <td>Pasteur</td>
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
                                </td>                        
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    
        </div>
</template>
<script>
import axios from 'axios'
import add_membre from '../components/membres/modals/add_membre.vue'
import cotisation_modal from '../components/cotisations/modals/form_cotisation.vue'
import restaurer_abandon from '../components/abandons/modals/restaurer.vue'
export default{
    components:{
        add_membre,
        cotisation_modal,
        restaurer_abandon
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
            paroisse:''
        }
    },
    methods:{
        printPage(){
            
            window.print();
        },
        searchInDBAll(){
            axios
            .get(this.url+'abandons?district_select=' + this.district_select + '&id_paroisse=' +this.form.id_paroisse + '&date_debut=' +this.date_debut + '&date_fin=' + this.date_fin )
            .then((res)=>{
                this.$store.state.abandons=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

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
        Restaurer(item){
            this.dialog = true
            this.$store.state.abandon = item
        },
        close(){
            this.dialog=false
            this.dialog_cotisation = false
        },
        getAbandons(){
            axios
            .get(this.url+'abandons')
            .then((res)=>{
                this.$store.state.abandons = res.data
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
            this.getAbandons()
            this.getDistricts()
        },
        computed:{
            abandons(){
                return this.$store.state.abandons.filter(item => {
                    return(
                        item.membre[0]?.nom_membre.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1 ||
                        item.membre[0]?.prenom_membre.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1 
                    
                    )
            })
        },
    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>