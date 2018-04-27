<template>
<form method="post" id="myForm" enctype="multipart/form-data">
  <div class="btn" @click="clickFile">选择文件</div>
  <input type="file" id="myFile" multiple @change="logFile" ref="fileInput" />
  <table id="upload-list" :style="disStyle">
    <thead>
      <tr>
        <th width="35%">文件名</th>
        <th width="15%">文件类型</th>
        <th width="15%">文件大小</th>
        <th width="20%">上传进度</th>
        <th width="15%">
          <input type="button" id="upload-all-btn" :value="allBtn" @click="allUpload" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in curFiles" :key="index">
        <td width="35%">{{ item.name }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.fileSize }}</td>
        <td class="upload-progress">{{ item.progress }}</td>
        <td>
          <input type="button" class="upload-item-btn" :data-name="item.name" :data-size="item.size" :value="item.uploadVal" @click="section" :data-index="index" :disabled="item.disabled" data-status="Default" ref="uploadBtn"/>
        </td>
      </tr>
    </tbody>
  </table>
</form>
</template>
<script>
export default {
  name: 'resuming',
  data() {
    return {
      curFiles: [],
      disStyle: '',
      eachSize: 1024,
      allBtn: '全部上传'
    }
  },
  methods: {
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

      this.curFiles.forEach((value, index, arr) => {
        // 大小转换
        value.fileSize = value.size > 1024 ? value.size / 1024 > 1024 ? value.size / (1024 * 1024) > 1024 ? (value.size / (1024 * 1024 * 1024)).toFixed(2) + 'GB' : (value.size / (1024 * 1024)).toFixed(2) + 'MB' : (value.size / 1024).toFixed(2) + 'KB' : (value.size).toFixed(2) + 'B'
      })
      this.upProgress({length: 0})

      // 显示样式
      this.curFiles.length === 0 ? this.disStyle = '' : this.disStyle = 'display: table'
    },
    // 更新进度条 以及按钮
    upProgress: function(data) {
      let _this = this
      this.curFiles.forEach((value, index, arr) => {
        let percent = window.localStorage.getItem(value.name + '_p')
        if ((percent && data.length === 0)) {
          value.uploadVal = '继续上传'
          value.progress = '已上传' + percent + '%'
        } else if (percent && percent !== '100.0' && data.status === 'uping') {
          if (value.name === data.name) {
            value.uploadVal = '暂停上传'
          }
          value.progress = '已上传' + percent + '%'
        } else if (!percent) {
          value.uploadVal = '开始上传'
          value.progress = '未上传'
        } else if (data.status === 'pause') {
          if (value.name === data.name) {
            value.uploadVal = '继续上传'
          }
        }
        if (percent && percent === '100.0') {
          value.uploadVal = '完成上传'
          value.progress = '已完成'
          value.disabled = true
          value.status = 'done'
        }
        _this.$set(_this.curFiles, index, value)
      })
    },
    // 利用ajax formData上传文件
    uploadFile: function(fObj) {
      let _this = this
      fObj.chunk = window.localStorage.getItem(fObj.fileName + '_chunk') || fObj.chunk
      fObj.chunk = +fObj.chunk
      let cancelToken = this.$ajax.CancelToken
      let source = cancelToken.source()
      this.curFiles[fObj.index].source = source
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8008/resuming.php',
        data: fObj.myForm,
        timeout: fObj.timeOut,
        cancelToken: _this.curFiles[fObj.index].source.token
      })
        .then((res) => {
          // 当前上传的文件段
          window.localStorage.setItem(fObj.fileName + '_chunk', ++fObj.chunk)
          window.localStorage.setItem(fObj.fileName + '_p', fObj.percent)
          _this.upProgress(fObj.data)
          let blobForm = fObj.chunk * _this.eachSize // 当前段
          let eachSize = _this.eachSize // 一次上传的文件大小
          let totalSize = fObj.myForm.get('totalSize')
          let blobTo = (fObj.chunk + 1) * eachSize > totalSize ? totalSize : (fObj.chunk + 1) * eachSize // 目标段
          let isLastChunk = blobTo === totalSize ? 1 : 0 // 判断是否是最后一段
          let percent = (100 * blobTo / totalSize).toFixed(1) // 上传的百分比
          fObj.percent = percent
          fObj.myForm.set('theFile', _this.curFiles[fObj.index].slice(blobForm, blobTo))
          fObj.myForm.set('isLastChunk', isLastChunk)
          if (!(fObj.chunk >= fObj.chunks) && fObj.data.status !== 'pause') {
            _this.uploadFile(fObj)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 分段操作
    section: function(e) {
      this.uploadClick(e)
      let fileName = e.target.dataset.name // 文件名
      let fileIndex = e.target.dataset.index // 文件名
      this.curFiles[fileIndex].status = e.target.dataset.status // 文件状态
      let eachSize = this.eachSize // 一次上传的文件大小
      let totalSize = e.target.dataset.size // 文件总大小
      let chunks = Math.ceil(totalSize / eachSize) // 总共多少段文件
      let chunk = +(window.localStorage.getItem(fileName + '_chunk')) || 0 // 当前文件是要上传哪一段文件
      let blobForm = chunk * eachSize // 当前段
      let blobTo = (chunk + 1) * eachSize > totalSize ? totalSize : (chunk + 1) * eachSize // 目标段
      let isLastChunk = blobTo === totalSize ? 1 : 0 // 判断是否是最后一段
      let percent = (100 * blobTo / totalSize).toFixed(1) // 上传的百分比
      let timeOut = 5000 // 超时时间
      let myForm = new FormData()
      myForm.append('theFile', this.curFiles[fileIndex].slice(blobForm, blobTo))
      myForm.append('fileName', fileName)
      myForm.append('totalSize', totalSize)
      myForm.append('isLastChunk', isLastChunk)
      this.uploadFile({
        myForm,
        chunks,
        chunk,
        fileName,
        percent,
        timeOut,
        index: fileIndex,
        data: e.target.dataset
      })
    },
    // 点击全部上传
    allUpload: function() {
      for (let i of this.$refs.uploadBtn) {
        i.click()
      }
      if (this.allBtn === '暂停上传') {
        this.allBtn = '全部上传'
      } else {
        this.allBtn = '暂停上传'
      }
    },
    // 点击事件
    uploadClick: function(e) {
      let status = e.target.dataset.status
      let index = e.target.dataset.index
      if (status === 'Default') {
        e.target.dataset.status = 'uping'
      } else if (status === 'uping') {
        e.target.dataset.status = 'pause'
        this.curFiles[index].source.cancel('取消上传')
      } else if (status === 'pause') {
        e.target.dataset.status = 'uping'
      }
    },
    // 触发input点击
    clickFile: function() {
      this.$refs.fileInput.click()
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    body
      font-family Microsoft YaHei
    form
      margin 50px auto
      width 800px
      box-shadow 1px 1px 5px #a9a6a6
      padding 30px
      text-align left
      .btn
        width 105px
        height 20px
        padding 5px
        background-color #aaa
        border-radius 5px
        color #fff
        font-size 15px
        cursor pointer
        text-align center
    input[type='file']
      cursor pointer
      display none
    table
      width 100%
      display none
      margin-top 15px
      border-collapse collapse
      table-layout fixed
      th
        color #666
      td,th
        padding 5px
        border 1px solid #ddd
        text-align center
        font-size 14px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        vertical-align middle
</style>
