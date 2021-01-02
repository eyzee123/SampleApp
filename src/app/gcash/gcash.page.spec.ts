import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GcashPage } from './gcash.page';

describe('GcashPage', () => {
  let component: GcashPage;
  let fixture: ComponentFixture<GcashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GcashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
