import React from 'react';
import app from "../../firebase/firebase";
import { Form, Icon, Input, message } from 'antd';

class LoginForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
     if (!err) {
               app
               .auth()
               .signInWithEmailAndPassword(values.username, values.password)
               .then( () => {
                    this.props.handleCancel();
                    message.success('Loggin In')
               })
          }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
           <h2 className="login__subheading">Sign In</h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
            style={{width: 450, height: 65, fontSize: "19px", textIndent: "16px"}}
            placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              style={{width: 450, height: 65, fontSize: "19px", textIndent: "16px"}}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default WrappedLoginForm;