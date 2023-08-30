import { Header, Input } from '@rneui/themed';
import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import RestApi from '../RestApi/RestApi';

class FormData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
        };
    }

    componentDidMount() {
        const { params } = this.props.route;
        if (params !== undefined) {
            this.setState({
                firstName: params.item.firstName,
                lastName: params.item.lastName,
            })
        }
    }

    save = () => {
        const { params } = this.props.route;
        const { firstName, lastName, email } = this.state;
        var rand = Math.floor(Math.random() * 1000)
        var data = {
            firstName,
            lastName,
            email: firstName + lastName + rand + '@gmail.com'
        }
        if (params !== undefined) {
            RestApi.ApiPut("/user/" + params.item.id, data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.pop();
                } else {
                    console.log(res.error);
                }
            })
        } else {
            RestApi.ApiPost("/user/create", data).then((res) => {
                if (res.status === 200) {
                    this.props.navigation.pop();
                } else {
                    console.log(res.error);
                }
            })
        }
    }

    render() {
        const { firstName, lastName } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <Header
                    leftComponent={
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.pop()}
                            >
                                <Text style={{ fontWeight: "bold", color: "#FFF" }}>{"<"} kembali</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    rightComponent={
                        <View>
                            <TouchableOpacity
                                onPress={() => this.save()}
                            >
                                <Text style={{ fontWeight: "bold", color: "#FFF" }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    centerComponent={{ text: 'Form Data', style: { color: "#FFF", fontWeight: "bold" } }}
                />
                <Input
                    placeholder='Nama Depan'
                    value={firstName}
                    onChangeText={value => this.setState({ firstName: value })}
                />
                <Input
                    placeholder='Nama Belakang'
                    value={lastName}
                    onChangeText={value => this.setState({ lastName: value })}
                />
            </View>
        );
    }
}

export default FormData;
