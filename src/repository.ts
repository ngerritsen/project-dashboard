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
  const [gitLabProjects, githubProjects] = await Promise.all([
    get<GitlabProject[]>(
      `${GITLAB_API}/users/ngerritsen/projects?private_token=${config.gitlabToken}&per_page=100&order_by=name&sort=asc`
    ),
    get<GithubProject[]>(
      `${GITHUB_API}/user/repos?per_page=100&affiliation=owner`,
      {
        headers: {
          Authorization: `token ${config.githubToken}`,
        },
      }
    ).then((projects) => projects.filter((project) => !project.fork)),
  ]);

  const projectsFromGitlab = gitLabProjects.map((project: GitlabProject) => ({
    name: project.name,
    gitlab: project,
    github: githubProjects.find((p: any) => p.name === project.name),
  }));

  const orphanGithubProjects = githubProjects
    .filter(
      (project) => !projectsFromGitlab.some((p) => p.name === project.name)
    )
    .map((project) => ({ github: project, name: project.name }));

  return [...projectsFromGitlab, ...orphanGithubProjects];
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
