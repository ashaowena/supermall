<template>
  <div class="detail-comment-info">
    <div class="detail-comment-title">
      <div class="left-flow">用户评价</div>
      <div class="right-flow">更多</div>
    </div>
    <div class="detail-comment">
      <div class="detail-comment-userInfo">
        <img v-if="commentInfo.user" :src="commentInfo.user.avatar" alt="">
        <div v-if="commentInfo.user" v-text="commentInfo.user.uname"></div>
      </div>
      <div class="detail-comment-content">
        {{commentInfo.content}}
      </div>
      <div class="detail-comment-detail">
        <div>
          <span>{{showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <img v-for="item in commentInfo.images" :src="item">
      </div>
    </div>

  </div>
</template>

<script>
import {formatDate} from '@/common/utils'
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: 'DetailCommentInfo',
  components: {NavBar},
  props: {
    commentInfo: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    showDate() {
      //将时间戳转换成date对象
      const date = new Date(this.commentInfo.created * 1000);
      //将date进行格式化
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  // filters: {
  //   showDate(value) {
  //     //将时间戳转换成date对象
  //     const date = new Date(value * 1000);
  //     //将date进行格式化
  //     return formatDate(date, 'yyyy-MM-dd');
  //
  //   }
  // }
}
</script>

<style lang="less" scoped>
.detail-comment-title {
  height: 44px;
  border-bottom: 3px solid #ececec;
  text-align: center;
  line-height: 44px;
  color: black;
  .left-flow {
    float: left;
    margin: 0 4px;
  }
  .right-flow {
    float: right;
    margin: 0 4px;
  }
}

.detail-comment {
  padding: 10px 10px;

  .detail-comment-userInfo {
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-weight: 700;
    color: black;
    img {
      height: 100%;
      float: left;
    }
    div {
      float: left;
      margin: 0 10px;
    }
  }

  .detail-comment-content {
    margin: 10px 0;
  }
  .detail-comment-detail {
    color: gray;
    div {
      margin: 10px 0;
      font-size: small;
      span {
        margin-right: 10px;
      }
    }
    img {
      height: 80px;
      width: 80px;
    }
  }


}

</style>
