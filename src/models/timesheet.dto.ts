export interface TimesheetDto {
    id : number,
    startDateTime : string;
    endDateTime: string;
	isHoliday: boolean;
	isInTravel : boolean;
	periodDescription : string;
	collaboratorId : number;
}