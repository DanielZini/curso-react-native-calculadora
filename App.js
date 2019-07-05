import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';
import SubDisplay from './src/components/SubDisplay'

const initialState = {
    displayValue: '0',
    subDisplayValue: '',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};

export default class App extends Component {
    state = { ...initialState };

    addDigit = n => {

        // evita adicionar mais de um ponto no displayValue
        if (n === '.' && this.state.displayValue.includes('.')) {
            return;
        }

        let currentValue = this.state.displayValue;

        // se n nao for ponto, faz validações
        if (n !== '.') {

            // clearDisplay recebe true se state.display for 0 ou recebe o próprio state.clearDisplay
            const clearDisplay =
                this.state.displayValue === '0' || this.state.clearDisplay;

            //se clearDisplay for true recebe vazio ou o valor do estado
            currentValue = clearDisplay ? '' : this.state.displayValue;
        }

        // concatena o currentValue com o novo valor digitado
        const displayValue = currentValue + n;

        this.setState({ displayValue, clearDisplay: false });

        if (n !== '.') {
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[this.state.current] = newValue;
            this.setState({ values });
        }
    };

    clearMemory = () => {
        this.setState({ ...initialState });
    };

    clearDigit = () => {
        
        if(this.state.displayValue === '0'){
            return
        }

        const displayValue = this.state.displayValue;

        const newDisplayValue = displayValue.slice(0, displayValue.length - 1)

        this.setState({ displayValue: newDisplayValue ? newDisplayValue : '0'});
    };

    setOperation = operation => {
        if(this.state.current === 0){

            const subDisplayValue = `${operation} ${this.state.values[0]}`

            this.setState({ 
                operation, 
                current: 1, 
                clearDisplay: true, 
                displayValue: '0',
                subDisplayValue
            })
        }else{
            const equals = operation === '=';
            const values = [...this.state.values];

            try{
                values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
            } catch (e) {
                values[0] = this.state.values[0];
            }

            const subDisplayValue = `${operation} ${values[0]}`

            values[1] = 0;

            this.setState({
                displayValue: equals ? `${values[0]}` : '0',
                operation:  equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: true,
                values,
                subDisplayValue: equals ? '' : subDisplayValue,
            })

        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Display value={this.state.displayValue} />
                <SubDisplay value={this.state.subDisplayValue} />
                <View style={styles.buttons}>
                    <Button label='AC' onClick={this.clearMemory} double />
                    <Button label='C' onClick={this.clearDigit} />
                    <Button label='/' onClick={this.setOperation} operation />
                    <Button label='7' onClick={this.addDigit} />
                    <Button label='8' onClick={this.addDigit} />
                    <Button label='9' onClick={this.addDigit} />
                    <Button label='*' onClick={this.setOperation} operation />
                    <Button label='4' onClick={this.addDigit} />
                    <Button label='5' onClick={this.addDigit} />
                    <Button label='6' onClick={this.addDigit} />
                    <Button label='-' onClick={this.setOperation} operation />
                    <Button label='1' onClick={this.addDigit} />
                    <Button label='2' onClick={this.addDigit} />
                    <Button label='3' onClick={this.addDigit} />
                    <Button label='+' onClick={this.setOperation} operation />
                    <Button label='0' onClick={this.addDigit} double />
                    <Button label='.' onClick={this.addDigit} />
                    <Button label='=' onClick={this.setOperation} operation />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
