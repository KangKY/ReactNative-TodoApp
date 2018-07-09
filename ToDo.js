import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {

  constructor(props) {
    super(props);
    this.state = {isEditing:false, toDoValue : props.text };
  }

  static propTypes = {
    text:PropTypes.string.isRequired,
    isCompleted : PropTypes.bool.isRequired,
    deleteToDo : PropTypes.func.isRequired,
    id : PropTypes.string.isRequired,
    completeToDo : PropTypes.func.isRequired,
    uncompleteToDo : PropTypes.func.isRequired,
    updateToDo : PropTypes.func.isRequired
  }

  state = {
    isEditing: false,
    toDoValue: ""
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>

          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={toDoValue}
              multiline
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
              underlineColorAndroid={"transparent"}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Ionicons color="green" size={25} name="md-checkmark-circle" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPress={this._startEditing}>
              <View style={styles.actionContainer}>
                <Ionicons color="#E8C814" size={25} name="md-create" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteToDo(id)}>
              <View style={styles.actionContainer} >
                <Ionicons color="red" size={25} name="md-close" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleComplete = () => {
    const {isCompleted, uncompleteToDo, completeToDo, id} = this.props;
    if(isCompleted)
      uncompleteToDo(id);
    else
      completeToDo(id);
  };

  _startEditing = () => {
    console.log("Start Edit!");
    const { text } = this.props;
    this.setState({
      isEditing: true
    });
  };

  _controlInput = text => {
    this.setState({
      toDoValue: text
    });
  };

  _finishEditing = () => {
    console.log("Finish Edit!");
    const {toDoValue} = this.state;
    const {updateToDo, id} = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };
}

const styles = StyleSheet.create({
  // flexDirection : flex 의 방향을 결정, 디폴트는 column
  // justifyContent : 주축에 따른 자식의 정렬을 결정. ex>flex-start, space-around ...
  // alignItems : 주축과 90도 방향인 보조축의 자식 정렬을 결정 ex > flex-start, center, flex-end, stretch ...

  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353535"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    width: width / 2
  }
});
