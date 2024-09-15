import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
@Input() currentPage: number = 1;
@Input() allPages: number = 1;
@Output() pageChance: EventEmitter<number> = new EventEmitter<number>();
error:string = ''
previousPage():void {
  if(this.currentPage>1){
    try{
      this.currentPage--;
      this.pageChance.emit(this.currentPage);
    }
    catch (e) {
      this.error = 'No se ha podido cambiar a la pagina anterior' + e
    }
  }
}

nextPage():void {
  if(this.currentPage < this.allPages){
    try{
      this.currentPage++;
      this.pageChance.emit(this.currentPage)
    }
    catch(e){
       this.error = 'No se ha podido cambiar a la pagina siguiente' + e
    }
  }
}

goToPage(page: number): void {
  this.currentPage = page;
  this.pageChance.emit(this.currentPage);
}
}
