let LocalStorage = window.localStorage;

export const GetUsersData = () =>{
    let usersdata = LocalStorage.getItem('chat-users');
    if (usersdata === null || usersdata === undefined) return [];
    else return JSON.parse(usersdata);
}

export const SetUsersData = (usersdata) => {
    LocalStorage.setItem('chat-users',JSON.stringify(usersdata));
    return true;
}