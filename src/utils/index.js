import wepy from 'wepy'

/**
 * 提示信息
 */
wepy.baseToast = function (title='数据获取失败',icon="none"){
    wepy.showToast({title,icon})
}