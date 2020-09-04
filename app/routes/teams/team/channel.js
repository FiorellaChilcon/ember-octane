import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamsTeamChannelRoute extends Route {
  async model({ channelId }) {
    // this woul get us the object of the parent model hook (data)
    // const g = this.modelFor('teams'); whatever the model parent hook of data retrieves
    // const f = this.paramsFor('teams.team'); whatever the route parent was passed
    // console.log(g, f);
    const { teamId } = this.paramsFor('teams.team');
    const response = await fetch(`/api/teams/${teamId}/channels/${channelId}`);
    return response.json();
  }
}
