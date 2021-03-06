import { ParamMap } from '@angular/router';

export class StatParameters {
    team: number;
    era: number;
    season: number;
    league: number;
    seasonType: number;
    col: number;
    page: number;

    setParams(params: ParamMap, isSkater: boolean) {
        this.team = +params.get('team');
        this.era = +params.get('era');
        this.season = +params.get('season');
        this.league = +params.get('league');
        this.seasonType = +params.get('seasonType');
        this.page = +params.get('page');
        var col = params.get('col');
        if (col)
            this.col = +col;
    }

    getQuery(): string {
        var queryList: string[] = [];

        this.pushArgument(queryList, "team", this.team);
        this.pushArgument(queryList, "era", this.era);
        this.pushArgument(queryList, "season", this.season);
        this.pushArgument(queryList, "league", this.league, 1);
        this.pushArgument(queryList, "seasonType", this.seasonType, 1);
        this.pushArgument(queryList, "page", this.page);

        if (this.col || this.col == 0) {
            this.pushArgument(queryList, "col", this.col, -1);
        }

        return (queryList.length > 0) ?
            "?" + queryList.join("&") : "";
    }

    pushArgument(queryList: string[], name: string, arg: number, min: number = 0) {
        if (arg > min)
            queryList.push(name + "=" + arg);
    }
}
