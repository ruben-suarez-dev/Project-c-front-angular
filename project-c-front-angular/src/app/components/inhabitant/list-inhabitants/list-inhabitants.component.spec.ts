import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInhabitantsComponent } from './list-inhabitants.component';

describe('ListInhabitantsComponent', () => {
  let component: ListInhabitantsComponent;
  let fixture: ComponentFixture<ListInhabitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInhabitantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInhabitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
