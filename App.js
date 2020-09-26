import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  console.log(windowHeight)
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, "+", 0, '.', '+/-', '=']
  const [ darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  
  function handleInput(buttonPress) {
    
    if (buttonPress === '+' | buttonPress === '-' | buttonPress === '*' | buttonPress === '/') {
      setCurrentNumber(currentNumber + " " + buttonPress + " ")
      return
    }

    switch(buttonPress) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
        return
      case 'AC':
        setLastNumber('');
        setCurrentNumber('');
        return
      case '=':
        setLastNumber(currentNumber + ' = ');
        console.log(currentNumber.length)
        if (currentNumber.length > 4 ) {
          calculator();
          return;
        }
        return
      case '+/-':
        return  
    }

    setCurrentNumber(currentNumber + buttonPress);
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
      backgroundColor: darkMode ? "#262626" : "#f5f5f5",
    },
    results: {
      backgroundColor: darkMode ? "#262626" : "#f5f5f5",
      width: '80%',
      minHeight: windowHeight * 0.4,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color: darkMode ? '#f5f5f5' : '#262626',
      margin: 10,
      fontSize: 40,
    },
    themeButton: {
      bottom: 100,
      marginTop: 90,
      left: -10,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#000',
    },
    button: {
      minWidth: 90, 
      minHeight: '15.8%', 
      alignItems: 'center',
      justifyContent: 'center',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 20,
      fontWeight: 'bold',
    },
    historyText: {
      color: darkMode ? '#B5b7bb' : '#262626',
      fontSize: 20,
      margin: 3,
    }
  });

  function calculator() {
    const result = eval(currentNumber)

    setCurrentNumber(result.toString());
  }

  return (
    <>
    <StatusBar backgroundColor={darkMode ? '#262626' : '#f5f5f5'} style={darkMode ? 'light' : 'dark'}/>
    <View style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? "light-up" : "moon"} size={24} color={darkMode ? "white" : "black"} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' ?
          <TouchableOpacity 
            onPress={() => handleInput(button)}
            key={button} 
            style={[
              styles.button, 
              {backgroundColor: darkMode ? '#414853' : '#ededed'}
            ]}>
            <Text 
              style={[
                styles.textButton,
                {color: darkMode ? '#fff8':'#262626', fontSize: 30}
              ]}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity 
            onPress={() => handleInput(button)}
            key={button} 
            style={[
              styles.button, 
              {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode ? '#414853' : '#ededed'}
            ]}>
            <Text 
              style={[
                styles.textButton,
                // {color: darkMode ? '#fff':'#262626'}
              ]}>{button}</Text>
          </TouchableOpacity>
          )}
      </View>
    </View>
    </>
  );
}

