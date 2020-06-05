import { CreateTeamFormValues } from 'src/app/modules/teams/components/create-team-form/create-team-form.component';

export class Team {

    public ID: number;
    public teamName: string;


    constructor(id: number = undefined, teamName: string = '') {
        this.ID = id;
        this.teamName = teamName;
    }

}
