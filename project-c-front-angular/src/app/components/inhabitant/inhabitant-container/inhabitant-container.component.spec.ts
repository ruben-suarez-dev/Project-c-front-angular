import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantContainerComponent } from './inhabitant-container.component';

describe('InhabitantContainerComponent', () => {
  let component: InhabitantContainerComponent;
  let fixture: ComponentFixture<InhabitantContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InhabitantContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InhabitantContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
