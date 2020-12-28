import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingContentComponent } from './scrolling-content.component';

describe('ScrollingContentComponent', () => {
  let component: ScrollingContentComponent;
  let fixture: ComponentFixture<ScrollingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollingContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
