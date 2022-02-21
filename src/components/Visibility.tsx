import React from "react";
import { MinusIcon } from "@chakra-ui/icons";
import { Tag } from "@chakra-ui/react";
import type { GithubProject, GitlabProject } from "../types";

type VisibilityProps = {
  project: GithubProject | GitlabProject | undefined;
};

const Visibility: React.FC<VisibilityProps> = ({ project }) => {
  if (!project) {
    return <MinusIcon color="grey" />;
  }

  return (
    <>
      {project.visibility}{" "}
      {project.archived && (
        <Tag colorScheme="yellow" size="sm">
          archived
        </Tag>
      )}
    </>
  );
};

export default Visibility;
