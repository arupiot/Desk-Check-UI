import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSelectPageComponent } from './page-select-page.component';

describe('PageSelectPageComponent', () => {
  let component: PageSelectPageComponent;
  let fixture: ComponentFixture<PageSelectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSelectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
