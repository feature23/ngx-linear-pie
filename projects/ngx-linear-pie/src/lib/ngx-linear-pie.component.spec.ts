import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLinearPieComponent } from './ngx-linear-pie.component';

describe('NgxLinearPieComponent', () => {
    let component: NgxLinearPieComponent;
    let fixture: ComponentFixture<NgxLinearPieComponent>;

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports: [NgxLinearPieComponent]
            })
            .compileComponents();

        fixture = TestBed.createComponent(NgxLinearPieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
