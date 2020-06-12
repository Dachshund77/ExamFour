import { NewTeam } from '../newTeam/new-team';

export class Team extends NewTeam {

    public ID: string;
   
    constructor(id: string = undefined, teamName: string = '') {
        super(teamName);
        this.ID = id;
        
    }

}
