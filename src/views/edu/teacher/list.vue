<template>
  <div class="app-container">
    讲师列表
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option :value="1" label="高价讲师"></el-option>
          <el-option :value="2" label="首席讲师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.gmtCreate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.gmtModified"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
     <el-form-item>
       <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
       <el-button type="default" @click="resetData()">清空</el-button>
     </el-form-item>
</el-form>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      style="width: 100%">
      <el-table-column
        label="序号"
        align="center"
        width="70">
        <template slot-scope="scope">
          {{(page-1)*limit+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="80">
      </el-table-column>
      <el-table-column
        label="头衔"
        width="80">
        <template slot-scope="scope">
          {{scope.row.level===1?'高级讲师':'首席讲师'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="资历"
        >
      </el-table-column>
       <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="160"
        >
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="60"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
        >
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope)">删除</el-button>            
        </template>
      </el-table-column>  
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      align="center"
      layout="prev, pager, next"
      :current-page="page"
      :page-size="limit"
      :total="total"
      @current-change="getList"
      >
</el-pagination>
  </div>
</template>
<script>

//引入teacher.js
import teacher from '@/api/edu/teacher.js'
export default {
  // 写核心代码位置
  data(){ //定义变量和初始值
    return{
      list:null, //查询之后接口返回集合
      page:1, //当前页
      limit:10, //每页记录数
      total:0, //总记录数
      teacherQuery:{} //条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    //调用
    this.getList()
  },
  methods:{ // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page=1){
      this.page=page
      teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
        .then(response =>{
            //response接口返回的数据
            // console.log(response)
            this.list = response.data.records
            this.total = response.data.total
            console.log(this.list) 
            console.log(this.total)
        })//请求成功
        .catch(error =>{
            console.log(error)
        }) //请求失败
    },
    resetData(){ //情况的方法
    //表单输入项数据清空
    this.teacherQuery = {}
    //查询所有讲师数据
    this.getList()

    }

  }

}
</script>