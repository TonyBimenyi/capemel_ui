<template>
    <div class="container">
        <div class="top_part">
            <div class="part_left">
                <div class="btn1">
                    <button>Imprimer</button>
                </div>
                <div class="btn1">
                    <select @change="sortDistrict" class="select_"   v-model="conference_select" name="" id="">
                        <option selected value="">{{ conf_text }}</option>
                        <option v-for="conf in conferences" :key="conf.id" :value="conf.id">{{conf.nom_conference}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <select class="select_" @change="searchInDb" v-model="district_select"  name="" id="">
                        <option >--DISTRICT--</option>
                        <option v-for="dis in districts" :key="dis.id" :value="dis.id">{{dis.nom_district}}</option>
                    </select>
                </div>
                <div class="btn1">
                    <input class="select_"  type="date" name="" id="">
                </div>
                <div class="btn1">
                    <input class="select_"  type="date" name="" id="">
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
                        <th>No</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>District</th>
                        <th>Paroisse</th>
                        <th>Age</th>
                        <th>Categorie</th>
                        <th>Debut Cotisation</th>
                        <th>Status</th>
                        <th colspan="3">Options</th>
                        
                    </tr>
                </thead>
                <tbody class="er">
                    <tr class="spacer">
                        <td colspan="100"></td>
                    </tr>
                    <tr >
                        <td>CAPEMEL-2022/01</td>
                        <td>Bimenyimana</td>
                        <td>Tony Blaise</td>
                        <td>Ntahangwa Est</td>
                        <td>Mutanga-Nord</td>
                        <td>32</td>
                        <td>Candidat</td>
                        <td>21/12/2022</td>
                        <td>Actif</td>
                        <td><button  id="mod_btn">Modifier</button></td>
                        <td><button  id="mod_btn">Cotisations</button></td>
                        <td><button  id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                    <tr >
                        <td>CAPEMEL-2022/01</td>
                        <td>Bimenyimana</td>
                        <td>Tony Blaise</td>
                        <td>Ntahangwa Est</td>
                        <td>Mutanga-Nord</td>
                        <td>32</td>
                        <td>Candidat</td>
                        <td>21/12/2022</td>
                        <td>Actif</td>
                        <td><button  id="mod_btn">Modifier</button></td>
                        <td><button  id="mod_btn">Cotisations</button></td>
                        <td><button  id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                    <tr >
                        <td>CAPEMEL-2022/01</td>
                        <td>Bimenyimana</td>
                        <td>Tony Blaise</td>
                        <td>Ntahangwa Est</td>
                        <td>Mutanga-Nord</td>
                        <td>32</td>
                        <td>Candidat</td>
                        <td>21/12/2022</td>
                        <td>Actif</td>
                        <td><button  id="mod_btn">Modifier</button></td>
                        <td><button  id="mod_btn">Cotisations</button></td>
                        <td><button  id="delete_btn"><i class='bx bxs-trash'></i></button></td>                  
                    </tr>          
                </tbody>
                
            </table>         
        </div>
     
   
    </div>
</template>
<script>

export default {
   
}
</script>
<style src="../assets/css/table.css" scoped>
  
</style>