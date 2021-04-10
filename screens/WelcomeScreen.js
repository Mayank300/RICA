import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar
} from "react-native";

import db from "../config";
import firebase from "firebase";
import {RFValue } from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import {Icon} from 'react-native-elements';


export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      isModalVisible: "false"
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            IsBookRequestActive: false
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false })
            }
          ]);
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("DonateBooks");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"     First Name"}
                maxLength={8}
                onChangeText={text => {
                  this.setState({
                    firstName: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"     Last Name"}
                maxLength={8}
                onChangeText={text => {
                  this.setState({
                    lastName: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"     Contact"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={text => {
                  this.setState({
                    contact: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"     Address"}
                multiline={true}
                onChangeText={text => {
                  this.setState({
                    address: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"     Email"}
                keyboardType={"email-address"}
                onChangeText={text => {
                  this.setState({
                    emailId: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"     Password"}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({
                    password: text
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={"     Confrim Password"}
                secureTextEntry={true}
                onChangeText={text => {
                  this.setState({
                    confirmPassword: text
                  });
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <LinearGradient
                  colors={['#00B0FF', '#00B0FF']}
                  style={[styles.signIn, {
                    marginTop: 30,
                    width:200,
                    height:40,
                  }]}
                  >
                  <Text style={[styles.textSign, {
                      color:'#fff'
                  }]}>Register</Text>
              </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                   style={[styles.signIn, {
                    borderColor: '#00B0FF',
                    borderWidth: 1,
                    marginTop: 15,
                    width:200,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:10,
                    marginBottom:30
                }]}
                  onPress={() => this.setState({ isModalVisible: false })}
                >
                  <Text style={[styles.textSign, {
                            color: '#00B0FF'
                        }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };






  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>

        </View>
        {this.showModal()}
        <StatusBar backgroundColor='#6acef7' barStyle="light-content"/>
        <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
            >
        <View>

          <View>
            <Icon name="envelope-o" type ="font-awesome" />
              <TextInput
              style={styles.loginBox}
              placeholder="      Enter Your Email"
              keyboardType ='email-address'
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            />
          </View>

          <View>
          <Icon name="lock" type ="font-awesome" />
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="      Enter Your Password"
              onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
              }}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
                style={styles.signIn}
                onPress = {()=>{
                  this.userLogin(this.state.emailId, this.state.password)
                }}
              >
                <LinearGradient
                        colors={['#00B0FF', '#00B0FF']}
                        style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={()=>this.setState({ isModalVisible:true})}
                style={[styles.signIn, {
                    borderColor: '#00B0FF',
                    borderWidth: 1,
                        marginTop: 15
                }]}    
            >
                <Text style={[styles.textSign, {
                    color: '#00B0FF'
                }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#00B0FF'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#4CA7EE'
 },
 loginBox:{
   width: '95%',
   height: 60,
   borderWidth: 1.5,
   borderColor : '#00B0FF',
   fontSize: 20,
   margin:10,
   paddingLeft:10,
   borderRadius:30,
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#00B0FF',
   margin:30
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
   borderColor : '#00B0FF',
   borderWidth: 3,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#00B0FF',
   borderRadius:10,
   borderWidth:1,
   marginTop:10,
   padding:0,
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   margin:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
   marginBottom:10
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#00B0FF",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 },
 header: {
  flex: 1,
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingBottom: 50
},
footer: {
  flex: 3,
  backgroundColor: '#fff',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingHorizontal: 20,
  paddingVertical: 30
},
text_header: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: RFValue(40)
},
text_footer: {
  color: '#05375a',
  fontSize: 18
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
actionError: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#FF0000',
  paddingBottom: 5
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
},
errorMsg: {
  color: '#FF0000',
  fontSize: 14,
},
button: {
  alignItems: 'center',
  marginTop: 50
},
signIn: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
}
})
