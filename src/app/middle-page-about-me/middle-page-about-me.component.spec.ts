import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlePageAboutMeComponent } from './middle-page-about-me.component';

describe('MiddlePageAboutMeComponent', () => {
  let component: MiddlePageAboutMeComponent;
  let fixture: ComponentFixture<MiddlePageAboutMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddlePageAboutMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddlePageAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
