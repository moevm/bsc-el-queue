import React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'

import { Route as RoomPageRoute } from '@app/pages/RoomPage'

const RoomConnection = ({ navigationStore }) => {
  const onFinish = values => {
    const path = RoomPageRoute.getUrl({ roomId: values.roomId })

    navigationStore.goToPage(path)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const inputRules = [
    {
      required: true,
      message: 'Необходимо веести ID комнаты',
    },
    {
      pattern: /^\w{24}$/gm,
      message: 'Некорректный ID',

    },
  ]

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="ID комнаты"
        name="roomId"
        rules={inputRules}
      >
        <Input/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Присоединиться
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RoomConnection |> observer |> inject('navigationStore')
