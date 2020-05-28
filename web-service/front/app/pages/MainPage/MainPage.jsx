import React from 'react'
import { inject, observer } from 'mobx-react'

import StudentRegistration from '@app/modules/user/StudentRegistration'
import TeacherRegistration from '@app/modules/user/TeacherRegistration'

import Text from '@locale'
import { UserRole } from '@app/constants'
import { Route as StudentPageRoute } from '@app/pages/StudentPage'
import { Route as TeacherPageRoute } from '@app/pages/TeacherPage'

@inject('userStore', 'navigationStore')
@observer
class MainPage extends React.Component {
  render() {
    const { userStore, navigationStore } = this.props

    if (userStore.role === UserRole.STUDENT) {
      navigationStore.goToPage(StudentPageRoute.path)
    }

    if (userStore.role === UserRole.TEACHER) {
      navigationStore.goToPage(TeacherPageRoute.path)
    }

    return (
      <div>
        <StudentRegistration
          startButtonText={Text.page.main.studentAuthentication}
          userStore={userStore}
        />
        <TeacherRegistration
          startButtonText={Text.page.main.teacherAuthentication}
          userStore={userStore}
        />
      </div>
    )
  }
}

export default MainPage
