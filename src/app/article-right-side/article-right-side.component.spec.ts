import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRightSideComponent } from './article-right-side.component';

describe('ArticleRightSideComponent', () => {
  let component: ArticleRightSideComponent;
  let fixture: ComponentFixture<ArticleRightSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleRightSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleRightSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
