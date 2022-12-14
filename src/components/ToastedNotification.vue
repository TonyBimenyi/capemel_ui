<template>
    <div>
        <button @click="onClick()">Show notification</button>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        onClick(){
            this.$toasted.show("I have dream");
        }
    }
}
</script>