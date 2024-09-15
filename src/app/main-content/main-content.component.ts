import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CountryComponent } from '../components/country/country.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, CountryComponent, SearchBarComponent],
  templateUrl: './main-content.component.html',
})
export class MainContentComponent implements OnInit{
  @Input() searchFilter = ''
  filterText:string = ''
  @Input() selectedContinents:string[] = []
  ngOnInit(): void {
  }

  applyFilterSearch(filterText: string):void {
    this.filterText = filterText
  }
  applyContinentFilter(selectedContinents:string[]):void {
    this.selectedContinents = selectedContinents
    console.log(' filtrado en el padre continentes', this.selectedContinents)
  }
}
