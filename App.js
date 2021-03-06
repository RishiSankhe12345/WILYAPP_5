import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import BookTrnsScreen from './screens/BookTransitionScreen';
import SrchScreen from './screens/SearchTransitionScreen';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component{
  render(){
    return(
<AppContainer/>
    );
  }
}

const TabsNavigate= createBottomTabNavigator({
Transaction:{screen:BookTrnsScreen},
Search:{screen:SrchScreen}
},{defaultNavigationOptions:({navigation})=>({
  tabBarIcon:()=>{
    const routeName= navigation.state.rootName;
    if(routeName==="Transaction"){
return( 
<Image source={require("./assets/book.png")} style={{width:40, height:40}} /> 
);
    }
else if(routeName==="search"){
  return(
  <Image source={require("./assets/searchingbook.png")} style={{width:40, height:40}} /> 
  );}
  }
})})
const switchNavigator= createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabsNavigate:{screen:TabsNavigate}
})
const AppContainer= createAppContainer(switchNavigator)