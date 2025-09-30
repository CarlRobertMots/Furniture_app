import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexWrap:'wrap',
        alignContent:'center',
        marginTop: '2rem'
  },
    input: {
        backgroundColor: '#ffffffff',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15,
        color: 'black',
        width: '80%',
        borderColor: '#979797ff',
        padding:'1rem'
  },
  
    signupButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#6200ee',
  },
    Header: {
        fontSize: 14,
        color: '#6200ee',
        marginBottom: '12px'
  }
})