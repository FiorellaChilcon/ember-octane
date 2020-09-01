import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class ChatContainerComponent extends Component {
  /**
   * @type {AuthService}
   */
  @service auth;
  @tracked
  messages = [];

  @action
  async loadMessages() {
    const {
      channel: { id, teamId },
    } = this.args;

    const resp = await fetch(`/api/teams/${teamId}/channels/${id}/messages`);
    // to keep track is necesary to replace the existing array DO NOT USE PUSH
    // this.messages = [...this.messages, ...(await resp.json)];
    this.messages = await resp.json();
  }
  @action
  async deleteMessage(messageId) {
    const resp = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const messagesIds = this.messages.map((m) => m.id);
    const idxToDelete = messagesIds.indexOf(messageId);
    this.messages.splice(idxToDelete, 1);
    this.messages = this.messages; //necesary for @tracked
  }
  @action
  async createMessage(body) {
    const {
      channel: { id: channelId, teamId },
    } = this.args;
    const userId = this.auth.currentUserId;
    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        channelId,
        userId,
        body,
      }),
    });
    if (!resp.ok) throw Error('Could not save the chat message');
    const messageData = await resp.json();
    const user = await (await fetch(`/api/users/${userId}`)).json();
    this.messages = [...this.messages, { ...messageData, user }];
  }
}
