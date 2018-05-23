import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [DropdownDirective],
  imports: [AppMaterialModule],
  exports: [CommonModule, DropdownDirective, AppMaterialModule]
})
export class SharedModule {}
