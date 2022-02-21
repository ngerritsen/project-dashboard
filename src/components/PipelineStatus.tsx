import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  MinusIcon,
  QuestionIcon,
  TimeIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Pipeline } from "../types";
import { getPipeline } from "../repository";

type PipelineStatusProps = {
  projectId: string;
};

const PipelineStatus: React.FC<PipelineStatusProps> = ({ projectId }) => {
  const [pipeline, setPipeline] = useState<Pipeline | void>();
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setFetching(true);

    getPipeline(projectId).then((pipeline) => {
      setPipeline(pipeline);
      setFetching(false);
    });
  }, [projectId]);

  if (fetching) {
    return null;
  }

  if (!pipeline) {
    return <MinusIcon color="gray" />;
  }

  if (pipeline.status === "success") {
    return <CheckCircleIcon color="green" />;
  }

  if (pipeline.status === "failed") {
    return <WarningIcon color="red" />;
  }

  if (pipeline.status === "running") {
    return <TimeIcon color="yellow" />;
  }

  return <QuestionIcon color="gray" />;
};

export default PipelineStatus;
