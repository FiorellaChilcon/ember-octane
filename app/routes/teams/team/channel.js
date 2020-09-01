import Route from '@ember/routing/route';

export default class TeamsTeamChannelRoute extends Route {
  async model({ channelId }) {
    // this woul get us the object of the parent model
    // const g = this.modelFor('teams');
    // const f = this.paramsFor('teams.team');
    // console.log(g, f);
    const { teamId } = this.paramsFor('teams.team');
    const response = await fetch(`/api/teams/${teamId}/channels/${channelId}`);
    return response.json();
  }
}
