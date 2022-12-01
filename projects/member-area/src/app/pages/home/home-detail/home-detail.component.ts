import { Component, OnDestroy, OnInit } from "@angular/core"

@Component({
  selector: 'home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['../../../../styles.css']
})
export class HomeDetailComponent implements OnInit, OnDestroy {

  carousel!: any[]


  ngOnInit(): void {
    this.carousel = [
      {
        image:
          '../../../../assets/images/article.png',
      },
      {
        image:
          '../../../../assets/images/course.jpg',
      },
      {
        image:
          '../../../../assets/images/event.jpg',
      }
    ]
  }



  ngOnDestroy(): void {
  }

}
