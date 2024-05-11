const FormatUtil = {
    getDuration: (second:number) => {
        var days = Math.floor(second / 86400);
        var hours = Math.floor((second % 86400) / 3600);
        var minutes = Math.floor(((second % 86400) % 3600) / 60);
        var seconds = Math.floor(((second % 86400) % 3600) % 60);
        var duration = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
        return duration;
    }
};
export default FormatUtil;
