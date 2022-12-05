import { NgModule } from "@angular/core"
import { TimeAgoPipe } from "../pipe/time-ago.pipe"

@NgModule({
    declarations: [
        TimeAgoPipe
    ],
    exports: [
        TimeAgoPipe
    ]
})
export class TimeAgoModule { }