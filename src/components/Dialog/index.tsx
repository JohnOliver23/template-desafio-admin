import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface IDialog {
  isOpen: boolean;
  titleDialog: string;
  description: string;
  textPrimaryAction: string;
  textSecondaryAction: string;
  colorPrimaryScheme?: string;
  colorSecondarySecheme?: string;
  onPrimaryAction(): void;
  onSecondaryAction: Function;
  isLoading: boolean;
}

function Dialog({
  isOpen,
  titleDialog,
  description,
  textPrimaryAction,
  textSecondaryAction,
  colorPrimaryScheme,
  colorSecondarySecheme,
  onPrimaryAction,
  onSecondaryAction,
  isLoading,
}: IDialog) {
  const cancelRef = useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef.current}
      onClose={onPrimaryAction}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {titleDialog}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme={colorPrimaryScheme}
              ref={cancelRef.current}
              onClick={onPrimaryAction}
            >
              {textPrimaryAction}
            </Button>
            <Button
              colorScheme={colorSecondarySecheme}
              onClick={() => onSecondaryAction()}
              ml={3}
              isLoading={isLoading}
              loadingText="Carregando..."
            >
              {textSecondaryAction}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Dialog;
