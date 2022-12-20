<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <button>Exporter</button>
                </div>
                <div class="btn1">
                    <button>Importer</button>
                </div>
                <div class="search">
                   <input type="text" placeholder="Rechercher...">
                </div>
            </div>
            <div class="part_right">
                
                <div class="add_btn">
                    <button @click="dialog=true">+</button>
                </div>
            </div>
        </div>
        <div class="table_content">
            <table>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nom et Prenom</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Role</th>
                        <th>Enregiste au</th>
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{user.id}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.telephone}}</td>
                        <td>{{user.role}}</td>
                        <td>{{datetime(user.created_at)}}</td>      
                        <td><button id="mod_btn">Modifier</button></td>
                        <td><button id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                </tbody>
            </table>
           
        </div>
       
        <user_modal @getUsers="getUsers"  @close="close" v-if="dialog"></user_modal>
    </div>
</template>
<script>
import axios from 'axios'
import user_modal from '../components/modals/user_modal.vue'
export default {
    components:{
        user_modal,
    },
    data(){
        return{         
            allData:[],
            dialog:false,
        }
    },
    methods:{
        close(){
            this.dialog = false
        },
        edit(item){
            this.dialog =true;
        },
        getUsers(){
            axios
            .get(this.url+'users')
            .then((res)=>{
                this.$store.state.users = res.data
                this.allData = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.response.data.message)
                console.log(error.response.data.message)
            })
        }
    },
    mounted(){
        this.getUsers()
    },
    computed:{
        users(){
            const users = this.$store.state?.users
            return users
        }
    }
}
</script>
<style src='../assets/css/users.css' scoped>

</style>