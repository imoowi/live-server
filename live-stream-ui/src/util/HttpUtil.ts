const timeout = 5000;

const HttpUtil = {
    get: (url:string, params:any, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true }) => {
        if (!httpCustomerOpertion.hasOwnProperty('isHandleResult')) {
            httpCustomerOpertion.isHandleResult = true;
        }
        if (!httpCustomerOpertion.hasOwnProperty('isShowLoading')) {
            httpCustomerOpertion.isShowLoading = true;
        }
        let fetchUrl = url;
        fetchUrl +=
            '?' +
            Object.keys(params)
                .map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                })
                .join('&');
        const method = 'GET';
        const fetchParams = Object.assign({}, { method }, HttpUtil.getHeaders());
        return HttpUtil.handleFetchData(fetchUrl, fetchParams, httpCustomerOpertion);
    },
    post: (url:string, params = {}, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true }) => {
        if (!httpCustomerOpertion.hasOwnProperty('isHandleResult')) {
            httpCustomerOpertion.isHandleResult = true;
        }
        if (!httpCustomerOpertion.hasOwnProperty('isShowLoading')) {
            httpCustomerOpertion.isShowLoading = true;
        }
        const method = 'POST';
        const body = JSON.stringify(params); // 将参数转化成JSON字符串
        const fetchParams = Object.assign({}, { method, body }, HttpUtil.getHeaders());
        return HttpUtil.handleFetchData(url, fetchParams, httpCustomerOpertion);
    },
    put: (url:string, params = {}, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true }) => {
        if (!httpCustomerOpertion.hasOwnProperty('isHandleResult')) {
            httpCustomerOpertion.isHandleResult = true;
        }
        if (!httpCustomerOpertion.hasOwnProperty('isShowLoading')) {
            httpCustomerOpertion.isShowLoading = true;
        }
        const method = 'PUT';
        const body = JSON.stringify(params); // 将参数转化成JSON字符串
        const fetchParams = Object.assign({}, { method, body }, HttpUtil.getHeaders());
        return HttpUtil.handleFetchData(url, fetchParams, httpCustomerOpertion);
    },
    delete: (url:string, params:any, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true }) => {
        if (!httpCustomerOpertion.hasOwnProperty('isHandleResult')) {
            httpCustomerOpertion.isHandleResult = true;
        }
        if (!httpCustomerOpertion.hasOwnProperty('isShowLoading')) {
            httpCustomerOpertion.isShowLoading = true;
        }
        let fetchUrl = url;
        fetchUrl +=
            '?' +
            Object.keys(params)
                .map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                })
                .join('&');
        const method = 'DELETE';
        const fetchParams = Object.assign({}, { method }, HttpUtil.getHeaders());
        return HttpUtil.handleFetchData(fetchUrl, fetchParams, httpCustomerOpertion);
    },
    showLoading: () => {},
    hideLoading: () => {},
    handleFetchData: (fetchUrl:string, fetchParams:any, httpCustomerOpertion:any) => {
        // 1. 处理的第一步
        const { isShowLoading } = httpCustomerOpertion;
        if (isShowLoading) {
            HttpUtil.showLoading();
        }
        httpCustomerOpertion.isFetched = false;
        httpCustomerOpertion.isAbort = false;
        // 处理自定义的请求头
        if (httpCustomerOpertion.hasOwnProperty('customHead')) {
            const { customHead } = httpCustomerOpertion;
            fetchParams.headers = Object.assign({}, fetchParams.headers, customHead);
        } // 2. 对fetch请求再进行一次Promise的封装
        const fetchPromise = new Promise((resolve, reject) => {
            fetch(fetchUrl, fetchParams)
                .then((response) => {
                    // console.log('response=', response);
                    // 3. 放弃迟到的响应
                    if (httpCustomerOpertion.isAbort) {
                        // 3. 请求超时后，放弃迟到的响应
                        return;
                    }
                    if (isShowLoading) {
                        HttpUtil.hideLoading();
                    }
                    httpCustomerOpertion.isFetched = true;
                    response
                        .json()
                        .then((jsonBody) => {
                            // console.log('jsonBody=', jsonBody);
                            if (response.status == 200) {
                                resolve(HttpUtil.handleResult(jsonBody, httpCustomerOpertion));
                            } else {
                                // 5. 接口状态判断
                                // http status header <200 || >299
                                let msg = '当前服务繁忙，请稍后再试';
                                if (response.status === 404) {
                                    msg = '您访问的内容走丢了…';
                                }
                                if (response.status === 401) {
                                    // localStorage.removeItem('token');
                                    window.location.href = '/login?bakurl=' + encodeURIComponent(window.location.pathname);
                                }
                                if (response.status === 400) {
                                    msg = '访问失败';
                                }
                                if (jsonBody.message != '') {
                                    msg = jsonBody.message;
                                }
                                reject(HttpUtil.handleFailedResult({ fetchStatus: 'error', netStatus: response.status, error: msg }, httpCustomerOpertion));
                            }
                        })
                        .catch((e) => {
                            const errMsg = e.name + ' ' + e.message;
                            reject(HttpUtil.handleFailedResult({ fetchStatus: 'error', error: errMsg, netStatus: response.status }, httpCustomerOpertion));
                        });
                })
                .catch((e) => {
                    const errMsg = e.name + ' ' + e.message;
                    // console.error('ERR:', fetchUrl, errMsg)
                    if (httpCustomerOpertion.isAbort) {
                        // 请求超时后，放弃迟到的响应
                        return;
                    }
                    if (isShowLoading) {
                        HttpUtil.hideLoading();
                    }
                    httpCustomerOpertion.isFetched = true;
                    httpCustomerOpertion.isHandleResult //&& toast.info('网络开小差了，稍后再试吧', 2);
                    reject(HttpUtil.handleFailedResult({ fetchStatus: 'error', error: errMsg }, httpCustomerOpertion));
                });
        });
        return Promise.race([fetchPromise, HttpUtil.fetchTimeout(httpCustomerOpertion)]);
    },
    handleResult: (result:any, httpCustomerOpertion:any) => {
        if (result.status && httpCustomerOpertion.isHandleResult === true) {
            const errMsg = result.msg || result.message || '服务器开小差了，稍后再试吧';
            const errStr = `${errMsg}（${result.status}）`;
            // HttpUtil.hideLoading();
            // Toast.info(errStr, 2);
        }
        return result;
    },
    handleFailedResult: (result:any, httpCustomerOpertion:any) => {
        console.log('failed result =', result);
        if (result.status && httpCustomerOpertion.isHandleResult === true) {
            const errMsg = result.msg || result.message || '服务器开小差了，稍后再试吧';
            const errStr = `${errMsg}（${result.status}）`;
            HttpUtil.hideLoading();
            // Toast.info(errStr, 2);
        }
        // const errorMsg = 'Uncaught PromiseError: ' + (result.netStatus || '') + ' ' + (result.error || result.msg || result.message || '');
        const errorMsg = (result.netStatus || '') + ' ' + (result.error || result.msg || result.message || '');
        return errorMsg;
    },
    fetchTimeout: (httpCustomerOpertion:any) => {
        const { isShowLoading } = httpCustomerOpertion;
        return new Promise((resolve, reject) => {
            console.log(resolve)
            setTimeout(() => {
                if (!httpCustomerOpertion.isFetched) {
                    // 还未收到响应，则开始超时逻辑，并标记fetch需要放弃
                    httpCustomerOpertion.isAbort = true;
                    // console.error('ERR: 请求超时')
                    if (isShowLoading) {
                        HttpUtil.hideLoading();
                    }
                    // Toast.info('网络开小差了，稍后再试吧', 2);
                    reject({ fetchStatus: 'timeout' });
                }
            }, httpCustomerOpertion.timeout || timeout);
        });
    },
    getHeaders: () => {
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem(`token`)
            }
        };
    }
};

export default HttpUtil;
