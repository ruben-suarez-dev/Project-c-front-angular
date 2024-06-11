import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseContainerComponent } from './house-container.component';

describe('HouseContainerComponent', () => {
  let component: HouseContainerComponent;
  let fixture: ComponentFixture<HouseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HouseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
