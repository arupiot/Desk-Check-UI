import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArupLogoComponent } from './arup-logo.component';

describe('ArupLogoComponent', () => {
  let component: ArupLogoComponent;
  let fixture: ComponentFixture<ArupLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArupLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArupLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
