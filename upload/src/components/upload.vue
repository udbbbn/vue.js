<template>
<div>
  <p>文件上传</p>
  <form name="form1" method="post" enctype="multipart/form-data" class="form" ref="form">
    <input type="file" name="fileInput" id="fileInput" multiple ref="fileInput" @change="logFile">
    <div class="input" @click="inputClick">
      <span class="file-item" v-for="(item, index) in curFiles" :key="index" v-if="index < 4">
        <span class="file-temp-name" :style="widValue">{{ item.name }}
          <span class="file-temp-btn" @click.stop="deleteFile" :data-name="item.name">×</span>
        </span>
      </span>
      <ul class="item-more" :style="disValue">
        <li v-for="(item, index) in curFiles" :key="index" v-if="index > 3">
          {{ item.name }}
          <div class="file-more-btn" @click.stop="deleteFile" :data-name="item.name">×</div>
        </li>
      </ul>
    </div>
    <label @click="uploadFile">上传</label>
    <br>
  </form>
  <p class="upload-tip" v-if="uptValue.type === 1">{{uptValue.msg}}</p>
  <p class="upload-tip" v-if="uptValue.type === -1">{{uptValue.msg}}</p>
</div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      curFiles: [],
      widValue: '',
      disValue: '',
      uptValue: {
        type: 1,
        msg: ''
      }
    }
  },
  methods: {
    inputClick: function() {
      this.$refs.fileInput.click()
    },
    logFile: function(e) {
      let file = e.target.files
      // fileList对象不可修改 只能清空
      // Array.prototype.push.apply(this.curFiles, file)
      // 上条语句可以修改数组值 但是无法更新视图
      let arr = []
      arr = file
      let length = arr.length

      // 相同文件不允许上传
      for (let j of arr) {
        this.curFiles.forEach((value, index, arr) => {
          if (j.name === value.name && j.size === value.size) {
            arr.splice(index, 1)
          }
        })
      }

      for (let i = 0; i < length; i++) {
        // 利用set更新视图
        this.$set(this.curFiles, this.curFiles.length, arr[i])
      }
    },
    deleteFile: function(e) {
      this.curFiles.forEach((value, index, arr) => {
        if (e.target.dataset.name === value.name) {
          this.curFiles.splice(index, 1) // 删除该值
        }
      })
    },
    // 利用ajax formData上传文件
    uploadFile: function() {
      let form = this.$refs.form
      let myForm = new FormData(form)
      let file = this.$refs.fileInput.files
      for (let i of file) {
        // 因为是多文件上传 所有要用[] 否则连续的append会覆盖
        myForm.append('fileInput[]', i)
      }
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8008/uploadFile.php',
        data: myForm
      })
        .then((res) => {
          this.uptValue = {
            type: 1,
            msg: res.data
          }
        })
        .catch(function (error) {
          this.uptValue = {
            type: 0,
            msg: error
          }
        })
    }
  },
  watch: {
    'curFiles': function() {
      let value = (90 / this.curFiles.length) - this.curFiles.length
      if (this.curFiles.length >= 4) {
        value = 19
        this.disValue = 'display: block'
      }
      this.widValue = 'width:' + value + '%'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .form
    display flex
    justify-content center
    text-align center
    label
      width 60px
      height 30px
      line-height 30px
      display block
      border-radius 5px
      color #757575
      background-color #d6cdcd
    #fileInput
      display none
    .input
      width 265px
      height 30px
      margin 0 10px
      border 1px solid #afa8a8
      border-radius 5px
      padding 0 5px
      text-align left
      box-sizing border-box
      position relative
      .file-item
        height 24px
        line-height 24px
        margin 2px 0
        .file-temp-name
          width 92%
          height 24px
          margin 2px 10px 2px 0px
          padding-right 5px
          border-radius 2px
          font-size 14px
          text-indent 6px
          position relative
          display inline-block
          overflow hidden
          background-color #eaeaf3
          text-overflow ellipsis
          white-space nowrap
          vertical-align middle
          .file-temp-btn
            width 15px
            height 15px
            line-height 15px
            font-size 15px
            border-radius 50%
            top 5px
            right 3px
            text-indent 3px
            position absolute
            display inline-block
            color #fff
            background-color #c4c4ce
      .item-more
        width 263px
        max-height 150px
        padding-left 0
        margin 0
        margin-left -5px
        position absolute
        overflow-y auto
        list-style none
        display none
        li
          width 100%
          padding 5px
          padding-right 6%
          box-sizing border-box
          text-align left
          border 1px solid #ccc
          border-top none
          position relative
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          vertical-align middle
          &:hover
            background-color: #f5f5f9;
          .file-more-name
            display inline-block
            width 90%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .file-more-btn
            position absolute
            display inline-block
            top 6px
            right 2%
            width 13px
            height 13px
            line-height 14px
            text-align center
            border 1px solid #ddd
            background-color #ddd
            border-radius 50%
            color #fff
            font-size 18px
            cursor pointer
            &:hover
              background-color #ccc
    .upload-tip
      display block
      margin 50px auto
      text-align center
      font-size 12px
</style>
