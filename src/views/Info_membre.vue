<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <button>Voir les Cotisations</button>
                </div>
                <div class="btn1">
                    <button>Ajouter aux abandons</button>
                </div>
                <div class="btn1">
                    <button>Ajouter aux pensionnes</button>
                </div>
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <button @click="dialog=true,modifier=false">+</button>
                </div>
            </div>
        </div>
        <div class="body_part">
            <div class="header_info">
                <div class="photos">
                    <div class="photo">
                        <p>Homme</p>
                    </div>
                    <div class="photo">
                        <p>Femme</p>
                    </div>
                </div>
                <div class="title">
                    <h1>Fiche d'identification personnel</h1>
                </div>
            </div>
            <div class="separation">
                <p></p>
            </div>
            <div class="body_info">
                <div class="part">
                    <div class="title_pers">
                        <p>Membre</p>
                    </div>
                    <div v-bind="members" class="info_membre">
                        <p><span>Matricule: </span> {{membre[0]?.matricule_membre}}</p>
                        <p><span>Nom: </span> {{membre[0]?.nom_membre}}</p>
                        <p><span>Prenom: </span>{{membre[0]?.prenom_membre}}</p>
                        <p><span>Nom du Pere: </span> {{membre[0]?.nom_pere_membre}}</p>
                        <p><span>Nom de la Mere: </span> {{membre[0]?.nom_mere_membre}}</p>
                        <p><span>Date de Naissance: </span>{{membre[0]?.date_naissance_membre}}, ({{ ageCal(membre[0]?.date_naissance_membre) }} Ans)</p>
                        <p><span>Lieu de naissance: </span>{{membre[0]?.colline_membre}}, {{membre[0]?.commune_membre}}, {{membre[0]?.province_membre.toUpperCase()}}</p>
                        <p><span>Telephone: </span>{{membre[0]?.telephone_membre}}</p>
                        <p><span>No CIN: </span>{{membre[0]?.cin_membre}}</p>
                        <p><span>Paroisse: </span> {{membre[0]?.paroisse[0]?.nom_paroisse}}</p>
                        <p><span>District: </span> Ntahangwa EST</p>
                        <p><span>Categorie Ministerielle: </span> {{membre[0]?.categorie[0]?.nom_categorie}}</p>
                        <p><span>Debut Ministere: </span>Le {{membre[0]?.debut_ministere_membre}}</p>
                        <p><span>Debut Cotisations: </span> {{ membre[0]?.debut_cotisation_membre }}</p>
                        <p><span>Date de mariage:Le </span>{{ membre[0]?.date_mariage }}</p>
                        <p><span>Statut: </span> <span v-if="membre[0]?.statut=='actif'" id="actif"> {{membre[0]?.statut}}</span> </p>
                    </div>
                </div>
                <div class="part">
                    <div class="title_pers">
                        <p>Conjoint(e)</p>
                    </div>
                    <div v-if="conjoint.length>0" v-bind="members" class="info_membre">
                        <p><span>Nom: </span> {{conjoint[0]?.nom_conjoint}}</p>
                        <p><span>Prenom: </span>{{conjoint[0]?.prenom_conjoint}}</p>
                        <p><span>Nom du Pere: </span> {{conjoint[0]?.nom_pere_conjoint}}</p>
                        <p><span>Nom de la Mere: </span> {{conjoint[0]?.nom_mere_conjoint}}</p>
                        <p><span>Date de Naissance: </span>{{conjoint[0]?.date_naissance_conjoint}}, ({{ ageCal(conjoint[0]?.date_naissance_conjoint) }} Ans)</p>
                        <p><span>Lieu de naissance: </span>{{conjoint[0]?.colline_conjoint}}, {{conjoint[0]?.commune_conjoint}}, {{conjoint[0]?.province_conjoint.toUpperCase()}}</p>
                        <p><span>Telephone: </span>{{conjoint[0]?.telephone_conjoint}}</p>
                        <p><span>No CIN: </span>{{conjoint[0]?.cin_conjoint}}</p>
                        <p><span>Paroisse: </span> {{conjoint[0]?.paroisse[0]?.nom_paroisse}}</p>
                        <p><span>District: </span> Ntahangwa EST</p>
                        <p><span>Etat Civil: </span>{{ conjoint[0]?.etat_civil_conjoint }}</p>
                        <p><span>Fonction: </span>{{ conjoint[0]?.fonction_conjoint }}</p>
                        <p><span>Date de mariage:Le </span>{{ membre[0]?.date_mariage }}</p>
                        <div class="action_btns">
                            <div class="btn">
                                <button @click="editConjoint(conjoint[0])" id="mod_btn">Modifier</button>
                            </div>
                            <div class="btn">
                                <button  @click="deleteConjont(conjoint[0])" id="delete_btn">Supprimer</button>
                            </div>
                        </div>
                    </div>
                    <div v-else v-bind="members" class="info_conjoint">
                        <h6>Aucun(e) conjoint(e) correspond à {{ membre[0]?.nom_membre }} {{ membre[0]?.prenom_membre }}</h6>
                        <div class="add_conjoint_btn">
                            <button @click="dialog_conjoint=true;modifier=false"> <span><i class='bx bx-folder-plus'></i></span> Ajouter un(e) Conjoint(e)</button>
                        </div>
                    </div>
                </div>
                <div class="part" id="enfant_list">
                    <div class="title_pers">
                        <p>Enfant(s)</p>
                    </div>
                    <div v-bind="members" class="info_membre">
                       <table>
                        <thead>
                            <tr>
                                <th>Nom et Prenom</th>
                                <th>Date de Naissance</th>
                                <th colspan="2">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="en in enfants" :key="en.id">
                                <td>{{en.nom_enfant}} {{en.prenom_enfant}}</td>
                                <td>{{en.date_naissance_enfant}}, ({{ageCal(en.date_naissance_enfant)}} Ans)</td>
                                <td><button @click="delete_paroisse(par)" id="mod_btn"><i class='bx bxs-trash'></i></button></td>    
                                <td><button @click="delete_paroisse(par)" id="delete_btn"><i class='bx bxs-trash'></i></button></td>    
                            </tr>
                        </tbody>
                       </table>
                        <div class="enfant_action_btns">
                            <div class="btn">
                                <button @click="dialog_enfant=true;modifier=false" id="mod_btn">Ajouter un enfant</button>
                            </div>
                        </div>
                    </div>
                   
                </div>

            </div>
        </div>
        
     <add_conjoint @update="getConjoint" :edit_conjoint="modifier" @getConjoint="getConjoint" @close="close" v-if="dialog_conjoint"></add_conjoint>
     <delete_modal @getConjoint="getConjoint" @close="close" v-if="dialog_delete"></delete_modal>
     <enfant_modal @getEnfants="getEnfants" :edit_enfant="modifier_enfant" @close="close" v-if="dialog_enfant"></enfant_modal>
    </div>
