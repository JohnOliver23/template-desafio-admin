import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Status } from "../../util/types";

interface IStatusCard {
  status: Status;
}

function StatusCard({ status }: IStatusCard) {
  return (
    <Alert
      width="150px"
      height="40px"
      borderRadius="4px"
      fontFamily="Nunito"
      status={
        status === Status.APPROVED
          ? "success"
          : status === Status.REJECTED
          ? "error"
          : "info"
      }
    >
      <AlertIcon />
      {status === Status.APPROVED
        ? "Aprovado"
        : status === Status.REJECTED
        ? "Recusado"
        : "Solicitado"}
    </Alert>
  );
}

export default StatusCard;
