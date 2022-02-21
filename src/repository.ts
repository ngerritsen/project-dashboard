import {
  GitlabProject,
  GithubProject,
  Project,
  RemoteMirror,
  Pipeline,
} from "./types";
import { GITLAB_API, GITHUB_API } from "./constants";
import config from "../etc/config";
import { get } from "./utils";

export async function getProjects(): Promise<Project[]> {
  const [projects, gitHubProjects] = await Promise.all([
    get<GitlabProject[]>(
      `${GITLAB_API}/users/ngerritsen/projects?private_token=${config.gitlabToken}&per_page=100&order_by=name&sort=asc`
    ),
    get<GithubProject[]>(`${GITHUB_API}/users/ngerritsen/repos`, {
      Authorization: `token ${config.githubToken}`,
    }),
  ]);

  return projects.map((project: GitlabProject) => ({
    ...project,
    github: gitHubProjects.find((p: any) => p.name === project.name),
  }));
}

export async function getMirror(
  projectId: string
): Promise<RemoteMirror | void> {
  return get<RemoteMirror[]>(
    `${GITLAB_API}/projects/${projectId}/remote_mirrors?private_token=${config.gitlabToken}`
  ).then((mirrors) => mirrors[0]);
}

export async function getPipeline(projectId: string): Promise<Pipeline | void> {
  return get<Pipeline[]>(
    `${GITLAB_API}/projects/${projectId}/pipelines?private_token=${config.gitlabToken}`
  ).then((pipelines) => pipelines[0]);
}
