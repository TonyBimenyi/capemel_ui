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
    </div>
</template>
<style src="../assets/css/table.css" scoped>

</style>