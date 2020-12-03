import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Image} from 'react-native'

export default class LoginScreen extends React.Component{
constructor(){
    super()
    this.state={emailId:'', password:''}
}

    logIn= async(email,password)=>{
        if(email&&password){
            try{
                const response= await firebase.auth().signInWthEmailAndPassword(email,password)
                if(!response){
                    this.props.navigation.navigate("transaction")
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert("user does not exist")
                    console.log("User does not exist")
                    break;

                    case 'auth/invalid-email': Alert.alert("Incorrect email or password")
                    console.log("Incorrect email or password")
                    break;
                }
            }
        }
        else{
            Alert.alert("User has not input any email or password")
        }
    }

    render(){
        return(
<KeyboardAvoidingView style={{alignItmes:'center', marginTop:20}}>
    <View>
<Image source={require("../assets/booklogo.jpg")} style={{width:200, height:200}}/>
<Text style={{textAlign:'center', fontSize:30}}>WILY</Text>
    </View>
    <View>
        <TextInput style={styles.loginBox} placeholder="abc@example.com" keyboardType="email-adress" onChangeText={(text)=>{this.setState({
            emailId:text
        })}}/>
        <TextInput style={styles.loginBox} secureTextEntry={true}  placeholder="Enter Password" onChangeText={(text)=>{this.setState({
            password:text
        })}}/>
        </View>
        <View><TouchableOpacity style={{height:30, width:90, borderWidth:1, marginTop:20, paddingTop:5, borderRadius:7 }} onPress={()=>{this.logIn(this.state.emailId, this.state.password)}}>
            <Text style={{textAlign:'center'}}>Log In</Text>
        </TouchableOpacity></View>
        </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    loginBox:{width:300, height:40, borderWidth:1.5, fontSize:20, margin:10, paddingLeft:10},
})