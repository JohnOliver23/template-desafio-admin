import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  Box,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, useReducer } from "react";
import { toast } from "react-toastify";
import Dialog from "../../components/Dialog";
import StatusCard from "../../components/StatusCard";
import {
  createAudit,
  deleteCard,
  getCards,
  updateCard,
} from "../../services/api";
import { Audit, Card, Status, TypeAudit } from "../../util/types";
import { cardsReducer } from "../../util/reducer";
import { useAuth } from "../../hooks/auth";
import { FiTrash } from "react-icons/fi";

function Cards() {
  const [cards, setCards] = useReducer(cardsReducer, []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [titleDialog, setTitleDialog] = useState("");
  const [colorSecondarySecheme, setColorSecondarySchema] = useState("");
  const [textSecondaryAction, setTextSecondaryAction] = useState("");
  const [currentCard, setCurrentCard] = useState<Card>();
  const [newStatus, setNewStatus] = useState<Status>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getCards()
      .then((data: Card[]) => {
        const cardList = data.map((card) => ({
          ...card,
          formattedUserName:
            card.metadatas.name && card.metadatas.name.length > 30
              ? card.metadatas.name.substr(0, 30).concat("...")
              : card.metadatas.name,
        }));
        setCards({ type: "UPDATE-ALL", payload: cardList });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao carregar dados, Por favor, recarregue a página");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDialogOpen = useCallback(
    (
      type: Status,
      card: Card,
      title: string,
      color: string,
      textAction: string
    ) => {
      setTitleDialog(title);
      setColorSecondarySchema(color);
      setTextSecondaryAction(textAction);
      setNewStatus(type);
      setCurrentCard(card);
      setIsDialogOpen(true);
    },
    [setIsDialogOpen]
  );

  const onClose = async () => setIsDialogOpen(false);

  const deleteOrder = () => {
    setIsLoading(true);
    if (currentCard) {
      deleteCard(currentCard.id)
        .then(() => {
          //Deletando cartão da API
          setCards({ type: "REMOVE", payload: currentCard.id });

          //criando objeto de Log (Auditoria)
          const newAudit: Audit = {
            createdAt: String(new Date()),
            type: TypeAudit.CARD_DELETE,
            before: {
              createdAt: currentCard.createdAt,
              id: currentCard.id,
              metadatas: {
                name: currentCard.metadatas.name,
                digits: currentCard.metadatas.digits,
              },
              status: currentCard.status,
              updatedAt: currentCard.updatedAt,
              user_id: currentCard.user_id,
            },
            after: {
              createdAt: currentCard.createdAt,
              id: currentCard.id,
              metadatas: {
                name: currentCard.metadatas.name,
                digits: currentCard.metadatas.digits,
              },
              status: Status.DELETED,
              updatedAt: String(new Date()),
              user_id: currentCard.user_id,
            },
            requestedBy: user.email,
          };

          //Criando Log de Auditoria
          createAudit(newAudit)
            .then(() => {
              toast.success(
                `o pedido de cartão ${currentCard.metadatas.digits} foi Deletado`
              );

              setIsLoading(false);
              onClose();
            })
            .catch((err: any) => {
              console.log(err);
              toast.error(err);
            });
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err);
          setIsLoading(false);
          onClose();
        });
    }
  };

  const updateOrder = () => {
    setIsLoading(true);
    const newCard = {
      ...currentCard,
      updatedAt: String(new Date()),
      status: newStatus,
    };

    updateCard(newCard)
      .then((response: Card) => {
        //atualização do status do cartão
        setCards({ type: "UPDATE", payload: response });

        //criando objeto de Log (Auditoria)
        const newAudit: Audit = {
          createdAt: String(new Date()),
          type: TypeAudit.CARD_STATUS_CHANGE,
          before: {
            createdAt: response.createdAt,
            id: response.id,
            metadatas: {
              name: response.metadatas.name,
              digits: response.metadatas.digits,
            },
            status: currentCard?.status,
            updatedAt: currentCard?.updatedAt,
            user_id: response.user_id,
          },
          after: {
            createdAt: response.createdAt,
            id: response.id,
            metadatas: {
              name: response.metadatas.name,
              digits: response.metadatas.digits,
            },
            status: response.status,
            updatedAt: response.updatedAt,
            user_id: response.user_id,
          },
          requestedBy: user.email,
        };

        //Criando Log de Auditoria
        createAudit(newAudit)
          .then(() => {
            if (newStatus === Status.REJECTED) {
              toast.success(
                `o pedido de cartão ${newCard.metadatas?.digits} foi Rejeitado`
              );
            } else {
              toast.success(
                `o pedido de cartão ${newCard.metadatas?.digits} foi Aprovado`
              );
            }
            setIsLoading(false);
            onClose();
          })
          .catch((err: any) => {
            console.log(err);
            toast.error(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err);
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        titleDialog={titleDialog}
        description="Você tem certeza? Essa ação não pode ser desfeita"
        textPrimaryAction="Cancelar"
        textSecondaryAction={textSecondaryAction}
        colorSecondarySecheme={colorSecondarySecheme}
        onPrimaryAction={onClose}
        onSecondaryAction={
          newStatus === Status.DELETED ? deleteOrder : updateOrder
        }
        isLoading={isLoading}
      />
      <Flex justifyContent="center" align="center">
        <Box
          bg="white"
          w="95%"
          marginTop="32px"
          marginBottom="32px"
          minHeight="50vh"
          p={4}
          color="white"
        >
          <Text
            fontSize="26px"
            fontFamily="Lexend"
            color="black"
            marginBottom="1rem"
          >
            Cartões
          </Text>
          <Table variant="simple" fontSize="14px">
            <Thead fontWeight="700">
              <Tr>
                <Th>Usuário</Th>
                <Th>Dígito</Th>
                <Th>Limite</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody color="black" fontFamily="Nunito">
              {cards.map((card: Card) => (
                <Tr key={card.id}>
                  <Td>{card.formattedUserName}</Td>
                  <Td>{card.metadatas.digits}</Td>
                  <Td>
                    {" "}
                    {new Intl.NumberFormat("pt", {
                      style: "currency",
                      currency: "BRL",
                    }).format(card.metadatas.limit)}
                  </Td>
                  <Td>
                    <StatusCard status={card.status} />
                  </Td>
                  <Td isNumeric>
                    <Flex
                      direction="row"
                      justifyContent="space-between"
                      width="180px"
                    >
                      <Button
                        onClick={() =>
                          handleDialogOpen(
                            Status.REJECTED,
                            card,
                            "Rejeitar Pedido",
                            "red",
                            "Rejeitar"
                          )
                        }
                        colorScheme="red"
                        fontSize="14px"
                        disabled={!!card.updatedAt}
                      >
                        Rejeitar
                      </Button>
                      <Button
                        onClick={() =>
                          handleDialogOpen(
                            Status.APPROVED,
                            card,
                            "Aprovar Pedido",
                            "green",
                            "Aprovar"
                          )
                        }
                        colorScheme="green"
                        fontSize="14px"
                        disabled={!!card.updatedAt}
                      >
                        Aprovar
                      </Button>
                    </Flex>
                  </Td>
                  <Td>
                    <IconButton
                      variant="outline"
                      aria-label="order-card-delete"
                      colorScheme="red"
                      onClick={() =>
                        handleDialogOpen(
                          Status.DELETED,
                          card,
                          "Deletar Pedido",
                          "red",
                          "Deletar"
                        )
                      }
                      icon={<FiTrash />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
}
export default Cards;
