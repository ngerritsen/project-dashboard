export interface GitlabProject {
  id: string;
  name: string;
  visibility: string;
  archived: boolean;
  web_url: string;
}

export interface GithubProject {
  id: string;
  name: string;
  fork: boolean;
  visibility: string;
  archived: boolean;
  html_url: string;
}

export interface Pipeline {
  web_url: string;
  status: string;
}

export interface RemoteMirror {
  update_status: string;
}

export interface Project {
  name: string;
  github?: GithubProject;
  gitlab?: GitlabProject;
}
