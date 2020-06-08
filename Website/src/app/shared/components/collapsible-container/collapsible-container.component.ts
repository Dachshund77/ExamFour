import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible-container',
  templateUrl: './collapsible-container.component.html',
  styleUrls: ['./collapsible-container.component.css']
})
export class CollapsibleContainerComponent implements OnInit {

  collapsed : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.collapsed = !this.collapsed
  }

}
