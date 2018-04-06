import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLeftSideComponent } from './article-left-side.component';

describe('ArticleLeftSideComponent', () => {
  let component: ArticleLeftSideComponent;
  let fixture: ComponentFixture<ArticleLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
