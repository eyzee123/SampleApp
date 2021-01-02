import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashoutPage } from './cashout.page';

describe('CashoutPage', () => {
  let component: CashoutPage;
  let fixture: ComponentFixture<CashoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
