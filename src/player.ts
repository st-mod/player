import { Shell, Div, Checkbox, NumberBar, TimeBar } from '@ddu6/stui'
import {all as allIcons} from './lib/icons'
import {all as allCSS} from './lib/css'
export class Player extends Shell{
    readonly videoEle=document.createElement('video')
    readonly toolBar=new Div(['tool bar'])
    readonly bars={
        time:new TimeBar('time',0),
        speed:new NumberBar('speed',0.2,1,5,true),
        brightness:new NumberBar('brightness',0.1,1,10,true)
    }
    readonly checkboxes={
        play:new Checkbox('play')
    }
    constructor(){
        super('Player','',allIcons+allCSS,['player'])
        this
        .append(this.videoEle)
        .append(
            this.toolBar
            .append(
                new Div()
                .append(this.checkboxes.play)
                .append(this.bars.time)
            )
            .append(
                new Div()
                .append(this.bars.speed)
                .append(this.bars.brightness)
            )
        )
        const params=new URLSearchParams(document.location.search)
        const src=params.get('src')??document.documentElement.dataset.src??''
        if(src!==''){
            this.videoEle.src=src
        }
        const time=Number(params.get('t')??document.documentElement.dataset.t??'')
        if(time>0){
            this.videoEle.currentTime=time
        }
        this.bars.time.inputListeners.push(async value=>{
            this.videoEle.currentTime=value
        })
        this.bars.speed.inputListeners.push(async value=>{
            this.videoEle.playbackRate=value
        })
        this.bars.brightness.inputListeners.push(async value=>{
            this.videoEle.style.filter=`brightness(${value})`
        })
        this.checkboxes.play.addEventListener('click',async ()=>{
            if(this.checkboxes.play.classList.contains('checking')){
                return
            }
            this.checkboxes.play.classList.add('checking')
            if(this.checkboxes.play.classList.contains('play')){
                await this.videoEle.play()
            }else{
                this.videoEle.pause()
            }
            this.checkboxes.play.classList.remove('checking')
        })
        this.videoEle.addEventListener('loadedmetadata',()=>{
            this.bars.time.setMax(this.videoEle.duration)
        })
        this.videoEle.addEventListener('play',()=>{
            this.checkboxes.play.classList.remove('play')
            this.checkboxes.play.classList.add('pause')
        })
        this.videoEle.addEventListener('pause',()=>{
            this.checkboxes.play.classList.add('play')
            this.checkboxes.play.classList.remove('pause')
        })
        this.videoEle.addEventListener('ended',()=>{
            this.checkboxes.play.classList.add('play')
            this.checkboxes.play.classList.remove('pause')
        })
        this.videoEle.addEventListener('timeupdate',()=>{
            this.bars.time.setValue(this.videoEle.currentTime)
        })
        this.videoEle.addEventListener('ratechange',()=>{
            this.bars.speed.setValue(this.videoEle.playbackRate)
        })
        this.videoEle.addEventListener('click',()=>{
            this.toolBar.classList.toggle('hide')
        })
        addEventListener('keydown',e=>{
            if(e.key===' '){
                this.checkboxes.play.element.click()
                return
            }
            if(e.key==='ArrowLeft'){
                this.videoEle.currentTime-=10
                return
            }
            if(e.key==='ArrowRight'){
                this.videoEle.currentTime+=10
                return
            }
            if(e.key==='['){
                const val=this.videoEle.playbackRate-0.1
                if(val>=0.2){
                    this.videoEle.playbackRate=val
                }
                return
            }
            if(e.key===']'){
                const val=this.videoEle.playbackRate+0.1
                if(val<=5){
                    this.videoEle.playbackRate=val
                }
                return
            }
        })
    }
}