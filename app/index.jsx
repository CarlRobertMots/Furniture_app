import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.text]}><Text style={styles.text2}>Everything</Text> You Will Ever Need!</Text>
       <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/signIn')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => router.push('/signUp')}
        >
        <Text style={[styles.buttonText, styles.signupText]}>Sign Up</Text>
      </TouchableOpacity>
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // change to your preferred background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '90%',
    height:'250px',
    marginBottom: 20,
    resizeMode: 'contain'
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%'
  },
  signupButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#6200ee',
  },
  text: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'center',
    width: '70%',
    marginBottom: 30,
  },
  text2: {
    color: '#6200ee',
    fontSize: 40,
    fontWeight: 'bold',
  },
});