<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button @click="printPage">Imprimer</button>
                </div>
                <div class="btn1">
                    <select @change="sortParoisse(),searchInDbDistrict()" v-model="district_select"  id="">
                        <option selected  value="">--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select @change="searchInDbParoisse()" v-model="form.id_paroisse"  name="" id="">
                        <option selected  value="" >--PAROISSE--</option>
                        <option v-for="par in paroisses" :key="par.id" :value="par.id">{{par.nom_paroisse}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <input @change="dateDebut()" v-model="date_debut" class="select_"  type="date" name="" id="">
                </div>
                <div class="btn1">
                    <input class="select_" @change="dateFin()" v-model="date_fin"  type="date" name="" id="">
                </div>
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <div class="search_btn">
                    <button @click="searchInDBAll()">Valider</button>
                </div>
                <div class="search">
                   <input v-model="inputSearch" type="text" placeholder="Rechercher...">
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
                    <tr v-for="membre in membres" :key="membre.matricule_membre">
                        <td>{{ membre.matricule_membre }}</td>
                        <td>{{membre.nom_membre}}</td>
                        <td>{{membre.prenom_membre}}</td>
                        <td>{{membre.nom_district}}</td>
                        <td>{{ membre.paroisse[0]?.nom_paroisse }}</td>
                        <td>{{ ageCal(membre.date_naissance_membre) }} Ans</td>
                        <td>{{membre.categorie[0]?.nom_categorie}}</td>
                        <td>{{datetime(membre.debut_ministere_membre)}}</td>
                        <td>
                            <div v-if="membre.statut=='actif'" id="actif">
                                {{membre.statut}}
                            </div>
                            <div v-if="membre.statut=='abandon'" id="abandon">
                                {{membre.statut}}
                            </div>
                            <div v-if="membre.statut=='deserteur'" id="deserteur">
                                {{membre.statut}}
                            </div>
                            <div v-if="membre.statut=='pensionne'" id="pensionne">
                                {{membre.statut}}
                            </div>
                        </td>
                        <td><button @click="edit_membre(membre)"  id="mod_btn">Modifier</button></td>
                        <!-- <td><button @click="addCot(membre)"  id="mod_btn">Cotiser</button></td> -->
                        <td><button id="info_btn" @click="more_info(membre)">Voir Plus <i class='bx bx-dots-horizontal-rounded'></i></button></td>                  
                    </tr>          
                        
                </tbody>
                
            </table>         
        </div>
     <add_membre @getMembres="getMembres" :edit_membre="modifier" @close="close" v-if="dialog"></add_membre>
     <cotisation_modal @getMembres="getMembres"  @close="close" v-if="dialog_cotisation"></cotisation_modal>
        
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
                        <h2>LISTE DES MEMBRES</h2>
                        
                    </div>
                </div>
                <div class="body">
                    <div class="table">
                        <table>
                        <thead>
                            <tr>
                                <th>MATRICULE</th>
                                <th>NOM</th>
                                <th>PRENOM</th>
                                <th>DISTRICT</th>
                                <th>PAROISSE</th>
                                <th>CATEGORIE</th>
                                <th>STATUT</th>
                        
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="membre in membres" :key="membre.matricule_membre">
                                <td>{{membre.matricule_membre}}</td>
                                <td>{{membre.nom_membre}}</td>
                                <td>{{membre.prenom_membre}}</td>
                                <td>{{membre.nom_district}}</td>
                                <td>{{ membre.paroisse[0]?.nom_paroisse }}</td> 
                                <td>{{membre.categorie[0]?.nom_categorie}}</td>
                                <td>
                                    <div v-if="membre.statut=='actif'" id="actif">
                                        {{membre.statut}}
                                    </div>
                                    <div v-if="membre.statut=='abandon'" id="abandon">
                                        {{membre.statut}}
                                    </div>
                                    <div v-if="membre.statut=='deserteur'" id="deserteur">
                                        {{membre.statut}}
                                    </div>
                                    <div v-if="membre.statut=='pensionne'" id="pensionne">
                                        {{membre.statut}}
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
export default{
    components:{
        add_membre,
        cotisation_modal
    },
    data(){
        return{
            modifier:false,
            dialog:false,
            dialog_cotisation:false,
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
            .get(this.url+'membres?district_select=' + this.district_select + '&id_paroisse=' +this.form.id_paroisse + '&date_debut=' +this.date_debut + '&date_fin=' + this.date_fin )
            .then((res)=>{
                this.$store.state.membres=res.data
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
     
        edit_membre(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.membre = item
        },
        
        more_info(n){
            this.$router.push({name:'info_membre', params:{id:n.matricule_membre}})
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
            this.getDistricts()
            this.getMembres()
        },
        computed:{
            membres(){
                return this.$store.state.membres.filter(item => {
                    return(
                        item.matricule_membre.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1 ||
                        item.nom_membre.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1 ||
                        item.prenom_membre.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1 
                    
                    )
            })
        },

    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>