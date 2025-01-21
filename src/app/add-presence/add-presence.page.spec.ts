import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPresencePage } from './add-presence.page';

describe('AddPresencePage', () => {
  let component: AddPresencePage;
  let fixture: ComponentFixture<AddPresencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPresencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
