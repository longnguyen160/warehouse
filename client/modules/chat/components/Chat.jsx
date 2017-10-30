import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  FormStyled,
  PageStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  PageCustomStyled,
  Image
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import ReactDOM from "react-dom";

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const scroll = ReactDOM.findDOMNode(this.scroll);
    scroll.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const scroll = ReactDOM.findDOMNode(this.scroll);
    scroll.scrollTop = scroll.scrollHeight;
  }

  componentWillUnmount() {
    const scroll = ReactDOM.findDOMNode(this.scroll);
    scroll.removeEventListener('scroll', this.handleScroll);
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.sendMessage();
    }
  };

  sendMessage = () => {
    const message = this.message.value;
    const { sendMessage, getUserId } = this.props;

    sendMessage(message, getUserId);
    this.message.value = '';
  };

  chatWithOther = (userId) => {
    const { chatWithOther } = this.props;

    chatWithOther(userId);
  };

  handleScroll = () => {
  };

  render() {
    const { messages, userTarget, allUsers } = this.props;

    return (
      <FormStyled>
        <PageStyled chatBox>
          <FormBlockStyled show fullWidth>
            <FormGroupStyled chatBox>
              <PageCustomStyled
                chatBox
                ref={(element) => this.scroll = element}
              >
                {
                  messages.map((message, index) => (
                    <LineFormStyled
                      key={index}
                      position={message[0].fromUserId === Meteor.userId() ? 'right' : 'left'}
                      hasTitle
                      chatBox
                    >
                      <LineFormStyled margin>
                        {
                          message[0].fromUserId !== Meteor.userId() ?
                            <Image
                              search
                              src={userTarget.data.imageSrc}
                            />
                            : null
                        }
                        <LineFormStyled
                          hasTitle
                          noMargin
                          position={message[0].fromUserId === Meteor.userId() ? 'right' : 'left'}
                        >
                          {
                            message[0].fromUserId !== Meteor.userId() ?
                              <TitleFormStyled>
                                {userTarget.username}
                              </TitleFormStyled>
                              : null
                          }
                          {
                            message.map(messageData => (
                              <LineFormStyled
                                key={messageData._id}
                                user={messageData.fromUserId === Meteor.userId() ? 'current' : 'opposite'}
                              >
                                {messageData.message}
                              </LineFormStyled>
                            ))
                          }
                        </LineFormStyled>
                      </LineFormStyled>
                    </LineFormStyled>
                  ))
                }
              </PageCustomStyled>
            </FormGroupStyled>
            <FormGroupStyled input>
              <Input
                type='text'
                placeholder="Enter message..."
                onKeyPress={this.handleKeyPress}
                innerRef={(element) => this.message = element}
                chat
              />
              <Button hasBorder onClick={this.sendMessage}>Send</Button>
            </FormGroupStyled>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}
