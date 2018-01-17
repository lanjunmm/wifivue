<template>
  <el-dialog
    title="添加校园网"
    :visible.sync="todo"
    :before-close="handleClose"
    width="500px">

    <el-table :data="list"  id="tableId">
      <el-table-column property="SSID" label="wifiSSID" width="100"></el-table-column>
      <el-table-column  fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRowId(scope.$index, list)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="form">
      <el-form-item label="wifi名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="setSSID">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//  import ElTable from "../../../node_modules/element-ui/packages/table/src/table.vue";
import webStorageGet from '@/util/webStorageGet.js'
import webStorageDel from '@/util/webStorageDel.js'
import webStorageSet from '@/util/webStorageSet.js'

  var _this=null;
  export default {
    components: {},
    name:'ssiddialog',
    mouted(){
//      this.getGridDatas();
    },
    props:['todo','list'],
    data(){
      return{
//        dialogVisible:false,
        gridDatas:[],
        form: {
          name: '',
          delivery: false,
          type: [],
        },//input表单绑定的数据
        formLabelWidth: '100px',
      }
    },
    methods:{
      deleteRowId(index, rows) {//删除表格web存储id，删除表格行，将已存在标记置为false
        let delId=rows[index].SSID;
        webStorageDel(delId);
        this.$store.dispatch("deleteSchId",delId);
        rows.splice(index, 1);
      },
      setSSID(){
        _this=this;
        _this.$emit("closeDia");
        if(!_this.$store.state.existSSID[_this.form.name]){
          webStorageSet(_this.form.name);
          let item={  //表格数据
            SSID:_this.form.name,
          };
          _this.list.push(item);
          _this.$store.dispatch("addSchId",_this.form.name);
        }
        else alert(_this.form.name,"已存在");
        _this.form.name='';
      },
      handleClose(done) { //对话框上面那把叉叉，点击后处理
        this.$emit("closeDia");
        done();
      },
      cancle(){
        this.$emit("closeDia");
      }
    }
  }
</script>

<style>

</style>
