import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunningClassListPage } from './running-class-list.page';

describe('RunningClassListPage', () => {
  let component: RunningClassListPage;
  let fixture: ComponentFixture<RunningClassListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningClassListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
