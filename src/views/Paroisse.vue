<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <select @change="sortDistrict" v-model="conference_select" name="" id="">
                        <option :value="0">--CONFERENCE--</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select   name="" id="">
                        <option :value="0">--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <div class="search">
                   <input v-model="inputSearch" @keydown="inputSearchMethods" type="text" placeholder="Rechercher...">
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
                        <th>Nom de la Paroisse</th>
                        <!-- <th>Conference</th> -->
                        <th>District</th>
                        <th>Enregiste au</th>
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="par in paroisses" :key="par.id">
                        <td>{{par.id}}</td>
                        <td>{{par.nom_paroisse}}</td>
                        <td>{{par.district[0]?.nom_district}}</td>             
                        <td>{{datetime(par.created_at)}}</td>
                        <td><button @click="edit_paroisse(par)" id="mod_btn">Modifier</button></td>
                        <td><button @click="delete_district(par)" id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                </tbody>
                
            </table>         
        </div>
     
        <form_modal @update="getParoisses" :edit_paroisse="modifier" @getParoisses="getParoisses"  @close="close" v-if="dialog"></form_modal>
        <delete_modal @getDistricts="getDistricts" @close="close" v-if="dialog_delete"></delete_modal>
    </div>
</template>
<script>
import axios from 'axios'
import form_modal from '../components/paroisse/modals/add_paroisse.vue'
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
            conferences:[],
            conference_select:'',
            inputSearch:'',
            districts:[],
        }
    },
    methods:{
        sortDistrict(){
            axios
            .get(this.url+'districts?conference_select=' +this.conference_select)
            .then((res)=>{
                this.$store.state.districts = res.data
                if(this.conference_select!=0){
                    this.allData = res.data
                    this.districts = res.data
                 }
                 else{
                    this.districts=false
                 }
                console.log(this.conference_select)
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        searchInDb(){
            axios
            .get(this.url+'districts?conference_select=' +this.conference_select)
            .then((res)=>{
                this.$store.state.districts = res.data
                this.allData = res.data
                this.links = res.data
                console.log(this.conference_select)
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        },
        inputSearchMethods(){
            this.$store.state.paroisses = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))          
        },
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
        edit_paroisse(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.paroisse = item
        },
        close(){
            this.dialog = false
            this.dialog_delete  = false
        },
        getParoisses(){
            axios
            .get(this.url+'paroisses')
            .then((res)=>{
                this.$store.state.paroisses = res.data
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
        this.getParoisses()
        this.getConferences()
     },
    computed:{
        paroisses(){
            const paroisses = this.$store.state?.paroisses
            return paroisses
        }
    }
}
</script>
<style src="../assets/css/table.css" scoped>
    
</style>