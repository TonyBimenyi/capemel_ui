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
                                <button id="mod_btn">Modifier</button>
                            </div>
                            <div class="btn">
                                <button id="delete_btn">Supprimer</button>
                            </div>
                        </div>
                    </div>
                    <div v-else v-bind="members" class="info_conjoint">
                        <h6>Aucun(e) conjoint(e) correspond à {{ membre[0]?.nom_membre }} {{ membre[0]?.prenom_membre }}</h6>
                        <div class="add_conjoint_btn">
                            <button @click="dialog_conjoint=true;"> <span><i class='bx bx-folder-plus'></i></span> Ajouter un(e) Conjoint(e)</button>
                        </div>
                    </div>
                </div>
                <div class="part">
                    <div class="title_pers">
                        <p>Enfant(s)</p>
                    </div>
                </div>

            </div>
        </div>
        
     <add_conjoint @getConjoint="getConjoint" @close="close" v-if="dialog_conjoint"></add_conjoint>
   
    </div>
</template>
<script>
import axios from 'axios'
import add_conjoint from '../components/conjoints/modals/add_conjoint.vue'
export default {
    components:{
        add_conjoint
    },
    data(){
        return{
                 info:false,
                membre:{},
                conjoint:{},
                dialog_conjoint:false,
        };
    },
    methods:{
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
            this.info = false;
            this.dialog_conjoint=false;
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
    }
   
}
</script>
<style src="../assets/css/info.css" scoped>
  
</style>