<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title"><h5>{{ modal_title }}</h5></div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    <input id="firstname" v-model="form.nom_paroisse" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom Paroisse*</label>
                </div>
                <div class="input-container ic2">
                    <select class="input" v-model="form.id_district" name="" id="">
                        <option value="">--Selectionner le District--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Conference</label>
                </div>
                
        </div>
       
            
         </div>
      <button  class="submit" @click="saveParoisse()">{{loading?"Chargement...":btn}}</button>
    </div>
</transition>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['edit_paroisse'],
    data(){
        return{
            form:{
                nom_paroisse:'',
                id_district:'',
            },
            btn:'Enregister',
            districts:[],
            errorMessage:"",
            loading:false,
            modal_title:'Ajouter une Paroisse',
        }
    },
    methods:{
        getParoisses(){
            this.$emit('getParoisses')
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
        close(){
            this.$emit('close')
        },
        saveParoisse(){
           
            if(this.edit_paroisse){
                this.loading = true;
                axios.put(this.url+'update_paroisse/'+this.$store.state.paroisse.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getParoisses();
                this.$toast.success(`Paroisse Modifier`)  
                })
                .catch((error)=>{
                    if (error.message == "Network Error"){
                        this.errorMessage = "Vous n'êtes pas connecté au serveur"
                    
                    }else{
                        this.errorMessage = error.response.data.message;
                        this.loading = false;
                        this.$toast.error(error.response.data.message,{
                            position:"bottom-right"
                        });
                    }
                    
                })
            }
            else{
         
            this.loading = true;
            axios.post(this.url+'store_paroisse',this.form)
            .then((response)=>{
                this.loading = false;
                this.close();
                // this.getUsers();
                this.getParoisses();
                this.$toast.success(`Paroisse enregistre`)  
            })
            .catch((error)=>{
                if (error.message == "Network Error"){
                    this.errorMessage = "Vous n'êtes pas connecté au serveur"
                  
                }else{
                    this.errorMessage = error.response.data.message;
                    this.loading = false;
                    this.$toast.error(error.response.data.message,{
                        position:"bottom-right"
                    });
                }
                
            })
         }
        },
    },
    mounted(){
        this.getDistricts()
        this.getParoisses()
        if(this.edit_paroisse){
            this.form.nom_paroisse = this.$store.state.paroisse.nom_paroisse;
            this.form.id_district = this.$store.state.paroisse.id_district;
            this.btn = 'Modifier'
            this.modal_title = 'Modifier '+this.$store.state.paroisse.nom_paroisse; 
        }
    }
}
</script>
<style src='../../../assets/css/modal.css' scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
</style>