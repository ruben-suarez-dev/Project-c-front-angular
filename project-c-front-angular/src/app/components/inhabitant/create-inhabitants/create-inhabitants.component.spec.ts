import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInhabitantsComponent } from './create-inhabitants.component';

describe('CreateInhabitantsComponent', () => {
  let component: CreateInhabitantsComponent;
  let fixture: ComponentFixture<CreateInhabitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInhabitantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInhabitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
