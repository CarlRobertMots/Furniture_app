import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import styles from './styles'


export default function SignUp() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSignUp = () => {
        if (!termsAccepted) {
        Alert.alert('Error', 'You must accept the Terms and Service.');
        return;
        }
        //backend prob
        console.log({ name, email, password });
        Alert.alert ('Success', 'Account created!');
        router.replace('/tabs/home');
    }
    const handleGoogleSignUp = () => {
        Alert.alert('Google Sign Up', 'Google login clicked');
    }

return (
    <View style={styles.container}>
        <Text style={styles.Header}>Name</Text>
        <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
        />
        <Text style={styles.Header}>Email</Text>
        <TextInput
            style={styles.input}
            placeholder="Example@gmail.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            />
        <Text style={styles.Header}>Password</Text>
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            />
        <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
        >
            <View style={[styles.checkbox, termsAccepted && styles.checked]} />
            <Text style={styles.checkboxText}>I agree to the Terms and Service</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
      ></TouchableOpacity>
    </View>
    )
}