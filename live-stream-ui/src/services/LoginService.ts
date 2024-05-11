import HttpUtil from "../util/HttpUtil"

const LoginService={
    getCaptcha:()=>{
        return HttpUtil.get('/api/common/captcha',{r:Math.random()}).then((res:any)=>{
            return res
        }).catch((e:any)=>e)
    },
    login:(login:any)=>{
        return HttpUtil.post('/api/auth-login',login).then((res:any)=>{
            return res
        }).catch((e:any)=>e)
    }
}
export default LoginService