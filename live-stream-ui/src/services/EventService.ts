import EventModel from "../models/EventModel"
import HttpUtil from "../util/HttpUtil"

const EventService={
    GetList1:()=>{
        return HttpUtil.get('/api/events','').then((res:any)=>{
            return res
        }).catch((e:any)=>e)
    },
    GetList:()=>{
        return HttpUtil.get('/api/events','').then((res:any)=>{return res}).catch((e:any)=>e)
    },
    Add:(event:EventModel)=>{
        return HttpUtil.post('/api/events',event).then((res:any)=>{return res}).catch((e:any)=>e)
    },
    Update:(event:EventModel,id:number)=>{
        return HttpUtil.put('/api/events/'+id,event).then((res:any)=>{return res}).catch((e:any)=>e)
    },
    Delete:(id:number)=>{
        return HttpUtil.delete('/api/events/'+id,'').then((res:any)=>{return res}).catch((e:any)=>e)
    }
}
export default EventService