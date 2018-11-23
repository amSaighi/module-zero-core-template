import { Form, Col, Input, Icon, Row, Checkbox, Button, Card } from 'antd';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
// import { withRouter } from "react-router-dom";
import AuthenticationStore from 'src/stores/authenticationStore';
import Stores from './../../stores/storeIdentifier';
import { FormComponentProps } from 'antd/lib/form';

const FormItem = Form.Item;
const group = {
  height: 19,
  fontFamily: 'Nunito',
  fontSize: 14,
  fontWeight: 500,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  color: '#818181',
  marginLeft: 0,
  marginTop: 20,
}; // TODO: CSS dosyasına taşınması gerekiyor.

export interface ILoginProps extends FormComponentProps {
  authenticationStore: AuthenticationStore;
  item: any;
}

@inject(Stores.AuthenticationStore)
@observer
class Login extends React.Component<ILoginProps, any> {
  constructor(props: ILoginProps) {
    super(props);
  }
  state = { rememberMe: true };

  rememberMeCheck = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };
  public hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.authenticationStore.login(values);
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 4, offset: 10 }}
            xl={{ span: 4, offset: 10 }}
            xxl={{ span: 4, offset: 10 }}
          >
            <div style={group}>{'Tenant Name'}</div>

            <Form className="login-form" onSubmit={this.handleSubmit}>
              {!this.props.item ? (
                <FormItem>
                  {getFieldDecorator('TENANT NAME', {
                    rules: [
                      {
                        required: true,
                        message: 'Tenant name is required.',
                      },
                    ],
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="" size="large" />)}
                </FormItem>
              ) : (
                ''
              )}

              <div style={group}>{'Mail'}</div>
              <FormItem>
                {getFieldDecorator('mail', {
                  rules: [
                    {
                      required: true,
                      message: 'User Name is required.',
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder=""
                    size="large"
                    //   onChange={}
                  />
                )}
              </FormItem>
              <div style={group}>{'Password'}</div>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password is is required.' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder=""
                    size="large"
                    // onChange={this.setMail(e)}
                  />
                )}
              </FormItem>
              <Row>
                <div style={{ margin: '0px 0px 10px 15px ' }}>
                  <Checkbox checked={this.state.rememberMe} onChange={this.rememberMeCheck} />
                  {'RememberMe'}
                </div>
              </Row>
              <Row>
                <Col span={14} push={4}>
                  <Button htmlType={'submit'}>Login</Button>
                </Col>
              </Row>
              <Row>
                <Col span={14} push={7}>
                  {/* <Link to={`/forgetpassword`}>{"ForgotPassword"}</Link> */}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    );
  }
}

const newLogin = Form.create()(Login);
export default withRouter<any>(newLogin);