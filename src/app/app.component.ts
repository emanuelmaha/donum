import { Component, ViewContainerRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})

export class AppComponent implements AfterViewInit {

    isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState,
        private _spinner: BaThemeSpinner,
        private viewContainerRef: ViewContainerRef,
        private themeConfig: BaThemeConfig) {

        themeConfig.config();

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = false;
        });
    }

    ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        BaThemePreloader.load().then((values) => {
            this._spinner.hide();
        });
    }
}