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
  ngOnInit(): void {
      
  }

  applyFilter(filterText: string) {
    this.filterText = filterText
  }
}
