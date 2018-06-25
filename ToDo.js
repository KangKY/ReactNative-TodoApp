import React, {Component} from "react";
import {Ionicons} from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const {height, width } = Dimensions.get("window");

export default class ToDo extends Component {
    state = {
        isEditing : false,
        isCompleted : false
    }

    render() {
        const {isCompleted, isEditing} = this.state;

        return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View 
                    style={[styles.circle, 
                    isCompleted ? styles.completedCircle : styles.uncompletedCircle]} 
                    />
                </TouchableOpacity>
                <Text style={[styles.text,
                    isCompleted ? styles.completedText : styles.uncompletedText]}>hihi
                </Text>
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
                    <TouchableOpacity>
                        <View style={styles.actionContainer}>
                            <Ionicons color="red" size={25} name="md-close" />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        );
    }

    _toggleComplete = () => {
        console.log("Start Toggle!");
        this.setState(prevState => {
            return {
                isCompleted : !prevState.isCompleted
            }
        });
    };

    _startEditing = ()=>{
        console.log("Start Edit!");
        this.setState({
            isEditing : true
        });
    };

    _finishEditing = () => {
        console.log("Finish Edit!");
        this.setState({
            isEditing : false
        });
    };
}

const styles = StyleSheet.create({
    // flexDirection : flex 의 방향을 결정, 디폴트는 column
    // justifyContent : 주축에 따른 자식의 정렬을 결정. ex>flex-start, space-around ...
    // alignItems : 주축과 90도 방향인 보조축의 자식 정렬을 결정 ex > flex-start, center, flex-end, stretch ...

    container : {
        width : width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between"
    },
    circle: {
        width : 30,
        height : 30,
        borderRadius:15,
        borderColor:"red",
        borderWidth:3,
        marginRight : 20
    },
    text: {
        fontWeight:"600",
        fontSize:20,
        marginVertical : 20
    },
    completedCircle : {
        borderColor : "#bbb"
    },
    uncompletedCircle : {
        borderColor:"#F23657"
    },
    completedText : {
        color:"#bbb",
        textDecorationLine : "line-through"
    },
    uncompletedText: {
        color:"#353535"
    },
    column : {
        flexDirection :"row",
        alignItems:"center",
        //width : width / 2,
        justifyContent : "space-between"
    },
    actions : {
        flexDirection : "row"
    },
    actionContainer : {
        marginVertical : 10,
        marginHorizontal : 10
    }
});