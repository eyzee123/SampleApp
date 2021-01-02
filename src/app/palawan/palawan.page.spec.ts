import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalawanPage } from './palawan.page';

describe('PalawanPage', () => {
  let component: PalawanPage;
  let fixture: ComponentFixture<PalawanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalawanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalawanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
