import React from 'react'
import { Button, Form, Input } from 'antd'

const AddTeacherForm = ({ userStore }) => {
  const [form] = Form.useForm()

  const onFinish = values => {
    userStore.addTeacher(values.teacherId)

    form.resetFields()
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const inputRules = [
    {
      required: true,
      message: 'Необходимо веести ID преподавателя',
    },
    {
      pattern: /^\w{24}$/gm,
      message: 'Некорректный ID',

    },
  ]

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="teacherId"
        rules={inputRules}
      >
        <Input
          placeholder="ID преподавателя"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить преподавателя
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTeacherForm
