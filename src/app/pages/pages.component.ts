import { Component, OnDestroy, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PageMenu } from './pages.menu';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">
      <div class="al-copy">Created with <i class="ion-heart"></i> by &copy; Emanuel Mahalean 2017</div>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages implements OnInit,OnDestroy {
  
  constructor(private _menuService: BaMenuService,) {
  }
  
  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PageMenu.getPageMenu());
  }

  ngOnDestroy(): void {
    this._menuService.menuItems = new BehaviorSubject<any[]>([]);;
  }
}
