import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['ABC', 'DEF', 'GHI'],
      userInput: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

  }
  handleRemove(value) {
    this.state.list.splice(this.state.list.indexOf(value), 1)
    this.setState ({
      list: this.state.list
    });
  }
  handleComplete(){

  }
  handleClick(event){
    //event.preventDefault();
    console.log("Value in handleClick " + this.state.userInput)
    this.setState ({
      list: this.state.list.concat(this.state.userInput)
    });
    console.log("I Am handling the CLICK");
    console.log(this.state.list);
  }
  handleChange(value){
    this.setState ({
      userInput: value
    });
    console.log("I Am handling the CHANGE");
    console.log(value);
  }
  render() {
    return (
      <div className="App">
        <div className="todo-wrapper">
          <header className="App-header">
            <h1 className="App-title">Todo List</h1>
          </header>
          <p className="App-intro">
            <AddItem listState={this.state.list} handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)}></AddItem>
          </p>
          <List handleRemove={this.handleRemove.bind(this)} handleComplete={this.handleComplete.bind(this)} listState={this.state.list}></List>
        </div>
      </div>
    );
  }
}
class AddItem extends React.Component {
  constructor(props){
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(event){
    const fieldValue = event.target.value;
    this.props.handleChange(fieldValue);
  }
  render(){
    return (
      <div className="Add-item" onChange={this.onValueChange}>
        <input type='text' className="AddItem-input"></input>
        <button onClick={this.props.handleClick}>Add</button>
      </div>
    );
  }
}
class List extends React.Component {
  render(){
    return (
      <div className="list-div">
        <ul>
          {this.props.listState.map(x => <ListItem handleChange={this.props.handleChange} handleRemove={this.props.handleRemove} element={x}></ListItem>)}
        </ul>
      </div>
    );

  }
}
class RemoveButton extends React.Component {
  constructor(props){
    super(props);
    this.onRemove = this.onRemove.bind(this);
  }
  onRemove(event){
    const value = event.target.value;
    console.log(value);
    this.props.handleRemove(value);
  }
  render() {
    return (
      <button className="Remove-button" value={this.props.value} onClick={this.onRemove}>X</button>
    );
  }
}
class CompleteButton extends React.Component {
  render() {
    return (
      <button className="Compelte-button" onClick={this.props.handleComplete}>&#10003;</button>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <li className="List-element" > <CompleteButton></CompleteButton><RemoveButton handleRemove={this.props.handleRemove} value={this.props.element}></RemoveButton> {this.props.element}</li>
    );
  }
}
export default App;
