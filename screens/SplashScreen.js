import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

const SplashScreen = ({ navigation }) => {  

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
          <StatusBar backgroundColor='#6acef7' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Sign in with Your Account :)</Text>
            <Text style={styles.text}>or create one for free!</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
                <LinearGradient
                    colors={['#00B0FF', '#00B0FF']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop:30}}>

                <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
                    <Icon name="genderless" type="font-awesome" style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Screen2')}>
                    <Icon name="genderless" type="font-awesome" style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')}>
                    <Icon name="circle" type="font-awesome" style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
                    <Icon name="genderless" type="font-awesome" style={{ marginRight: 10 }} />
                </TouchableOpacity>

            </View>
        </Animatable.View>
      </View>
    );
};




export default SplashScreen;




const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00B0FF'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: RFValue(35),
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5,
      fontSize: RFValue(15)
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});


