import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "./ng-zorro-antd.module";
import {IconsProviderModule} from "./icons-provider.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    IconsProviderModule
  ],
  exports: [
    NgZorroAntdModule,
    IconsProviderModule
  ]
})
export class SharedModule { }
