<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title">Ajouter une Paroisse</div>
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
    props:['edit_district'],
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
        }
    },
    methods:{
        getDistricts(){
            this.$emit('getDistricts')
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
            if(this.edit_district){
                this.loading = true;
                axios.put(this.url+'update_district/'+this.$store.state.district.id,this.form)
                .then((response)=>{
                this.loading = false;
                this.close();
                this.getDistricts();
                this.$toast.success(`District Modifier`)  
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
                this.getDistricts();
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
        this.getDistricts()
        if(this.edit_district){
            this.form.nom_district = this.$store.state.district.nom_district;
            this.form.nom_sur_district = this.$store.state.district.nom_sur_district;
            this.form.email_sur_district = this.$store.state.district.email_sur_district;
            this.form.phone_sur_district = this.$store.state.district.phone_sur_district;
            this.form.id_conference = this.$store.state.district.id_conference;
            this.btn = 'Modifier'
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