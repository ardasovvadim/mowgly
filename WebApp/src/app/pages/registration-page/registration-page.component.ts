import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LocationApiService} from '../../services/location-api.service';
import {LocationViewModel} from '../../models/locations/location.view.model';
import {UiKit} from '../../utils/ui-kit';
import {Indexer} from '../../utils/utils';
import {fadeInAnimation} from '../../mg-shared/animations/fadeInAnimation';
import {ModalService} from '../../services/modal.service';
import {
  TimetableRecordModalComponent
} from '../../mg-shared/components/timetable-record-modal/timetable-record-modal.component';
import {SectionService} from '../../services/section.service';
import {RegistrationStateService} from '../../services/registration-state.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {RegistrationStateModel} from '../../models/registration/registration.state.model';
import {RegistrationState} from '../../models/registration/registration.state';
import {SectionVm} from '../../models/sections/section.view.model';
import {SectionSettingKeys} from '../../models/sections/section-setting-keys';
import {MasterVm} from '../../models/masterVm';
import {MasterService} from '../../services/master.service';
import {PersonalDataModel} from '../../models/registration/personal-data.model';
import {RegistrationService} from '../../services/registration.service';
import {RegCompletedModalComponent} from './reg-completed-modal/reg-completed-modal.component';
import {MasterSearchCriteria} from '../../models/masters/master-search-criteria.request';
import {TRSearchCriteriaRequest} from '../../models/timetable-records/timetable-record-search-criteria.request';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  animations: [fadeInAnimation],
  providers: [RegistrationStateService, RegistrationService]
})
export class RegistrationPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public locationsCityGroups: Map<string, LocationViewModel[]> = new Map<string, LocationViewModel[]>();
  public sections: SectionVm[] = [];
  public masters: MasterVm[] = [];
  public switcherId: string = `switcher-${Indexer.getId()}`;
  private $currentStep: BehaviorSubject<RegistrationState>;
  public state: RegistrationStateModel;
  public steps: string[] = [
    'Шаг №1 - Выбор филиала',
    'Шаг №2 - Выбор направления',
    'Шаг №3 - Выбор Тренера',
    'Шаг №4 - Региcтрация ученика'
  ];
  public ukSwitcher: any = null;
  public timetableModal: TimetableRecordModalComponent | null = null;
  private subscriptions: Subscription[] = [];
  private regCompletedModal: RegCompletedModalComponent | null = null;
  private switcherRef: HTMLElement | null = null;

  constructor(private locationService: LocationApiService,
              private modalService: ModalService,
              private sectionService: SectionService,
              private registrationStateService: RegistrationStateService,
              private masterService: MasterService,
              private registrationService: RegistrationService) {
    this.state = registrationStateService.getState();
    this.$currentStep = new BehaviorSubject<number>(this.state.currentStep);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    this.switcherRef = document.getElementById(this.switcherId);
    this.ukSwitcher = UiKit.switcher(this.switcherRef);
    this.ukSwitcher.show(this.state.currentStep);

    let sub = this.$currentStep.subscribe(step => {
      switch(step) {
        case RegistrationState.Location:
          this.processLocationStep();
          break;
        case RegistrationState.Section:
          this.processSectionStep();
          break;
        case RegistrationState.Master:
          this.processMasterStep();
          break;
        case RegistrationState.PersonalData:
          this.processPersonalDataStep();
          break;
        default:
          break;
      }

      this.ukSwitcher.show(step);
    });

    this.subscriptions.push(sub);

    sub = this.modalService
      .createModal<TimetableRecordModalComponent>({type: TimetableRecordModalComponent})
      .subscribe(modal => {
        if (modal != null) {
          this.timetableModal = modal;
        }
      });

    this.subscriptions.push(sub)

    sub = this.modalService
      .createModal<RegCompletedModalComponent>({type: RegCompletedModalComponent})
      .subscribe(modal => {
        if (modal != null)
          this.regCompletedModal = modal;
      });

    this.subscriptions.push(sub);
  }

  showSectionTimeTableRecords(section: SectionVm): void {
    if (section != null && this.state.selectedLocation != null) {
      this.timetableModal?.displayTimetableRecords({sectionId: section.id, locationId: this.state.selectedLocation});
    }
  }

  showMasterTimeTableRecords(master: MasterVm): void {
    if (this.state.selectedSection != null
      && this.state.selectedLocation != null
      && master != null) {
      this.timetableModal?.displayTimetableRecords({
        masterId: master.id,
        locationId: this.state.selectedLocation
      } as TRSearchCriteriaRequest);
    }
  }

  ngOnDestroy(): void {
    this.updateState();
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.timetableModal != null)
      this.modalService.deleteModal(this.timetableModal);
  }

  changeCurrentStep(stepNumber: RegistrationState) {
    this.state.currentStep = stepNumber;
    this.updateState();
    this.$currentStep.next(stepNumber);
  }

  private updateState() {
    this.registrationStateService.updateState(this.state);
  }

  chooseLocation(location: LocationViewModel) {
    this.state.selectedLocation = location.id;
    this.changeCurrentStep(RegistrationState.Section);
  }

  private processLocationStep() {
    this.state.selectedSection = null;
    this.state.selectedMaster = null;

    this.locationService.getAll().subscribe(locations => {
      this.locationsCityGroups = new Map<string, LocationViewModel[]>();

      locations.forEach(location => {
        if (!this.locationsCityGroups.has(location.city))
          this.locationsCityGroups.set(location.city, []);

        this.locationsCityGroups.get(location.city)?.push(location);
      });
    });
  }

  private processSectionStep() {
    if (this.state.selectedLocation == null)
      this.resetState();
    else {
      this.state.selectedMaster = null;

      this.sectionService
        .getSectionByLocationId(this.state.selectedLocation)
        .subscribe(sections => this.sections = sections);
    }
  }

  private processMasterStep() {
    if (this.state.selectedLocation == null || this.state.selectedSection == null) {
      this.resetState();
    }
    else {
      this.masterService
        .getCardMasters({
          pageSize: 10,
          locationIds: [this.state.selectedLocation],
          sectionIds: [this.state.selectedSection]
        } as MasterSearchCriteria)
          .subscribe(masters => {
            this.masters = masters;
          });
    }
  }

  private processPersonalDataStep() {
    if (this.state.selectedMaster == null
      || this.state.selectedLocation == null
      || this.state.selectedSection == null) {
      this.resetState();
    }
  }

  private resetState() {
    this.state = new RegistrationStateModel();
    this.changeCurrentStep(this.state.currentStep);
  }

  sectionSelected(section: SectionVm) {
    this.state.selectedSection = section.id;
    this.changeCurrentStep(RegistrationState.Master);
  }

  masterSelected(master: MasterVm) {
    this.state.selectedMaster = master.id;
    this.changeCurrentStep(RegistrationState.PersonalData)
  }

  sendRegistrationData(personalData: PersonalDataModel) {
    if (this.state.selectedSection != null
      && this.state.selectedLocation != null
      && this.state.selectedMaster != null) {

      personalData.locationId = this.state.selectedLocation;
      personalData.sectionId = this.state.selectedSection;
      personalData.masterId = this.state.selectedMaster;
      personalData.birthday = null;

      this.registrationService
        .register(personalData)
        .subscribe(_ => {
          this.regCompletedModal?.open();
          this.regCompletedModal?.onClose.subscribe(_ => this.resetState());
        });
    }
  }

  prevStep() {
    const currentStep = this.state.currentStep;
    if (currentStep-1 >= 0)
      this.changeCurrentStep(currentStep - 1);
  }
}
