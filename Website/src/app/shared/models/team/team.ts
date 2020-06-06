import { NewTeam } from '../newTeam/new-team';

export class Team extends NewTeam {

    public ID: number;
    
    constructor(id: number = undefined, teamName: string = '') {
        super(teamName);
        this.ID = id;
        
    }

}
