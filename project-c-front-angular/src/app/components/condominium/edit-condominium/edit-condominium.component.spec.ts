import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCondominiumComponent } from './edit-condominium.component';

describe('EditCondominiumComponent', () => {
  let component: EditCondominiumComponent;
  let fixture: ComponentFixture<EditCondominiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCondominiumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCondominiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
