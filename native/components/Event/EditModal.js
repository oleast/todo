import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Modal, Text, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Item, Input, Form } from 'native-base';

import moment from 'moment'

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: this.props.text,
            where: this.props.where,
            date: this.props.date,
            time: this.props.date,
        }
    }

    handleDate = (event, date) => {
        this.setState({date: date})
    }

    handleTime = (event, time) => {
        this.setState({time: time})
    }

    handleClose = () => {
        const{toggleModal} = this.props
        toggleModal()
    }

    updateEvent = () =>  {
        const { text, where, date } = this.state
        if (text !== '' && date) {
            this.props.updateEvent(text, where, date)
        }
        this.handleClose()
        this.props.handleDelete()
    }

    render() {
        const { text, where, open, date, time } = this.state
        const { toggleModal, updateEvent, handleDelete, isOpen } = this.props

        return(
          <View style={{margin: 22}}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isOpen}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <Form>
                   <Item>
                     <Input placeholder="Description" onChangeText={(text) => this.setState({text})} value={text} />
                   </Item>
                   <Item last>
                     <Input placeholder="Where" onChangeText={(where) => this.setState({where})} value={where} />
                   </Item>
                </Form>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="datetime"
                    placeholder="select date"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                  <View>
                      <Button info style={{padding: 10, margin: 30}} onPress={this.updateEvent}>
                          <Text>Save</Text>
                      </Button>
                  </View>
                  <View>
                      <Button danger style={{padding: 10, margin: 30}} onPress={this.handleClose}>
                          <Text>Close</Text>
                      </Button>
                  </View>
                </View>
            </Modal>
          </View>
        )
    }
}
