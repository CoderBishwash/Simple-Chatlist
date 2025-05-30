<script setup>

// Defining props
const props = defineProps(
    {
        userdata: {
            type: Object,
            default: {}
        },
    },
);

// Defining emits
const emit = defineEmits(['remove','edituser']);


</script>

<template>

                <li v-if="!userdata.matched">
                    <div class="letter">
                        <span>{{ props.userdata.name[0].toUpperCase() }}</span>
                    </div>
                    <div class="infos">
                        <h3>{{userdata.name}}</h3>
                        <p>{{ userdata.thread }}</p>
                    </div>
                    <div class="edit">
                        <img @click="emit('edituser',userdata)" src="../assets/edit.svg" alt="edit">
                    </div>
                    <div class="delete">
                        <img @click="emit('remove',userdata)" src="../assets/delete.svg" alt="delete"/>
                    </div>
                </li>

</template>