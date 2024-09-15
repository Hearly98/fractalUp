import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CountryService } from '../../services/country.service';
@Component({
  selector: 'app-off-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './off-canvas.component.html',
})
export class OffCanvasComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() code: string = '';
  @Input() selectedImage: string = ''

  private countryService = inject(CountryService);
  data: any[] = [];
  country: any = null;
  error: string = '';
  id = 'off-canvas' + Math.random().toString(36).substring(2, 9);
  handleClick(event: any): void {
    if (this.isOpen && event.target.id == this.id) {
      this.onClose.emit();
    }
  }
  close(): void {
    this.onClose.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] && this.code) {
      this.fetchCountryByCode(this.code);
      console.log('selected image', this.selectedImage)
    }
  }

  fetchCountryByCode(code: string) {
    this.countryService
      .getCountryById(code)
      .subscribe(({ data, error }: any) => {
        this.country = data.country;
        this.error = error;
      });
  }
}
