<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
               
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
                        <th>ID</th>
                        <th>Nom de la categorie</th>
                        <th>Montant total a paye</th>
                        <th>Montant De Pension</th>
                        <th colspan="2">Status</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr v-for="cat in categories" :key="cat.id">
                        <td>{{ cat.id }}</td>
                        <td>{{ cat.nom_categorie }}</td>
                        <td>{{ money(cat.montant_a_paye) }}Fbu</td>
                        <td>{{ money(cat.montant_pension) }} Fbu</td>
                        <td><button id="mod_btn" @click="edit_categorie(cat)">Modifier</button></td>
                        <td><button @click="delete_categorie(cat)" id="delete_btn"><i class='bx bxs-trash'></i></button></td> 
                    </tr>          
                        
                </tbody>
                
            </table>         
        </div>
     <categorie_form @getPensions="getPensions" :edit_categorie="modifier"  @close="close" v-if="dialog"></categorie_form>
     <delete_categorie @getPensions="getPensions" :edit_categorie="modifier"  @close="close" v-if="dialog_delete"></delete_categorie>
     <cotisation_modal @getMembres="getMembres"  @close="close" v-if="dialog_cotisation"></cotisation_modal>
        
    </div>
</template>
<script>
import axios from 'axios'
import categorie_form from '../components/categories/categorie_form.vue'
import delete_categorie from '../components/categories/delete_categorie.vue'
import cotisation_modal from '../components/cotisations/modals/form_cotisation.vue'
export default{
    components:{
        categorie_form,
        cotisation_modal,
        delete_categorie

    },
    data(){
        return{
            dialog:false,
            dialog_cotisation:false,
            membres:[],
            dialog_delete:false,
        }
    },
    methods:{
        close(){
            this.dialog=false
            this.dialog_cotisation = false
            this.dialog_delete = false
        },
        getPensions(){
            axios
            .get(this.url+'categories')
            .then((res)=>{
                this.$store.state.categories = res.data
                this.allData = res.data
                this.links = res.data
            })
            .catch((error)=>{
                this.$toast.error(error.res.data.message)
                console.log(error.res.data.message)
            })
        },
        delete_categorie(item){
            this.dialog_delete=true,
            this.$store.state.categorie = item
        },
        edit_categorie(item){
            this.dialog = true
            this.modifier = true
            this.$store.state.categorie = item
        },
        
      
    },
        mounted(){
            this.getPensions()
        },
        computed:{
            categories(){
            const categories = this.$store.state?.categories
            return categories
        },
    }
}
    
    
</script>
<style src="../assets/css/table.css" scoped>
  
</style>