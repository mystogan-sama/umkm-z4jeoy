import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailRunningClassPage } from './detail-running-class.page';

describe('DetailRunningClassPage', () => {
  let component: DetailRunningClassPage;
  let fixture: ComponentFixture<DetailRunningClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRunningClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
