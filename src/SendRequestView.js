import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Cell, Div, Group, Input, Panel, View} from '@vkontakte/vkui'
import VKLogo from '@vkontakte/icons/dist/24/logo_vk'
import {HeaderWithBackButton} from './HeaderWithBackButton'
import './SendRequestPanel.css'
import {PhoneInput} from './PhoneInput'

let state = {
    name: '',
    phone: ''
}

export class SendRequestView extends Component {
    static propTypes = {onBack: PropTypes.func, id: PropTypes.string}

    constructor(props) {
        super(props)
        this.state = state
    }

    componentWillUnmount() {
        state = this.state
    }

    orComponent = (
        <Div className={'centered'}>
            <span>или</span>
        </Div>
    )

    vkConnectButton = (
        <Button className={'centered'}>
            <span className={'centered'}>
                <VKLogo />
                <span>Отправить заявку с данными профиля</span>
            </span>
        </Button>
    )

    sendButton = (
        <Button
            stretched
            size={'l'}
            onClick={() => {
                this.sendForm()
                this.showFormSendedAlert()
            }}
        >
            Отправить заявку
        </Button>
    )

    getPhoneComponent() {return (
        <div>
            <span>Телефон</span>
            <PhoneInput
                placeholder={'+79211234567'}
                value = {this.state.phone}
                onChange={(value) => this.setState({phone: value})}
            />
        </div>
    )}

    getNameComponent(){return (
        <div>
            <span>Имя</span>
            <Input
                type={'text'}
                placeholder={'Иван'}
                value = {this.state.name}
                onChange={(e) => this.setState({name: e.target.value})}
            />
        </div>
    )}

    getManualForm() {return (
        <Div>
            <Cell>{this.getNameComponent()}</Cell>
            <Cell>{this.getPhoneComponent()}</Cell>
            <Cell>{this.sendButton}</Cell>
        </Div>
    )}

    automaticButton = (
        <Div className={'centered'} style={{flexDirection: 'column'}}>
            {this.vkConnectButton}
        </Div>
    )

    panelHeader = (
        <HeaderWithBackButton
            onBackButtonClick={this.props.onBack}
            text={'Отправить заявку'}
        />
    )

    getForm() {return (
        <Group>
            {this.automaticButton}
            {this.orComponent}
            {this.getManualForm()}
        </Group>
    )}

    render() {
        return (
            <View
                id={this.props.id}
                activePanel={this.props.id + 'main'}
                header
            >
                <Panel id={this.props.id + 'main'}>
                    {this.panelHeader}
                    {this.getForm()}
                </Panel>
            </View>
        )
    }

    sendForm() {
        const {name, phone} = this.state
        console.log(name)
        console.log(phone)
    }

    showFormSendedAlert() {
        console.log('alert')
    }
}
