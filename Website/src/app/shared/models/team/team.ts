export class Team {

    public ID: number;
    public teamName: string;


    constructor(id: number = undefined, teamName: string = '') {
        this.ID = id;
        this.teamName = teamName;
    }

}
