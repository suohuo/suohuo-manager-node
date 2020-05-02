import React from 'react'
import { Form, Input, Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { FormComponentProps } from 'antd/lib/form'


const FormItem = Form.Item
interface Props {
  form: any
}

const Search: React.FC<Props> = (props) => {
  const {
    form: {
      getFieldDecorator,
      validateFields
    }
  } = props

  function handleSearch(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }

    })
  }
  return (
    <>
     <Form layout='inline'>
       <FormItem label='用户ID'>
         {getFieldDecorator('userId')(<Input style={{ width: 150 }} placeholder='请输入用户ID' />)}
       </FormItem>
       <FormItem>
         <Button type='primary' htmlType='submit' onClick={(e) => {handleSearch(e)}}>
            搜索
         </Button>
       </FormItem>
     </Form>
    </>
  )
}


export default Form.create<Props & FormComponentProps>()(observer(Search))