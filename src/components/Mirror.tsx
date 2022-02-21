import React, { useEffect, useState } from "react";
import { CheckIcon, MinusIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { RemoteMirror } from "../types";
import { getMirror } from "../repository";

type MirrorProps = {
  projectId: string;
};

const Mirror: React.FC<MirrorProps> = ({ projectId }) => {
  const [mirror, setMirror] = useState<RemoteMirror | void>();
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setFetching(true);

    getMirror(projectId).then((mirror) => {
      setMirror(mirror);
      setFetching(false);
    });
  }, [projectId]);

  if (fetching) {
    return null;
  }

  if (!mirror) {
    return <MinusIcon color="gray" />;
  }

  if (mirror.update_status === "finished") {
    return <CheckIcon color="green" />;
  }

  return <WarningTwoIcon color="yellow" />;
};

export default Mirror;
