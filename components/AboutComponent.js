import React, { Component } from 'react';
import { ScrollView, View , Image } from 'react-native';
import { Card, Text } from 'react-native-elements';
import {FlatList} from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }


class About extends Component { 

    static navigationOptions = {
        title: 'About',
    };

    render(){
        const {params} = this.props.navigation.state;
        const renderLeader = ({item, index}) =>{
            return(
                <View key={leader.id} style={{flex: 1, flexDirection: "row", margin: 5}}>
                  <Image
                    resizeMode="cover"
                    style={{height:50,width:50, margin: 2}}
                    source={{uri: baseUrl + item.image}}
                  />
                  <View style={{flex: 1,flexDirection: "column"}}>
                  <Text h4 style={{ margin : 2}}>{leader.name}</Text>
                  <Text>{leader.description}</Text>
                  </View>
                </View>
            );    
        };

        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else {

            return(
                <ScrollView>
                    <Card
                       featuredTitle="Our History" 
                       title="About us"
                    >
                    <Text>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, 
                    you never know what will arrive on your plate the next time you visit us.
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, 
                    that featured for the first time the world's best cuisines in a pan.
                    </Text>
                    </Card>
                    <Card title='Corporate Leadership'>
                    <FlatList 
                    data={this.props.leaders.leaders}
                    renderItem={renderLeader}
                    keyExtractor={item => item.id.toString()}
                    />
                    </Card>
                </ScrollView>
            );
        }
        
    }
}
export default connect(mapStateToProps)(About);