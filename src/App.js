import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      userInput: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

  }
  handleRemove(value) {
    var newList = this.state.list.slice();
    var temp;
    newList.map(item => {
      if(item.id === value){
        temp = item;
      }
      return item;
    }
  );

  this.state.list.splice(this.state.list.indexOf(temp), 1);
  this.setState ({
    list: this.state.list
  });
}
handleComplete(value){
  var newList = this.state.list.slice();
  newList.map(item => {
    if(item.id === value){
      item.complete = !item.complete;
    }
    return item;
  }
);
this.setState({
  list: newList
});
}
handleClick(event){
  var object = {
    id: Date.now(),
    complete: false,
    text: this.state.userInput
  }
  this.setState ({
    list: this.state.list.concat(object)
  });
}
handleChange(value){
  this.setState ({
    userInput: value
  });
}
render() {
  return (
    <div className="App">
      <div className="todo-wrapper">
        <header className="App-header">
          <h1 className="App-title">Todo List</h1>
        </header>
        <p className="App-intro">
          <AddItem listState={this.state.list}
            handleChange={this.handleChange.bind(this)}
            handleClick={this.handleClick.bind(this)}>

          </AddItem>
        </p>
        <List handleRemove={this.handleRemove.bind(this)}
          handleComplete={this.handleComplete.bind(this)}
          listState={this.state.list}>

        </List>
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
    var fieldValue = event.target.value;
    this.props.handleChange(fieldValue);
  }
  render(){
    return (
      <div className="Add-item" onChange={this.onValueChange}>
        <TextField className="AddItem-input"></TextField>
        <Button variant="outlined" onClick={this.props.handleClick}>Add</Button>
      </div>
    );
  }
}
class List extends React.Component {
  render(){
    return (
      <div className="list-div">
        <ul>
          {this.props.listState.map(x =>
            <ListItem handleComplete={this.props.handleComplete.bind(this)}
              handleChange={this.props.handleChange}
              handleRemove={this.props.handleRemove}
              element={x}>
            </ListItem>)}
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
      var value = this.props.value.id;
      this.props.handleRemove(value);
    }
    render() {
      return (
        <Tooltip id="tooltip-icon" title="Delete">
          <IconButton className="Remove-button" value={this.props.value} onClick={this.onRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    }
  }
  class CompleteButton extends React.Component {
    constructor(props){
      super(props);
      this.onComplete = this.onComplete.bind(this);
    }
    onComplete(event){
      var value = this.props.value.id;
      this.props.handleComplete(value);
    }
    render() {
      return (
        <Checkbox color="black" className="Complete-Button" value={this.props.value.id} onClick={this.onComplete}></Checkbox>
      );
    }
  }
  class ListItem extends React.Component {
    render() {
      if(this.props.element.complete === true){
        return (
          <li className="List-element" style={{textDecoration: 'line-through'}}>
            <CompleteButton
              handleComplete={this.props.handleComplete}
              value={this.props.element}>
            </CompleteButton>

            <RemoveButton
              handleRemove={this.props.handleRemove}
              value={this.props.element}>
            </RemoveButton>

            {this.props.element.text}
          </li>
        );
      }else {
        return (
          <li className="List-element">
            <CompleteButton
              handleComplete={this.props.handleComplete}
              value={this.props.element}>
            </CompleteButton>

            <RemoveButton
              handleRemove={this.props.handleRemove}
              value={this.props.element}>
            </RemoveButton>

            {this.props.element.text}
          </li>
        );
      }

    }
  }
  export default App;
