import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props); // Настройка свойств в конструкторе // Состояние
        this.state = {class: "off", label: "Нажми",text: "", outtext: ""};
       // this.state= {text: "", outtext: ""}
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
// Привязка контекста функции
        this.toggle = this.toggle.bind(this);
    }

    toggle(event) {
// Вычисление класса toggle
        let className = (this.state.class === "off") ? "on" : "off"; // Установка нового состояния
        this.setState({class: className});
    }

    render() {
        return (
            <div>
                {/*<button onClick={this.toggle} className={this.state.class}>{this.state.label}</button>*/}
                {/*<form onSubmit={this.onSubmit}>*/}
                {/*    <input type="text" value={this.state.text}*/}
                {/*           placeholder="Текст" onChange={this.onChange}/>*/}
                {/*    <input type="submit" value="Отправить"/><br/> <p>Отправлено: "<span>{this.state.outtext}</span>"</p>*/}
                {/*</form>*/}
            </div>

    );
    }

    onChange(e) {
        let value = e.target.value
        this.setState({text: value})
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({outtext: this.state.text})
    }

}

//   return (
//       <h1>Привет React</h1>
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//   );
//}

export default App;
