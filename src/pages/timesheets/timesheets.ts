import { Component, Input, ViewChild, ElementRef, Renderer} from '@angular/core';

import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { TimesheetDto } from '../../models/timesheet.dto';
import * as moment from 'moment';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';

@IonicPage()
@Component({
  selector: 'page-timesheets',
  templateUrl: 'timesheets.html',
  providers: [TimesheetProvider],
})
export class TimesheetsPage {

  collaborator: CollaboratorDto;
  id: string;
  categ :any = [];
  mensal: any = [];
  public lancamentos : TimesheetDto[];
  public lancamentosConts : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetProvider: TimesheetProvider,
    private storageProvider: StorageProvider,
    private collaboratorProvider: CollaboratorProvider,
    public renderer: Renderer
    ) {


  }

  ionViewDidLoad() {

    }

  ionViewDidEnter(){
    let localUser = this.storageProvider.getLocalUser();
    if (localUser && localUser.email) {
      this.collaboratorProvider.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response as CollaboratorDto;
          this.loadData();
        }, error => {
          if (error.status === 403) {
            this.navCtrl.setRoot('SigninPage');
          }
        })
      } else {
        this.navCtrl.setRoot('SigninPage');
      } 
  }

  private loadData() {
    this.timesheetProvider.findByCollaborator(this.collaborator.id)
      .subscribe(response => {
        let data = (response as any);
        this.lancamentos = data.data.content;

        let mes = ''; 
        this.lancamentos.map(lancamento => {
          let mesdoLancamento = moment(lancamento.startDateTime).format('MM');
          mesdoLancamento = this.dePara(mesdoLancamento) 
          if (mes !== mesdoLancamento) { 
            mes = mesdoLancamento;                
            this.categ[mes] = [lancamento];
          } else {
            this.categ[mes].push(lancamento)
          }                            
        })
        this.mensal = this.categ.Agosto;

        console.log(this.mensal);
    
        console.log(this.categ);
    



      },
        error => {
          console.log(error);
        });
  }
 
  showDetail(timesheet_id: string){
    this.navCtrl.push('TimesheetDetailPage',{
      timesheet_id: timesheet_id
    })
  }


  dePara(mes){
    switch(mes){
      case '01':{return 'Janeiro'}
      case '02':{return 'Fevereiro'}
      case '03':{return 'Março'}
      case '04':{return 'Abril'}
      case '05':{return 'Maio'}
      case '06':{return 'Junho'}
      case '07':{return 'Julho'}
      case '08':{return 'Agosto'}
      case '09':{return 'Setembro'}
      case '10':{return 'Outubro'}
      case '11':{return 'Novembro'}
      case '12':{return 'Dezembro'}
    }
   }



   @Input() headerColor: string = '#F53D3D';
   @Input() textColor: string = '#FFF';
   @Input() contentColor: string = '#F9F9F9';
   @Input() title: string;
   @Input() hasMargin: boolean = true;
   @Input() expanded: boolean;
 
   @ViewChild('accordionContent') elementView: ElementRef;
 
   viewHeight: number;
 
 
   ngAfterViewInit() {
     this.viewHeight = this.elementView.nativeElement.offsetHeight;
 
     if (!this.expanded) {
       this.renderer.setElementStyle(this.elementView.nativeElement, 'height', 0 + 'px');
     }
   }
 
   toggleAccordion() {
     this.expanded = !this.expanded;
     const newHeight = this.expanded ? '100%' : '0px';
     this.renderer.setElementStyle(this.elementView.nativeElement, 'height', newHeight);
   }
 



}
