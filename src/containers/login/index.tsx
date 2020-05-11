import React, { useContext, useState } from 'react'
import style from './index.scss'
import { Form, Input, Row, Col, Button, Upload, message } from 'antd'
import { observer } from 'mobx-react-lite'
import { FormComponentProps } from 'antd/lib/form'
import store from '../../store'

const FormItem = Form.Item
interface Props {
  form: any
}
const Login: React.FC<Props> = (props) =>  {
  const loginStore = useContext(store)
  const [imageUrl, setImageUrl] = useState('')
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

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  function handleChange (info) {
    console.log('info', info)
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.data)
      // Get this url from response in real world.
      
    }
  };
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
      <div>
       <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/v1/oss/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : '+'}
       </Upload>
      </div>
    </div>
  )
}

export default Form.create<Props & FormComponentProps>()(observer(Login))