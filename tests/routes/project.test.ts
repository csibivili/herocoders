import { describe, test, expect, vi } from 'vitest';
import server from '../../src/server';
import * as jiraApi from 'services/jiraApi';

describe('GET /componentsWithoutLead', () => {
  test('when there is no component should return empty components array', async () => {
    vi.spyOn(jiraApi, 'getJiraComponents').mockResolvedValueOnce([]);
    vi.spyOn(jiraApi, 'getJiraIssues').mockResolvedValueOnce([]);

    const response = await server.inject({
      method: 'GET',
      path: '/componentsWithoutLead?project=SP',
    });
    expect(response.statusCode).eq(200);
    expect(response.json()).deep.eq({ data: { components: [] } });
  });
});
