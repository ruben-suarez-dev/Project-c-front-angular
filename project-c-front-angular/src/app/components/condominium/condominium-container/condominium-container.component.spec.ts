import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominiumContainerComponent } from './condominium-container.component';

describe('CondominiumContainerComponent', () => {
  let component: CondominiumContainerComponent;
  let fixture: ComponentFixture<CondominiumContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondominiumContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondominiumContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
