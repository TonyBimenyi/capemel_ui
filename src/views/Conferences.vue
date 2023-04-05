<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <!-- <div class="btn1">
                    <button @click="printPage">Imprimer</button>
                </div>
                <div class="btn1">
                    <select style="width:250px" @change="searchInDb" v-model="conference_select" name="" id="">
                        <option value="">--CONFERENCE--</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div> -->
                <!-- <div class="btn1">
                    <button>Importer</button>
                </div> -->
                <!-- <div  class="search">
                   <input style="width:250px" v-model="inputSearch" type="text" placeholder="Rechercher...">
                </div> -->
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
                        <th>Nom de la conference</th>
                        
                        <!-- <th>Telephone</th>
                        <th>Email</th> -->
                        <th>Enregiste au</th>
                        <th colspan="2">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="dis in conferences" :key="dis.id">
                        <td>{{dis.id}}</td>
                        <td>{{dis.nom_conference}}</td>
                        <!-- <td>{{dis.nom_sur_district}}</td>                         -->
                        <!-- <td>{{dis.phone_sur_district}}</td>
                        <td>{{dis.email_sur_district}}</td> -->
                        <td>{{datetime(dis.created_at)}}</td>
                        <td><button @click="edit_district(dis)" id="mod_btn">Modifier</button></td>
                        <td><button @click="delete_district(dis)" id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                </tbody>
                
            </table>         
        </div>
     
        <form_modal @update="getConferences" :edit_district="modifier" @getConferences="getConferences"  @close="close" v-if="dialog"></form_modal>
        <delete_modal @getConferences="getConferences" @close="close" v-if="dialog_delete"></delete_modal>
    </div>
   
</template>
<script>
import axios from 'axios'
import form_modal from '../components/conferences/modals/form_modal.vue'
import delete_modal from '../components/conferences/modals/delete_conference.vue'
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
            // conferences:[],
            conference_select:'',
            inputSearch:'',
            
        }
    },
    methods:{
        printPage(){
            
            window.print();
        },
        searchInDb(){
            axios
            .get(this.url+'districts?conference_select=' +this.conference_select)
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
        // inputSearchMethods(){
        //     this.$store.state.districts = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))          
        // },
        getConferences(){
            axios
            .get(this.url+'conferences')
            .then((res)=>{
                this.$store.state.conferences = res.data
                this.allData = res.data
              
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }, 
        delete_district(item){
            this.dialog_delete=true,
            this.$store.state.conference = item
        },
        edit_district(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.conference = item
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
        conferences(){
            const conferences = this.$store.state?.conferences
            return conferences
           
            
        }
    }
}
</script>
<style src="../assets/css/table.css" scoped>
input{
    height: 35px;
    border: 1px solid var(--primary);
    border-radius: 3px;
    padding-left: 5px;
    outline: none;
    width: 250px;
}
select {
    background-color: var(--transparent);
    border-radius: 4px;
    border: 1px solid var(--primary);
    box-sizing: border-box;
    color: var(--text);
    font-size: 15px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 250px;
  }
</style>