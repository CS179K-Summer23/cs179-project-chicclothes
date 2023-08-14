import React, { useState, useEffect } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import StackNavigator from "./StackNavigator";
// Import Firebase auth when you integrate it
// import { auth } from './configuration/firebaseConfig';

function LoginNavigator() {
    const [user, setUser] = useState(null);
    // Logic to check Firebase user goes here...
  
    if(user == true) { //change the user if true or false so if its false it will go to loging but if its in then it 
                //will go straight to home pages etc... to test it just change it
        return <StackNavigator />;
    } else {
        return <BottomTabNavigator />;
    }
}

export default LoginNavigator;
