import { Button, Header, ListItem, SearchBar } from '@rneui/themed';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import RestApi from '../RestApi/RestApi';
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
import { Dialog } from '@rneui/themed';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAll: [],
            data: [],
            isLoading:false,
        };
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('focus', () => {
            this.setState({isLoading:true});
            this.all();
        });
    }

    all = () => {
        RestApi.ApiGet("/user?created=1").then((res) => {
            if (res.status === 200) {
                this.setState({ data: res.data.data,dataAll: res.data.data });
                this.setState({isLoading:false});
            } else {
                console.log(res.error);
                this.setState({isLoading:false});
            }
        })
    }

    delete = (id) => {
        this.setState({isLoading:true});
        RestApi.ApiDelete("/user/" + id).then((res) => {
            if (res.status === 200) {
                this.all();
                this.setState({isLoading:false});
            } else {
                console.log(res.error);
                this.setState({isLoading:false});
            }
        })
    }

    search = (value) => {
        const { dataAll } = this.state;
        let text = value;
        if (text == null || text == '') {
            this.setState({ data: dataAll})
        } else {
            const arr = [];
            dataAll.find(item => {
                const op = new RegExp(".*" + text + ".*", 'ig');
                const hsl = item.firstName.match(op);
                if (hsl != null) {
                    arr.push(item)
                }
            }
            );
            this.setState({ data: arr })
        }
    }


    render() {
        const { data, isLoading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <Header
                    rightComponent={
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push('FormData')}
                            >
                                <Text style={{ fontWeight: "bold", color: "#FFF" }}>Tambah +</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    centerComponent={{ text: 'To Do', style: { color: "#FFF", fontWeight: "bold" } }}
                />
                <TextInput 
                    onChangeText={this.search}
                    placeholder='Cari data..'
                    style={{
                        padding:5,
                        borderColor:"#CCC",
                        borderWidth:1,
                        borderRadius:10,
                        margin:10
                    }}
                />
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <ListItem.Swipeable
                            rightContent={(reset) => (
                                <Button
                                    title="Delete"
                                    onPress={() => this.delete(item.id)}
                                    buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                />
                            )}
                            onPress={() => this.props.navigation.push('FormData', { item })}
                            bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item.firstName + " " + item.lastName}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    )}
                    keyExtractor={item => item.id}
                />

                {/* <NestableScrollContainer>
                    <NestableDraggableFlatList
                        data={data}
                        renderItem={() => (
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>John Doe</ListItem.Title>
                                    <ListItem.Subtitle>President</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        )}
                        keyExtractor={(item) => item.id}
                        onDragEnd={({ data }) => setData1(data)}
                    />
                </NestableScrollContainer> */}

                <Dialog isVisible={isLoading} >
                    <Dialog.Loading />
                </Dialog>
            </View>
        );
    }
}

export default ListData;
