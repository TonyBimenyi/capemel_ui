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
                        <p><span>Date de Naissance: </span>{{membre[0]?.date_naissance_membre}}</p>
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
                </div>
                <div class="part">
                    <div class="title_pers">
                        <p>Enfant(s)</p>
                    </div>
                </div>

            </div>
        </div>
        
     <info_membre @close="close" v-if="info"></info_membre>
   
    </div>
</template>
<script>
import axios from 'axios'

export default {
    
    data(){
        return{
            info:false,
                membre:{},
        };
    },
    methods:{
        viewInfo(item){
            this.info = true;
        },
        close(){
            this.info = false;
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
        
    },
    // computed:{
    //         membre(){
    //         const membre = this.$store.state?.membre
    //         return membre
    //     },
    // },
    
    mounted(){
        this.getMembres()
        
    }
   
}
</script>
<style src="../assets/css/info.css" scoped>
  
</style>