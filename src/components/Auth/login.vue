<template>
    <div class="container">
        <div class="login_card">
            <div class="part1">
                <div class="card_info">
                    <p> <span style="text-align:center;font">Espace Personnel- CAPEML <br> </span> La mission de l’Église méthodiste libre est de faire connaître à toutes les personnes partout dans le monde l’appel de Dieu à la plénitude par le pardon et la sainteté en Jésus-Christ, et d’inviter à devenir membre et d’équiper pour le ministère tous ceux qui répondent par la foi.</p>
                </div>
            </div>
            <div class="part2">
                <div class="login_text">
                    <h1>CONNEXION</h1>
                </div>
                <div class="form">
                    <form @submit.prevent="submit">
                        <div class="input">
                            <input type="text" v-model="form.email" placeholder="Entrez le nom d'utilisateur...">
                        </div>
                        <div class="input">
                            <input type="password" v-model="form.password" placeholder="Mot de passe">
                        </div>
                        <p class="error">{{errorMessage}}</p>
                        <div class="login_btn">
                            <button>{{loading?"Chargement...":"Se connecter"}}</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import  axios from 'axios'
export default {
    data(){
        return{
            form:{
                email:'',
                password:'',
            },
            errorMessage:"",
            loading:false,
        }
    },
    methods:{
        submit(){
            this.loading = true;
            axios.post(this.$store.state.url+'login',this.form)
            .then((response)=>{
                this.loading = false;
                if(response.data.success){
                    this.$store.commit("login",JSON.stringify(response.data.data))               
                    alert('good')
                }
                this.$toast.error(`Bienvenue`)
               
            })
            .catch((error)=>{
                if (error.message == "Network Error"){
                    this.errorMessage = "Vous n'êtes pas connecté au serveur"
                  
                }else{
                    this.errorMessage = error.response.data.message;
                    this.loading = false;
                    this.$toast.error(`Verifier vos identifiants!`,{
                        position:"bottom-right"
                    });
                }
                
            })
        }
    }
}
</script>
<style src='../../assets/css/login.css' scoped>

</style>