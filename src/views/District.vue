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
        <form_modal @getUsers="getUsers"  @close="close" v-if="dialog"></form_modal>
    </div>
</template>
<script>
import form_modal from '../components/district/modals/form_modal.vue'
export default {
    components:{
        form_modal
    },
    data(){
        return{
            dialog:false,
        }
    },
    methods:{
        close(){
            this.dialog = false
        },
    }
}
</script>
<style src="../assets/css/table.css" scoped>

</style>