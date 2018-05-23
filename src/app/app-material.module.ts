import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const materialModules = [MatInputModule, MatFormFieldModule];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class AppMaterialModule {}
