import React from 'react';
import app from "../../firebase/firebase";
import { Form, Icon, Input, message } from 'antd';

class Register extends React.Component {

  handleSubmit = (e, handleCancel) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
     if (!err) {
               app
               .auth()
               .createUserWithEmailAndPassword(values.username, values.password)
               .then(function onSuccess(...args) {
                    app.firestore().collection("users").add({
                         email: values.username
                     })
                     .then(function(docRef) {
                         message.success('Loggin In')
                     })
                     .catch(function(error) {
                         console.error("Error adding document: ");
                     });
               })
               .then(()=>{
                    this.props.handleCancel();
               })
          }
    });
  };

  render() {
     //   console.log(this.props.handleCancel())
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
           <h2 className="login__subheading">Register</h2>
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
          <button type="primary" onClick={this.handleSubmit} className="login-form-button">
            Register
          </button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegister = Form.create({ name: 'normal_login' })(Register);
export default WrappedRegister;