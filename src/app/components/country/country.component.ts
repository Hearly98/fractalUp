import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { OffCanvasComponent } from '../off-canvas/off-canvas.component';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { ImagesService } from '../../services/images.service';
import { PaginationComponent } from '../pagination/pagination.component';
@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, OffCanvasComponent, FilterPipe, PaginationComponent],
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit, OnChanges {
  private countryService = inject(CountryService);
  private imageService = inject(ImagesService);
  countries: any[] = [];
  selectedImageCountry: string = ''
  @Input() searchFilter: string = '';
  isCanvasOpen = false;
  code = '';
  data = '';
  countryImages: { [key: string]: string } = {};
  error: any;
  filteredCountries: any[] = []
  displayCountries: any[] = [];
  currentPage: number = 1;
  allPages: number = 0;
  itemsPerPages: number = 9;
  ngOnInit(): void {
    this.fetchCountries();
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes['searchFilter']){
        this.applyFilter();
      }
  }
  fetchCountries(): void {
    this.countryService.getCountries().subscribe(({ data, error }: any) => {
      this.countries = data.countries;
      this.error = error;
      this.applyFilter()
    });
  }

  applyFilter():void{
    if(this.searchFilter.trim()){
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchFilter.toLowerCase())
      )}
    else{
      this.filteredCountries = [...this.countries]
    }
    this.allPages = Math.ceil(this.filteredCountries.length / this.itemsPerPages)
    this.updateDisplayCountries()
  }
  updateDisplayCountries():void {
    const startItem = (this.currentPage - 1) * this.itemsPerPages;
    const endItem = this.currentPage * this.itemsPerPages;
    this.displayCountries = this.filteredCountries.slice(startItem, endItem);
    this.loadImages();
  }
  onChangePages(page: number = 1): void {
    this.currentPage = page
    this.updateDisplayCountries()
  }

  openCanvas() {
    this.isCanvasOpen = true;
  }
  closeCanvas() {
    this.isCanvasOpen = false;
  }
  getCode(code: string) {
    this.code = code;
    this.openCanvas();
    this.selectedImageCountry = this.countryImages[code]
  }
  loadImages(): void {
    this.displayCountries.forEach((country) => {
      if(!this.countryImages[country.code]){
        this.imageService.getImages(country.name, 1, 3).subscribe((response) => {
          if (response.hits.length > 0) {
            this.countryImages[country.code] = response.hits[0].webformatURL;
          } else {
            this.countryImages[country.code] = 'path/to/default-image.jpg';
          }});
      }
    });
  }
}
