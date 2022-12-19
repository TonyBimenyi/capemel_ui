<template>
    <div class="container">
<transition name="fade" appear>
    <div class="form" >
        <div class="top">
             <div class="title">Ajouter un utilisateur</div>
             <div class="close"><button @click="close">X</button></div>
         </div>
      <!-- <div class="subtitle">Let's create your account!</div> -->
      <div class="inputs">
        <div class="part1">
                <div class="input-container ic1">
                    <input id="firstname" class="input" type="text" required placeholder=" " />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Nom et Prenom</label>
                </div>
                <div class="input-container ic2">
                    <input id="lastname" class="input" required type="text" placeholder=" " />
                    <div class="cut"></div>
                    <label for="lastname" class="placeholder">Email</label>
                </div>
                <div class="input-container ic2">
                    <input id="email" class="input" required type="email" placeholder=" " />
                    <div class="cut"></div>
                    <label for="email" class="placeholder">Telephone</label>
                </div>
            </div>
            <div class="part1">
                <div class="input-container ic1">
                    <select class="input" name="" id="">
                        <option value="">--Selectionner le Role--</option>
                        <option value="">Admin</option>
                        <option value="">Super Admin</option>
                    </select>
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">Role</label>
                </div>
                <div class="input-container ic2">
                    <input id="lastname" class="input" type="password" placeholder=" " />
                    <div class="cut"></div>
                    <label for="lastname" required class="placeholder">Mot de passe</label>
                </div>
                <div class="input-container ic2">
                    <input id="email" class="input" type="password" placeholder=" " />
                    <div class="cut"></div>
                    <label for="email" required class="placeholder">Confirmer mot de passe</label>
                </div>
            </div>
         </div>
      <button  class="submit">Ajouter</button>
    </div>
</transition>
    </div>
</template>
<script>
export default {
    methods:{
        close(){
            this.$emit('close')
        }
    },
}
</script>
<style src='../../assets/css/modal.css' scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
</style>