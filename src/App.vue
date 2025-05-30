<script setup>
// Necessary Imports
import { ref } from 'vue';
import User from './components/User.vue';
import AddUser from './components/AddUser.vue';
import Empty from './components/Empty.vue';
import EditUser from './components/EditUser.vue';
import { SetUsersData,GetUsersData } from './components/storage'

// ShowModal
const ShowModal = ref(false);
const ShowEditModal = ref(false);
const EditedUser = ref({});
let searchdata = '';

// Objects for chatlistusers
const chatObj = ref(GetUsersData());

/**
 * 
 * @param username name of the new user emitted from addmodal
 * @param usermessage message of new user emitted from addmodal
 * @returns data of new user
 */
// Function to add new user
const AddNewUser = (username,usermessage) =>{
  chatObj.value.unshift(
    {
      id: Math.floor(Math.random() * 1000),
      name: username,
      thread: usermessage,
    },
  );

  // Updating on local storage
  SetUsersData(chatObj.value);

  // Closing the AddUser Modal
  ShowModal.value = false;
};

/**
 * 
 * @param userdata user to be deleted
 * @returns users, except the deleted user
 */
// Function to delete user
const DelUser = (userdata) => {
  chatObj.value = chatObj.value.filter( element =>{
    if(userdata.id == element.id) return false;
    else return true;
  }
  );
  // Updating on local storage
  SetUsersData(chatObj.value);
}
// Function to show edit modal
const UserEdit = (userdata) =>{
  EditedUser.value = userdata;
  ShowEditModal.value = true;
}

// Updating the data of edited user
const UserUpdate = (userdata) =>{
  chatObj.value.map(element => {
    if(userdata.id == element.id){
      element.name = userdata.name;
      element.thread = userdata.thread;
    }
  });

  // Updating on local storage
  SetUsersData(chatObj.value);

  // Closing the edit modal
  ShowEditModal.value = false;
}
// Search Function
const SearchFunc = () => {
  chatObj.value.map(userdata => {
    if(userdata.name.toLowerCase().includes(searchdata.toLowerCase())) userdata.matched = false;
    else userdata.matched = true;
  });
};
// Update theme
let ThemeFunc = () => {
  document.body.classList.toggle('dark-theme');
};
// AscendingOrder
const AscendingOrder = () =>{
  chatObj.value.sort((a,b)=> {
    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    else return 0;
  });
};
// DescendingOrder
const DescendingOrder = () =>{
  chatObj.value.sort((a,b)=> {
    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
    else if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
    else return 0;
  });
};

</script>

<template>
<section class="interface">
        <div class="header">
          <div class="top">
            <div class="right-side">
                <img src="./assets/network.svg" />
                <span>{{ `Chat(${chatObj.length})` }}</span>
            </div>
            <div class="left-side">
                <span @click="AscendingOrder">A</span>
                <span @click="DescendingOrder">Z</span>
                <img @click="ThemeFunc" src="./assets/theme.svg"/>
                <img @click="ShowModal = true" src="./assets/add.svg"/>
            </div>
          </div>
          <div class="searchbar">
            <img src="./assets/search.svg" />
            <input type="search" placeholder="Search" v-model="searchdata" @keypress="SearchFunc">
          </div>
        </div>
        <div class="chat-lists">
            <ul id="chatlist">
              <!-- User List -->
              <User
              v-for="users in chatObj"
              :key="users.id"
              :userdata="users"
              @remove="DelUser"
              @edituser="UserEdit"
              />

              <Empty v-if="chatObj.length == 0" />
            </ul>
        </div>
        
        <!-- AddUser Modal -->
        <AddUser  v-if="ShowModal" 
        @close="ShowModal = false"
        @adduser="AddNewUser"
        />

        <EditUser v-if="ShowEditModal"
                  :editeduserdata="EditedUser"
                  @close="ShowEditModal = false"
                  @updateuser="UserUpdate"
        />

    </section>
</template>