import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

//Criar estado inicial do objeto (calculadora);
const initialState = {
    displayValue: '0', //Iniciar a calc 0;
    clearDisplay: false, //Limpar calc, inicialmente desligado;
    operation: null, //Variavel para armazenar o operador;
    values: [0, 0], //Array para armazenar dois valores;
    current: 0 //Indicar a posição do array q quero manipular;

}


export default class Calculator extends Component {

    //Criação do estado para refênciar o objeto;
    state = { ...initialState }

    //Construtor para credenciar o click do botão selecionado e garantir sua finaldiade;
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    //Função para limpar a calculadora;
    clearMemory() {
        this.setState({ ...initialState }) //Voltar ao estado inicial;
    }

    //Função para definir uma ação a calculadora. EX) Somar, Dvidir...;
    setOperation(operation) { //Operation = operador matemático selecionada;
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    //Adicionar digito ao display da calculadora;
    addDigit(n) { //n = número selecionado;
        if (n === '.' && this.state.displayValue.includes('.')) { //Evitar que o display add dois pontos;
            return
        }

        //Limpar o display quando o 0 à esquerda estiver presente, para add novo digito;
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        //Obtenção de valor atual no display da calculadora;
        const currentValue = clearDisplay ? '' : this.state.displayValue

        //Obtenção de novo valor no display da calculadora;
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        //Armazenar o valor no primieor indice do array;
        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }



    render() {
        return (
            //Display value={this.state.displayValue -> Mostrar o numero pressionado no display; 
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}