</template>
<script>
import axios from 'axios'
import add_conjoint from '../components/conjoints/modals/add_conjoint.vue'
import delete_modal from '../components/conjoints/modals/delete_conjoint.vue'
import enfant_modal from '../components/enfants/modals/enfant_form.vue'
export default {
    components:{
        add_conjoint,
        delete_modal,
        enfant_modal
    },
    data(){
        return{
                 info:false,
                membre:{},
                conjoint:{},
                enfants:[],
                dialog_conjoint:false,
                modifier:false,
                dialog_delete:false,
                dialog_enfant:false,
                enfant_modal:false,
        };
    },
    methods:{
        editConjoint(item){
            this.dialog_conjoint=true;
            this.modifier=true;
            this.$store.state.conjoint = item;
        },
        deleteConjont(item){
            this.dialog_delete=true;
            this.$store.state.conjoint = item;
        },
        ageCal(n){
                        let currentDate = new Date();
                        let birthdate = + new Date(n);
                        // console.log(this.$store.state.membres[i].date_naissance_membre);
                        let difference = currentDate - birthdate;
                        let age = Math.floor(difference/31557600000);
                        return age;
        },
        viewInfo(item){
            this.info = true;
        },
        close(){
            this.modifier=false,
            this.info = false;
            this.dialog_conjoint=false;
            this.dialog_delete = false;
            this.dialog_enfant = false;
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
        getConjoint(){
            let pk = this.$route.params.id
            axios
            .get(this.url+'conjoint/'+pk)
            .then((res)=>{
                this.$store.state.membre = res.data
                this.conjoint = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        getEnfants(){
            let pk = this.$route.params.id
            axios
            .get(this.url+'enfants/'+pk)
            .then((res)=>{
                this.$store.state.enfants = res.data
                this.enfants = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        
    },
    // computed:{
    //         membre(){
    //         const membre = this.$store.state?.membre
    //         return membre
    //     },
    // },
    
    mounted(){
        this.getMembres()
        this.getConjoint()
        this.getEnfants()
    }
   
}
</script>
<style src="../assets/css/info.css" scoped>
  
</style>