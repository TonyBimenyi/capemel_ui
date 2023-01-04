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
                        <p><span>Matricule: </span> CAPEMEL-2022/01</p>
                        <p><span>Nom: </span> Bimenyimana</p>
                        <p><span>Prenom: </span> Tony Blaise</p>
                        <p><span>Nom du Pere: </span> Bimenyimana</p>
                        <p><span>Nom de la Mere: </span> Mbonigaruye</p>
                        <p><span>Date de Naissance: </span> Le 23/12/2022</p>
                        <p><span>Lieu de naissance: </span> Kabere,Mabayi, CIBITOKE</p>
                        <p><span>Telephone: </span> +257 76 161 970</p>
                        <p><span>No CIN: </span>531.90.34/89</p>
                        <p><span>Paroisse: </span> Ngagara</p>
                        <p><span>District: </span> Ntahangwa EST</p>
                        <p><span>Categorie Ministerielle: </span> Pasteur</p>
                        <p><span>Debut Ministere: </span> Le 23/12/2022</p>
                        <p><span>Debut Cotisations: </span> Le 23/12/2022</p>
                        <p><span>Date de mariage: </span> Le 23/12/2022</p>
                        <p><span>Statut: </span> Actif</p>
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
            nom_membre:'',
                prenom_membre:'',
                nom_pere_membre:'',
                nom_mere_membre:'',
                date_naissance_membre:'',
                colline_membre:'',
                commune_membre:'',
                province_membre:'',
                nationalite_conjoint:'',
                cin_membre:'',
                debut_ministere_membre:'',
                debut_cotisation_membre:'',
                date_mariage:'',
                email:'',
                telephone_membre:'',
                photo_membre:null,
                statut:'',
                id_uti:this.$store.state.user.user.id,
                id_paroisse:'',
                id_categorie:'',
                membres:[],
        }
    },
    methods:{
        viewInfo(item){
            this.info = true;
        },
        close(){
            this.info = false;
        },
        getMembres(){
            axios
            .get(this.url+'membres/'+this.post.id)
            .then((res)=>{
                this.$store.state.membres = res.data
                this.allData = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        
    },
    computed:{
            membres(){
            const membres = this.$store.state?.membres
            return membres
        },
    },
    mounted(){
        this.nom_membre = this.$store.state.membre.nom_membre;
        this.prenom_membre = this.$store.state.membre.nom_paroisse;
        this.nom_pere_membre = this.$store.state.membre.nom_paroisse;
        this.nom_mere_membre = this.$store.state.membre.nom_paroisse;
        this.date_naissance_membre = this.$store.state.membre.nom_paroisse;
        this.colline_membre = this.$store.state.membre.nom_paroisse;
        this.commune_membre = this.$store.state.membre.nom_paroisse;
        this.province_membre = this.$store.state.membre.nom_paroisse;
        this.nationalite_conjoint = this.$store.state.membre.nom_paroisse;
        this.cin_membre = this.$store.state.membre.nom_paroisse;
        this.debut_ministere_membre = this.$store.state.membre.nom_paroisse;
        this.debut_cotisation_membre = this.$store.state.membre.nom_paroisse;
        this.date_mariage = this.$store.state.membre.nom_paroisse;
        this.email = this.$store.state.membre.nom_paroisse;
        this.telephone_membre = this.$store.state.membre.nom_paroisse;
        this.photo_membre = this.$store.state.membre.nom_paroisse;
        this.statut = this.$store.state.membre.nom_paroisse;
        this.id_uti = this.$store.state.membre.nom_paroisse;
        this.id_paroisse = this.$store.state.membre.nom_paroisse;
        this.id_categorie = this.$store.state.membre.nom_paroisse;
        
    }
   
}
</script>
<style src="../assets/css/info.css" scoped>
  
</style>