import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddTodoPageRoutingModule } from './modal-add-todo-routing.module';

import { ModalAddTodoPage } from './modal-add-todo.page';
import { HeaderAddModule } from '../@app-core/@modular/header-add/header-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddTodoPageRoutingModule,
    HeaderAddModule
  ],
  declarations: [ModalAddTodoPage]
})
export class ModalAddTodoPageModule {}
