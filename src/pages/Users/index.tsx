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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers } from "../../services/api";
import { User } from "../../util/types";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { formataCPF } from "../../util/functions";

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then((data: User[]) => {
        const userList = data.map((user) => ({
          ...user,
          formattedName:
            user.name && user.name.length > 30
              ? user.name.substr(0, 30).concat("...")
              : user.name,
          formattedEmail:
            user.email && user.email.length > 30
              ? user.email.substr(0, 30).concat("...")
              : user.email,
        }));

        console.log(userList);
        setUsers(userList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao carregar dados, Por favor, recarregue a página");
      });
  }, []);
  return (
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
          Usuários
        </Text>
        <Table variant="simple" fontSize="14px">
          <Thead fontWeight="700">
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Cpf</Th>
              <Th>Data de Nascimento </Th>
              <Th>Salário base</Th>
            </Tr>
          </Thead>
          <Tbody color="black" fontFamily="Nunito">
            {users.map((user, key) => (
              <Tr key={key}>
                <Td>{user.salaryBase}</Td>
                <Td>{user.formattedEmail}</Td>
                <Td>{formataCPF(String(user.document))}</Td>
                <Td>
                  {format(new Date(user.BirthDate), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </Td>
                <Td>
                  {new Intl.NumberFormat("pt", {
                    style: "currency",
                    currency: "BRL",
                  }).format(user.salaryBase)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
export default Users;
