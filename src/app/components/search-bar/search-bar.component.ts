import { Component, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CONTINENTS } from '../../graphql.operations';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Output() filterText = new EventEmitter<string>();
  @Output() filterContinent = new EventEmitter<string[]>()
  continentImages: { [key: string]: string } = {};
  private cdr = inject(ChangeDetectorRef)
  continents: any[] = [];
  searchText: string = ''
  selectedContinents:string[] = []
  error: any;
  private imageService = inject(ImagesService)
  constructor(private apollo: Apollo){}
  open = false
  openModal(){
    this.open = true;
    this.getContinent();
  }
  closeModal(){
    this.open = false;
  }
  sendSearch(event:any){
    this.searchText = event.target.value;
    this.applyFilters()
  }
  getContinent():void{
    this.apollo.watchQuery({
      query: GET_CONTINENTS
    }).valueChanges.subscribe(({data, error}: any) => {
      this.continents = data.continents;
      this.loadImages()
      this.error = error
    })
   
  }
  loadImages(): void {
    this.continents.forEach((continent) => {
      if(!this.continentImages[continent.name]){
        this.imageService.getContinentImages(continent.name).subscribe((response) => {
          if (response.hits.length > 0) {
            this.continentImages[continent.name] = response.hits[0].webformatURL;
          } else {
            this.continentImages[continent.name] = 'path/to/default-image.jpg';
          }});
      }
    });
  }
  toggleContinent(continentName: string): void{
    const i = this.selectedContinents.indexOf(continentName);
    if(i === -1){
      this.selectedContinents.push(continentName)
    }else{
      this.selectedContinents.splice(i, 1)
    }
    this.applyFilters()
    this.cdr.detectChanges()
  }

  applyFilters():void{
    this.filterText.emit(this.searchText)
    this.filterContinent.emit(this.selectedContinents)
    this.cdr.detectChanges()
  }
  clearFilter():void{
    this.searchText = ''
    this.selectedContinents = []
    this.applyFilters()
  }
}
