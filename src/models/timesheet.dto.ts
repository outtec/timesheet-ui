export interface TimesheetDto {
    id : string;
    startDateTime : string;
    endDateTime: string;
	isHoliday: boolean;
	isInTravel : boolean;
	periodDescription : string;
	collaboratorId : string;
}