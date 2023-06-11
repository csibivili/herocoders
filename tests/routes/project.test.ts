import { describe, test, expect, vi } from 'vitest';
import server from '../../src/server';
import * as jiraApi from 'services/jiraApi';

describe('GET /componentsWithoutLead', () => {
  const getJiraComponentsMock = vi.spyOn(jiraApi, 'getJiraComponents');
  const getJiraIssuesMock = vi.spyOn(jiraApi, 'getJiraIssues');

  test('when there is no component should return empty components array', async () => {
    getJiraComponentsMock.mockResolvedValueOnce([]);
    getJiraIssuesMock.mockResolvedValueOnce([]);

    const response = await server.inject({
      method: 'GET',
      path: '/componentsWithoutLead?project=SP',
    });
    expect(response.statusCode).eq(200);
    expect(response.json()).deep.eq({ data: { components: [] } });
  });

  test('when there are components without leads should return empty components array', async () => {
    getJiraComponentsMock.mockResolvedValueOnce([{ id: '1', name: 'Component 1', project: 'SP' }]);
    getJiraIssuesMock.mockResolvedValueOnce([]);

    const response = await server.inject({
      method: 'GET',
      path: '/componentsWithoutLead?project=SP',
    });
    expect(response.statusCode).eq(200);
    expect(response.json()).deep.eq({ data: { components: [] } });
  });

  test('when there are components with leads should return components array with issuesCount 0', async () => {
    getJiraComponentsMock.mockResolvedValueOnce([
      { id: '1', name: 'Component 1', project: 'SP', lead: { accountId: '1' } },
    ]);
    getJiraIssuesMock.mockResolvedValueOnce([]);

    const response = await server.inject({
      method: 'GET',
      path: '/componentsWithoutLead?project=SP',
    });
    expect(response.statusCode).eq(200);
    expect(response.json()).deep.eq({
      data: { components: [{ name: 'Component 1', issuesCount: 0 }] },
    });
  });

  test('when there are components with leads and connected issue should return components array with issuesCount 1', async () => {
    getJiraComponentsMock.mockResolvedValueOnce([
      { id: '1', name: 'Component 1', project: 'SP', lead: { accountId: '1' } },
    ]);
    getJiraIssuesMock.mockResolvedValueOnce([
      { id: '1', components: [{ id: '1' }] },
    ]);

    const response = await server.inject({
      method: 'GET',
      path: '/componentsWithoutLead?project=SP',
    });
    expect(response.statusCode).eq(200);
    expect(response.json()).deep.eq({
      data: { components: [{ name: 'Component 1', issuesCount: 1 }] },
    });
  });
});
