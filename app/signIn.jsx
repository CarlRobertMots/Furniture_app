import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';


export default function SignIn() {
    const router = useRouter();
    const handleLogin = () => {

         router.replace('/tabs/home');
    }

}