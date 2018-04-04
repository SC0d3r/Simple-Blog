import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBoardComponent } from './fixed-board.component';

describe('FixedBoardComponent', () => {
  let component: FixedBoardComponent;
  let fixture: ComponentFixture<FixedBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
