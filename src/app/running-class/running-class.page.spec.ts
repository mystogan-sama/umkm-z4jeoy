import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RunningClassPage } from './running-class.page';

describe('RunningClassPage', () => {
  let component: RunningClassPage;
  let fixture: ComponentFixture<RunningClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
