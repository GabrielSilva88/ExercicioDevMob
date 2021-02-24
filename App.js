import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export default function App() {
  const [weight, setWeight] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const [imc, setImc] = React.useState(0)
  const [water, setWater] = React.useState(0)
  const [cups, setCups] = React.useState(0)
  const [imcDescription, setImcDescription] = React.useState('')

  const imcDescriptionMessage = {
    low: 'abaixo do peso, cuidado',
    normal: 'com o peso normal, parabéns',
    attention: 'com sobrepeso, atenção',
    fat1: 'na obesidade grau 1, cuidado',
    fat2: 'na obesidade grau 2, cuidado',
    fat3: 'na obesidade grau 3, cuidado',
  };

  useEffect(() => {
    if (weight.value && height.value) {
      const weightNumber = Number(weight.value.replace(',', '.'))
      const heightNumber = Number(height.value.replace(',', '.'))

      let calcImc = weightNumber / (heightNumber * heightNumber);

      if (calcImc && calcImc !== Infinity) {
        calcImc = calcImc.toFixed(2);
        setImc(calcImc);
        if (calcImc < 18.5) {
          setImcDescription(imcDescriptionMessage.low);
        } else if (calcImc < 24.9) {
          setImcDescription(imcDescriptionMessage.normal);
        } else if (calcImc < 29.9) {
          setImcDescription(imcDescriptionMessage.attention);
        } else if (calcImc < 34.9) {
          setImcDescription(imcDescriptionMessage.fat1);
        } else if (calcImc < 39.9) {
          setImcDescription(imcDescriptionMessage.fat2);
        } else {
          setImcDescription(imcDescriptionMessage.fat3);
        }
      } else {
        setImc(0);
      }
    } else {
      setImc(0);
    }
  }, [weight, height]);

  useEffect(() => {
    let calWater = weight.value * 0.035;
    let calCups = calWater / 0.3;
    if (calWater) {
      setWater(calWater.toPrecision(3));
      setCups(calCups.toFixed(0));
    }
  }, [weight]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.title}>Saúde Pluz</Text>


          <TextInputMask
            style={styles.textInput}
            type={'custom'}
            options={{
              mask: '99,999',
            }}
            value={weight.value}
            onChangeText={(weightInput) => {
              setWeight({
                value: weightInput,
              });
            }}
            keyboardType='number-pad'
            autoFocus={true}
            placeholder=' Digite seu Peso quilogramas (Ex: 70,51 kg) '
          />

          <Text style={styles.label}></Text>
          <TextInputMask
            style={styles.textInput}
            type={'custom'}
            options={{
              mask: '9,99',
            }}
            value={height.value}
            onChangeText={(heightInput) => {
              setHeight({
                value: heightInput,
              });
            }}
            keyboardType='number-pad'
            placeholder=' Digite sua Altura em metros (Ex: 1,55 M)'

          />

          {imc !== 0 ? (
            <View style={styles.box}>
              <Text
                style={styles.textBox}
              >{`O seu IMC é de ${imc
                .toString()
                .replace(
                  '.',
                  ','
                )} e por isso você está ${imcDescription}. Você deveria tomar ${water
                  .toString()
                  .replace(
                    '.',
                    ','
                  )} litros de água diariamente. O que corresponde a ${cups
                    .toString()
                    .replace('.', ',')} copos de 300ml por dia.`}</Text>
            </View>
          ) : (
              <View></View>
            )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51FCAF',
    marginHorizontal: 16,
    marginVertical: 40,
    borderRadius: 5

  },
  title: {
    fontSize: 40,
    marginBottom: 60,
    fontWeight: 'bold',
    color: '#3C5E45',
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    color: '#515753'
  },
  textBox: {
    margin: 20,
    fontSize: 18,
    color: '#515753'
  },
  box: {
    backgroundColor: '#EBFBEF',
    marginTop: 20
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 10,
    color: '#737A75',
    borderColor: '#515753',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  }

});