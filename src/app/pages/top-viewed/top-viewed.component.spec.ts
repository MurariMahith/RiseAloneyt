import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopViewedComponent } from './top-viewed.component';

describe('TopViewedComponent', () => {
  let component: TopViewedComponent;
  let fixture: ComponentFixture<TopViewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopViewedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
