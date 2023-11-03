import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react";
import { tasks } from "./lib/const";
import { CreateModal, DeleteModal, EditModal } from "./lib/components/modal";
import { useState } from "react";

function App() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(0);
  const handleCreate = () => {
    setIsOpenCreateModal(!isOpenCreateModal);
  };

  const handleEdit = (id: number) => {
    setSelectedTaskId(id);
    setIsOpenEditModal(!isOpenEditModal);
  };
  const onCloseEditModal = () => {
    setIsOpenEditModal(!isOpenEditModal);
  };

  const handleDelete = (id: number) => {
    setSelectedTaskId(id);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  return (
    <>
      <Heading marginTop={"0.5em"} marginBottom={"2.5em"} textAlign={"center"}>
        Todo アプリ
      </Heading>
      <Box w={"80%"} position={"fixed"} m={"auto"} left={0} right={0}>
        <Flex justifyContent={"flex-end"} marginBottom={"2.5em"}>
          <Button onClick={handleCreate} bgColor={"green.300"} color={"white"}>
            新規作成
          </Button>
          <CreateModal isOpen={isOpenCreateModal} onClose={handleCreate} />
        </Flex>

        <TableContainer>
          <Table variant="simple" colorScheme="gray.300" border={"1px"}>
            <Thead>
              <Tr>
                <Th>todo</Th>
                <Th>status</Th>
                <Th>assign</Th>
                <Th>created</Th>
                <Th>updated</Th>
                <Th>action</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.tasks.map((task) => (
                <Tr key={task.id}>
                  <Td>{task.name}</Td>
                  <Td>{task.status}</Td>
                  <Td>{task.assign}</Td>
                  <Td>{task.created_at.toISOString()}</Td>
                  <Td>{task.updated_at.toISOString()}</Td>
                  <Td>
                    <Button
                      bgColor={"blue.300"}
                      color={"white"}
                      onClick={() => handleEdit(task.id)}
                    >
                      編集
                    </Button>
                    <EditModal
                      isOpen={isOpenEditModal && selectedTaskId === task.id}
                      onClose={onCloseEditModal}
                      contents={task}
                    />
                  </Td>
                  <Td>
                    <Button
                      bgColor={"red.300"}
                      color={"white"}
                      onClick={() => handleDelete(task.id)}
                    >
                      削除
                    </Button>
                    <DeleteModal
                      isOpen={isOpenDeleteModal && selectedTaskId === task.id}
                      onClose={onCloseDeleteModal}
                      id={selectedTaskId}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default App;
