<script setup>
// Necessary imports
import { ref } from 'vue';

// Defining Emits
const emit = defineEmits(['updateuser','close']);

// Defining Props
const props = defineProps({
    editeduserdata: {
        type: Object,
        default: {}
    }
});

// Declaring initial values of username and usermessage 
let username = props.editeduserdata.name;
let usermessage = props.editeduserdata.thread;

// Validating the input interface
const usernameerror = ref(false);
const usermessageerror = ref(false);

const UpdateUser = () =>{

    // Validating username and usermessages
    if(username.length < 3) usernameerror.value = true;
    else usernameerror.value = false;

    if(usermessage.length < 3) usermessageerror.value = true;
    else usermessageerror.value = false;

    if(!usernameerror.value && !usermessageerror.value){
    let NewUser = {
        id: props.editeduserdata.id,
        name: username,
        thread: usermessage
    };
    emit('updateuser',NewUser);
    }
};

</script>
<template>

<div class="edituser">
            <div class="top">
                <h2>Update User's Data</h2>
                <img @click="emit('close')" src="../assets/close.svg"/>
            </div>
            <div class="bottom">
                <label>User Name</label>
                <input type="text" v-model="username" :class="usernameerror? 'error': ''">
                <label>Message</label>
                <input type="text" v-model="usermessage" :class="usermessageerror? 'error': ''">
            </div>
            <div class="btns">
                <button @click="UpdateUser" id="btn1">Update</button>
                <button @click="emit('close')" id="btn2" >Close</button>
            </div>
        </div>
        <div class="overlay"></div>

</template>