import { Checkbox, Div, NumberBar, TimeBar } from './common'
import * as css from '../../lib/css'
import * as fonts from '../../lib/fonts'
export class Player{
    readonly element=new Div(['player'])
    readonly videoEle=document.createElement('video')
    readonly styleEle=document.createElement('style')
    readonly toolBar=new Div(['tool bar'])
    readonly bars={
        time:new TimeBar('time',0),
        speed:new NumberBar('speed',0.2,1,5,true),
        brightness:new NumberBar('brightness',0.1,1,10,true)
    }
    readonly checkboxes={
        play:new Checkbox('play')
    }
    constructor(public parent:HTMLElement){
        parent.classList.add('root')
        this.styleEle.textContent=fonts.fonts+css.common+css.dark+css.player
        parent.append(this.styleEle)
        parent.append(this.element.element)
        this.element
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
        const params = new URLSearchParams(document.location.search)
        const src=params.get('src')??document.body.dataset.src??''
        if(src===''){
            return
        }
        const time=Number(params.get('t')??document.body.dataset.t??'')
        this.videoEle.src=src
        if(time>0){
            this.videoEle.currentTime=time
        }
        this.bars.time.handleInput=async value=>{
            this.videoEle.currentTime=value
        }
        this.bars.speed.handleInput=async value=>{
            this.videoEle.playbackRate=value
        }
        this.bars.brightness.handleInput=async value=>{
            this.videoEle.style.filter=`brightness(${value})`
        }
        this.checkboxes.play.addEventListener('click',()=>{
            if(this.checkboxes.play.classList.contains('play')){
                this.videoEle.play()
            }else{
                this.videoEle.pause()
            }
        })
        this.videoEle.addEventListener('loadedmetadata',()=>{
            this.bars.time.setDuration(this.videoEle.duration)
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
        this.videoEle.addEventListener('click',()=>{
            this.toolBar.classList.toggle('hide')
        })
    }
}