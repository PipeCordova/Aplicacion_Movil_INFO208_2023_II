import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const usuarioValido = 'felipe';
const contraseñaValida = '123';

// Pantalla de Bienvenida
const WelcomeScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/logoUach.jpg')}
        style={{ width: 200, height: 117, marginBottom: 20 }}
      />
      <Text>Bienvenido a mi aplicación</Text>
      <Button title="Continuar" onPress={handleContinue} />
      <Text style={styles.authorText}>Autor: Felipe Córdova</Text>
    </View>
  );
};

// Pantalla de Login
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === usuarioValido && password === contraseñaValida) {
      Alert.alert('Login exitoso', '¡Bienvenido!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } else {
      Alert.alert('Error de inicio de sesión', 'Usuario o contraseña incorrectos', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/login.png')}
        style={{ width: 170, height: 170, marginBottom: 10 }}
      />
      <Text>Ingrese sus credenciales</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
};

// Pantalla Home
const HomeScreen = ({ navigation }) => {
  const handleGoToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
        <Image
        source={require('./images/bot.png')} // Reemplaza con la ruta correcta de tu imagen
        style={{ width: 200, height: 200, marginBottom: 20 }}
        />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Esta aplicación tiene como finalidad ingresar nuevos comandos al bot de Telegram
        </Text>
      </View>

      <Button title="Ir a Main" onPress={handleGoToMain} />
    </View>
  );
};

// Pantalla de comando
const ScreenComando = ({ navigation }) => {
  const [comando, setComando] = useState('');
  const [instruccion, setInstruccion] = useState('');

  const handleEnviar = () => {
    // num_ip es la ip de la maquina
    fetch('http://num_ip:3000/api/command', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(
          {"command":comando, "message":instruccion})
        });
        Alert.alert('Exito', 'mensaje enviado con exito', [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <Text>Ingrese sus comando</Text>
      <TextInput
        style={styles.input}
        placeholder="comando"
        onChangeText={(text) => setComando(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="instruccion"
        onChangeText={(text) => setInstruccion(text)}
      />
      <Button title="Enviar a bot" onPress={handleEnviar} />
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* También puedes agregar una pantalla Main si aún no lo has hecho */}
        <Stack.Screen name="Main" component={ScreenComando} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  textContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
  },
});
