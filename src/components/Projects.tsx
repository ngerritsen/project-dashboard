import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  Link,
  Alert,
} from "@chakra-ui/react";
import Visibility from "./Visibility";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { getProjects } from "../repository";
import { Project } from "../types";
import Mirror from "./Mirror";
import PipelineStatus from "./PipelineStatus";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((error) => {
        setError("Failed to fetch projects: " + error.message);
      });
  }, []);

  if (error) {
    return <Alert colorScheme="red">{error}</Alert>;
  }

  if (projects.length === 0) {
    return (
      <Center h="200px">
        <Spinner />
      </Center>
    );
  }

  return (
    <Table variant="striped" mt={3}>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>GitLab</Th>
          <Th>GitHub</Th>
          <Th>Mirrored</Th>
          <Th>Pipeline</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project) => (
          <Tr key={project.name}>
            <Td>{project.name}</Td>
            <Td>
              <Visibility project={project.gitlab} />
              {project.gitlab && (
                <Link ml={2} isExternal href={project.gitlab.web_url}>
                  <ExternalLinkIcon />
                </Link>
              )}
            </Td>
            <Td>
              <Visibility project={project.github} />
              {project.github && (
                <Link ml={2} isExternal href={project.github.html_url}>
                  <ExternalLinkIcon />
                </Link>
              )}
            </Td>
            <Td>
              <Mirror projectId={project.gitlab?.id} />
            </Td>
            <Td>
              <PipelineStatus projectId={project.gitlab?.id} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Projects;
