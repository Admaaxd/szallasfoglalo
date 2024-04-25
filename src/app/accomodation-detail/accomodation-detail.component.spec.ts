import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationDetailComponent } from './accomodation-detail.component';

describe('AccomodationDetailComponent', () => {
  let component: AccomodationDetailComponent;
  let fixture: ComponentFixture<AccomodationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomodationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
