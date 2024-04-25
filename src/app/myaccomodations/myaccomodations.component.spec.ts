import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccomodationsComponent } from './myaccomodations.component';

describe('MyaccomodationsComponent', () => {
  let component: MyaccomodationsComponent;
  let fixture: ComponentFixture<MyaccomodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyaccomodationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyaccomodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
