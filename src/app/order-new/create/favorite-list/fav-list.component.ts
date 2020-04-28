import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DrinkFavoriteItem } from 'src/app/shared/models/tea.models';

@Component({
  selector: 'app-order-new-create-fav-list',
  templateUrl: 'fav-list.component.html',
  styleUrls: ['./fav-list.component.css']
})
export class OrderNewFavListComponent implements OnInit {

  @Input()
  favItems: DrinkFavoriteItem[] = [];

  @Output()
  onFavSelect: EventEmitter<DrinkFavoriteItem> =
    new EventEmitter<DrinkFavoriteItem>();

  isShown: boolean

  constructor() {
  }

  ngOnInit() {
  }

  onIsShowChange(show: boolean) {
    this.isShown = show;
  }

  onFavClick(fd: DrinkFavoriteItem) {
    if (fd) {
      this.onFavSelect.emit(fd);
    }
  }
}
