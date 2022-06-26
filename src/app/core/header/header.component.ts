import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public items!: MenuItem[];

  constructor () { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Categories',
        routerLink: ['/categories'],
        routerLinkActiveOptions: { exact: true },
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/categories', 'new'],
            routerLinkActiveOptions: { exact: true },
          }
        ]
      },
      {
        label: 'Products',
        routerLink: ['/products'],
        routerLinkActiveOptions: { exact: true },
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/products', 'new'],
            routerLinkActiveOptions: { exact: true },
          }
        ]
      }
    ];
  }

}
