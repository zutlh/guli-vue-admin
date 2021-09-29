import request from '@/utils/request'


export default{
    // 1 讲师列表(条件查询分页)
    // current当前页，limit每页记录数，teacherQuery条件对象
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            // url: '/serviceedu/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
            url: `/serviceedu/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // teacherQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换json进行传递到接口里面
            data: teacherQuery
          })
    },
    // 逻辑删除讲师
    deleteTeacherId(id){
        return request({
            url: `/serviceedu/edu-teacher/${id}`,
            method: 'delete',
          })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/serviceedu/edu-teacher/addTeacher`,
            method: 'post',
            data: teacher
          })      
    },
    getTeacherInfo(id){
        return request({
            url: `/serviceedu/edu-teacher/queryTeacher/${id}`,
            method: 'get'
          })    
    },
    // 修改讲师
    updateTeacherInfo(teacher){ 
        return request({
        url: `/serviceedu/edu-teacher/update`,
        method: 'post',
        data:teacher
      })   

    }
}

