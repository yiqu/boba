import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';

@Component({
  selector: 'app-main-open',
  templateUrl: 'open.component.html',
  styleUrls: ['./open.component.css']
})
export class MainOpenComponent implements OnInit, OnDestroy {

  constructor(public fds: RestDataFireService) {

  }

  ngOnInit() {

  }

  onSearch(searchVal: string) {
    console.log(searchVal)
  }


  ngOnDestroy() {
  }
}
