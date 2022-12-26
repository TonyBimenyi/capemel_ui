<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <select name="" id="">
                        <option value="">--CONFERENCE--</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <div class="search">
                   <input type="text" placeholder="Rechercher...">
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
                        <th>#ID</th>
                        <th>Nom du District</th>
                        <th>Conference</th>
                        <th>Surintandant</th>
                        <th>Telephone</th>
                        <th>Email</th>
                        <th>Enregiste au</th>
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="dis in districts" :key="dis.id">
                        <td>{{dis.id}}</td>
                        <td>{{dis.nom_district}}</td>
                        <td>{{dis.id_conference}}</td>
                        <td>{{dis.nom_sur_district}}</td>                        
                        <td>{{dis.phone_sur_district}}</td>
                        <td>{{dis.email_sur_district}}</td>
                        <td>{{datetime(dis.created_at)}}</td>
                        <td><button @click="edit_district(dis)" id="mod_btn">Modifier</button></td>
                        <td><button @click="delete_district(dis)" id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                </tbody>
                
            </table>         
        </div>
     
        <form_modal @update="getDistricts" :edit_district="modifier" @getDistricts="getDistricts"  @close="close" v-if="dialog"></form_modal>
        <delete_modal @getDistricts="getDistricts" @close="close" v-if="dialog_delete"></delete_modal>
    </div>
</template>
<script>
import axios from 'axios'
import form_modal from '../components/district/modals/form_modal.vue'
import delete_modal from '../components/district/modals/delete_district_modal.vue'
export default {
    components:{
        delete_modal,
        form_modal
    },
    data(){
        return{
            modifier:false,
            dialog:false,
            allData:[],
            dialog_delete:false,
        }
    },
    methods:{
        getConferences(){
            axios
            .get(this.url+'conferences')
            .then((res)=>{
                this.conferences = res.data
                this.allData = res.data
              
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }, 
        delete_district(item){
            this.dialog_delete=true,
            this.$store.state.district = item
        },
        edit_district(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.district = item
        },
        close(){
            this.dialog = false
            this.dialog_delete  = false
        },
        getDistricts(){
            axios
            .get(this.url+'districts')
            .then((res)=>{
                this.$store.state.districts = res.data
                this.allData = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
      
    },
    mounted(){
        this.getDistricts()
        this.getConferences()
     },
    computed:{
        districts(){
            const districts = this.$store.state?.districts
            return districts
        }
    }
}
</script>
<style src="../assets/css/table.css" scoped>
    
</style>