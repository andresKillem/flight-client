import { Component, OnInit } from '@angular/core';

import { routeAnimations } from '@app/core';

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations]
})
export class ExamplesComponent implements OnInit {
  examples = [
    { link: 'stock-market', label: 'New Flight Request' },
    { link: 'todos', label: 'Ready to Reserve' }


  ];

  constructor() {}

  ngOnInit() {}
}
