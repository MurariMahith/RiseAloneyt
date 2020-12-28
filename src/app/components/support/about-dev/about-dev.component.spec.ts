import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDEVComponent } from './about-dev.component';

describe('AboutDEVComponent', () => {
  let component: AboutDEVComponent;
  let fixture: ComponentFixture<AboutDEVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDEVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDEVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
