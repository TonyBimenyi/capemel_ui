<template>
    <div class="container">
        <div class="login_card">
            <div class="part1">
                <div class="card_info">
                    <p> <span style="text-align:center">Espace Personnel <br> </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic optio earum quidem vero officiis possimus quis pariatur illum laborum fuga qui cum, debitis excepturi aliquid eos doloribus labore aspernatur cupiditate.</p>
                </div>
            </div>
            <div class="part2">
                <div class="login_text">
                    <h1>CONNEXION</h1>
                </div>
                <div class="form">
                    <form @submit.prevent="submit">
                        <div class="input">
                            <input type="text" v-model="form.email" placeholder="Entrez l'Email...">
                        </div>
                        <div class="input">
                            <input type="text" v-model="form.password" placeholder="Mot de passe">
                        </div>
                        <p class="error">{{errorMessage}}</p>
                        <div class="login_btn">
                            <button :disabled="disableSubmitButton">{{loading?"Chargement...":"Se connecter"}}</button>
                            
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
                email:'admin@gmail.com',
                password:'12345678',
            },
            errorMessage:"",
            loading:false,
        }
    },
    methods:{
        submit(){
            this.loading = true;
            axios.post(this.$store.state.url+'login/',this.form)
            .then((response)=>{
                this.loading = false;
                if(response.data.success){
                    this.$store.commit("login",JSON.stringify(response.data.data))
                    
                }
                this.router.push('/users')
               
            })
            .catch((error)=>{
                if (error.message == "Network Error"){
                    this.errorMessage = "Vous n'êtes pas connecté au serveur"
                }else{
                    this.errorMessage = error.response.data.message;
                    this.loading = false;

                }
                
            })
        }
    }
}
</script>
<style src='../../assets/css/login.css' scoped>

</style>