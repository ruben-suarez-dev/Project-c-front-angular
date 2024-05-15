import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCondominiumComponent } from './list-condominium.component';

describe('ListCondominiumComponent', () => {
  let component: ListCondominiumComponent;
  let fixture: ComponentFixture<ListCondominiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCondominiumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCondominiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
