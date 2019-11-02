import wepy from 'wepy'

const baseUrl = 'https://uinav.com/api/public/v1'

/**
 * 提示信息
 */
wepy.baseToast = function (title = '数据获取失败', icon = "none") {
    wepy.showToast({ title, icon })
}

/**
 * get请求
 */
wepy.get = function (path, data = {}) {
    return wepy.request({
        url: baseUrl + path,
        data
    })
}

/**
* post请求
*/
wepy.post = function (path, data = {}) {
    return wepy.request({
        url: baseUrl + path,
        data,
        method: 'post'
    })
}