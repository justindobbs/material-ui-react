'use strict';

import React from 'react';
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;
var RaisedButtonGroup = mui.RaisedButtonGroup;
var Checkbox = mui.Checkbox;
var AppBar = mui.AppBar;
var RadioButton = mui.RadioButton;
var Paper = mui.Paper;

const App = React.createClass({

	childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
	
	getInitialState: function(){
		return {
			input: [],
			currentBlock: [1]
		};
	},
	
	getDefaultProps: function() {
		return {
			numberButtons: [1,2,3,4,5,6,7,8,9,'0','.','100'],
			operatorButtons: ['*','-','+','/','=']
		};
	},

	render() {
		var codeBlockStyle = this.setCodeBlockStyle();
    var paperStyle = this.setPaperStyle();
		var buttonNumbers = this.renderButtonNumbers();
		var buttonOperators = this.renderButtonOperators();
		var numberGroupStyle = this.setNumberGroupStyle();
		var displayStyle = this.setDisplayStyle();
		var operatorGroupStyle = this.setOperatorGroupStyle();
		this.state.input = this.state.input ? this.state.input : [];
		var input = this.state.input;
		
		return (
			<div style={codeBlockStyle}>
				<Paper style={paperStyle}>
					<Paper style={displayStyle}>
						<span>~ {input}</span>
					</Paper>
					<div style={numberGroupStyle}>
						{buttonNumbers}
						<RaisedButton onClick={this.handleClearClick} style={{minWidth: '190px',margin: '4px'}} label='clear' />
					</div>
					<div style={operatorGroupStyle}>
						{buttonOperators}
					</div>
				</Paper>
			</div>
    );
  },
	
	computeNumber: function(){
		var input = this.state.input;
		var currentBlock = this.state.currentBlock;
		
		input = input.join("");
		input = input.replace(/^0/,"");
		
		var result = eval(input);
		
		currentBlock.push(result);
		this.setState({currentBlock:currentBlock});
		this.setState({input:[result]});
	},
	
	handleNumberClick: function(e){
		var input = this.state.input;
		var currentBlock = this.state.currentBlock;
		var decimalState = false;
		//need to test if a decimal is already in a current number block
		if( currentBlock.indexOf('.') !== -1 ){
			decimalState = true;
		}
		var regex = /\.$/;
		if( e === '.' && input.join("").match(regex) ||
				e === '.' && decimalState
		){
			return false;
		}
		
		currentBlock.push(e);
		input.push(e);
		this.setState({input:input});
		this.setState({currentBlock:currentBlock});
	},
	
	handleOperatorClick: function(e){
		var input = this.state.input;
		if( this.props.operatorButtons.indexOf(input[input.length-1]) === -1 ){
			if(e !== '='){
				input.push(e);
				this.setState({input:input});
				//new number block
				this.setState({currentBlock: [1]});	
			}
			else{
				this.computeNumber();
			}
		}

	},
	
	handleClearClick: function(){
		this.setState({input: []});
		this.setState({currentBlock: [1]});
	},
	
	renderButtonNumbers: function(){
		var styles = this.setNumberButtonStyle();
		var that = this;
		var buttons = this.props.numberButtons.map( function(item,i) {
			return (
				<RaisedButton key={item} onClick={that.handleNumberClick.bind(that,item)} style={styles} label={item}></RaisedButton>
			);
		});
		return buttons;
	},
	
	renderButtonOperators: function(){
		var styles = this.setOperatorButtonStyle();
		var that = this;
		var buttons = this.props.operatorButtons.map( function(item,i) {
			return (
				<RaisedButton key={item} onClick={that.handleOperatorClick.bind(that,item)} style={styles} label={item}></RaisedButton>
			);
		});
		return buttons;
	},
	
	setOperatorGroupStyle: function(){
		var styles = {
			'position': 'relative',
			'width': '100px',
			'float': 'right'
		};
		return styles;
	},
	
	setDisplayStyle: function(){
		var styles = {
			'position': 'relative',
			'width': '100%',
			'padding': '1em',
			'background': 'black',
			'color': 'lime',
			'marginBottom': '10px',
			'marginTop': '10px'
		};
		return styles;
	},
	
	setNumberGroupStyle: function(){
		var styles = {
			'position': 'relative',
			'width': '200px',
			'float': 'left'
		};
		return styles;
	},
	
	setNumberButtonStyle: function(){
		var styles = {
			"minWidth": '58px',
			"margin": "4px",
			"color": 'yellow'
		};
		return styles;
	},
	
	setOperatorButtonStyle: function(){
		var styles = {
			"margin": "4px"
		};
		return styles;
	},
	
	setCodeBlockStyle: function(){
		var codeBlockStyle = { 
			"fontFamily": "monospace",
      "backgroundColor": "#D0D0D0",
			"position": "absolute",
			"height": "100%",
			"width": '100%',
			"top": '0',
			"left": "0"
		};
		return codeBlockStyle;
	},
	
	setPaperStyle: function(){
		var paperStyle = {
			"marginTop": '20px',
			"padding": "10px",
			"borderTop": "solid #027 20px",
			"width": '320px',
			"display": 'block',
			"marginLeft": 'auto',
			"marginRight": 'auto',
			'height': '350px'
		};
		return paperStyle;
	}
});

module.exports = App;
