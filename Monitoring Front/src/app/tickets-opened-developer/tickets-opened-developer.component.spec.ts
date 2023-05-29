import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsOpenedDeveloperComponent } from './tickets-opened-developer.component';

describe('TicketsOpenedDeveloperComponent', () => {
  let component: TicketsOpenedDeveloperComponent;
  let fixture: ComponentFixture<TicketsOpenedDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsOpenedDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsOpenedDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
