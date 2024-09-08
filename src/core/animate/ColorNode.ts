import { ElementRef } from "@angular/core";
import { GraphNode } from "../graphlib/datastructures/GraphNode";
import { SPLCOLOR_PATH } from "../common/Constants";

export class ColorNode {

    // #6b44bc
    speed: number = 24;
    defaultColor: string = ``;
    defaultBorderColor: string = `#c5e2db`;
    wallColor: string = "#4a5e58";
    wallBorderColor: string = `#4a5e58`;
    visitedColor: string = "#96daeb";
    pathColor: string = "#f5da7a";

    setSpeed(value:number){
        this.speed=value
    }

    sleep(){
        return new Promise(resolve => setTimeout(resolve,500/this.speed));
    }

    async setColor(node: GraphNode|undefined, delay:boolean, specificColor:string = ``) {
        //console.log(specificColor)
        if(node) {
            if(node.isWall) {
                node.el.nativeElement.style.backgroundColor = this.wallColor;
                node.el.nativeElement.style.borderColor = this.wallBorderColor
                if(delay) await this.sleep()
            } else if(node.path) {
                node.el.nativeElement.style.backgroundColor = this.pathColor;
                node.el.nativeElement.style.borderColor = this.defaultColor;
                if(delay) await this.sleep()
            } else if(node.visited) {
                node.el.nativeElement.style.backgroundColor = this.visitedColor;
                node.el.nativeElement.style.borderColor = this.defaultColor;
                if(delay) await this.sleep()
            } else {
                this.reset(node)
            }
        }


    }

    static startIcon() {
        return `<i class="fa fa-solid fa-chevron-right" style="font-size: 10px;"></i>`
    }
    
    static endIcon() {
        return `<i class="fa fa-solid fa-bullseye" style="font-size: 10px;"></i>`
    }

    reset(node: GraphNode) {
        if(node) {
            node.el.nativeElement.style.backgroundColor = this.defaultColor
            node.el.nativeElement.style.borderColor = this.defaultBorderColor
        }
    }
}