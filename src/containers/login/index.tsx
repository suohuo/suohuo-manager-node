import React, { useContext } from 'react'
import style from './index.scss'
import { Form, Input, Row, Col, Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { FormComponentProps } from 'antd/lib/form'
import store from '../../store'

const FormItem = Form.Item
interface Props {
  form: any
}
const Login: React.FC<Props> = (props) =>  {
  const loginStore = useContext(store)
  const {
    form: {
      getFieldDecorator,
      validateFields
    }
  } = props

  function handleSearch(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }
      console.log(211)
      loginStore.login(values)
    })
  }
  return (
    <div className={style.suo_huo_login}>
      <div className={style.suo_huo_wrap}>
       <Form layout='inline'>
        <Row>
          <FormItem label='账号'>
          {getFieldDecorator('account')(<Input style={{ width: 150 }} placeholder='请输入账号' />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem label='密码'>
          {getFieldDecorator('secret')(<Input style={{ width: 150 }} placeholder='请输入密码' />)}
          </FormItem>
        </Row>
        <Row>
          <FormItem>
            <Button type="primary" onClick={(e) => {handleSearch(e)}}>登陆</Button>
          </FormItem>
        </Row>
       </Form>
      </div>
    </div>
  )
}

export default Form.create<Props & FormComponentProps>()(observer(Login))