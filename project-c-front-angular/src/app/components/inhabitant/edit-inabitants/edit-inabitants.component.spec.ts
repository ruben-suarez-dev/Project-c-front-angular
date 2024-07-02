import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInabitantsComponent } from './edit-inabitants.component';

describe('EditInabitantsComponent', () => {
  let component: EditInabitantsComponent;
  let fixture: ComponentFixture<EditInabitantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditInabitantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditInabitantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
