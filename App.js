import React from 'react';
import { 
  StyleSheet, 
  ScrollView,
  Text, 
  View, 
  StatusBar, 
  Dimensions, 
  TextInput, 
  Platform } from 'react-native';
import ToDo from "./ToDo";

const {height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDO:""
  };


  render() {
    const { newToDO } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>To Do </Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To DO"} 
            value={newToDO}
            onChangeText={this._crontoNewToDO}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }

  _crontoNewToDO = text => {
    this.setState({
      newToDo : text
    })
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title:{
    color:"white",
    fontSize:30,
    marginTop : 50,
    fontWeight : "200",
    marginBottom:50
  },
  card : {
    backgroundColor:"white",
    flex:1,
    width: width-25,
    borderTopLeftRadius : 10,
    borderTopRightRadius:10,
    ...Platform.select({
      ios: {
        shadowColor:"rgb(50,50,50)",
        shadowOpacity : 0.5,
        shadowRadius:5,
        shadowOffset:{
          height:-1
        }
      },
      android: {
        elevation : 5
      }
    })
  },
  input: {
    padding : 20,
    borderBottomColor : "#bbb",
    fontSize : 25
  },
  toDos :{
    alignItems : "center"
  }
});
