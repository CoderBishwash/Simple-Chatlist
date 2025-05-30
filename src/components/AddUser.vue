<script setup>
import { ref } from 'vue';

// Defining Emits
let emit = defineEmits(['adduser','close']);


// Creating new variables for new added users
let username = '';
let usermessage = '';

// Validating the input interface
let usernameerror = ref(false);
let usermessageerror = ref(false);

const AddUserNew = () =>{
    // Validating username and usermessages
    if(username.length < 3) usernameerror.value = true;
    else usernameerror.value = false;

    if(usermessage.length < 3) usermessageerror.value = true;
    else usermessageerror.value = false;

    if(!usernameerror.value && !usermessageerror.value){
        emit('adduser',username,usermessage);
    }
}
</script>
<template>

<div class="adduser">
            <div class="top">
                <h2>Add New Chat</h2>
                <img @click="emit('close')" src="../assets/close.svg"/>
            </div>
            <div class="bottom">
                <label>User Name</label>
                <input type="text" :class="usernameerror? 'error': ''" v-model="username" placeholder="i.e. Messi">
                <label>Message</label>
                <input type="text" :class="usermessageerror? 'error': ''" v-model="usermessage" placeholder="i.e. What's up!">
            </div>
            <div class="btns">
                <button @click="AddUserNew" id="btn1">Add</button>
                <button @click="emit('close')" id="btn2" >Close</button>
            </div>
        </div>
        <div class="overlay"></div>

</template>