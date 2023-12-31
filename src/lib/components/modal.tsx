import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { ViewTask } from "../view/tasks";
import { SetStateAction, useState } from "react";
import { tasks } from "../const";
import { z } from "Zod";

interface CreateProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateModal = (props: CreateProps) => {
  const [taskname, setTaskName] = useState("");
  const [assign, setAssign] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState(1);
  const [error, setError] = useState("");
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  const handleChangeTaskName = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTaskName(e.target.value);
  };
  const handleChangeAssign = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAssign(e.target.value);
  };
  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };
  const handleCreate = () => {
    const valid = z.string().min(1);

    try {
      const task = new ViewTask(
        id,
        valid.parse(taskname),
        valid.parse(status),
        valid.parse(assign),
        new Date(),
        new Date()
      );
      tasks.setTasks(task);
      setId(id + 1);
      onClose();
    } catch (e) {
      setError("一文字以上で入力してください");
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bgColor={"gray.100"} border={"1px"}>
          <ModalHeader bgColor={"green.300"}>New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired marginBottom={"0.5em"}>
              <FormLabel>task</FormLabel>
              <Input
                value={taskname}
                onChange={handleChangeTaskName}
                bgColor={"white"}
                placeholder="todo"
              />
            </FormControl>
            <FormControl isRequired marginBottom={"0.5em"}>
              <FormLabel>assign</FormLabel>
              <Input
                value={assign}
                onChange={handleChangeAssign}
                bgColor={"white"}
                placeholder="todo"
              />
            </FormControl>
            <FormControl isRequired as="fieldset" marginBottom={"0.5em"}>
              <FormLabel as="legend">status</FormLabel>
              <RadioGroup
                defaultValue="pending"
                value={status}
                onChange={handleChangeStatus}
              >
                <HStack spacing="24px">
                  <Radio value="pending">pending</Radio>
                  <Radio value="processing">processing</Radio>
                  <Radio value="done">done</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            {error === "" ? (
              <></>
            ) : (
              <>
                <Box color={"red"}>{error}</Box>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreate}>
              追加
            </Button>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  contents: ViewTask;
}

export const EditModal = (props: EditProps) => {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const contents = props.contents;
  const [taskname, setTaskName] = useState(contents.name);
  const [assign, setAssign] = useState(contents.assign);
  const [status, setStatus] = useState(contents.status);
  const handleChangeTaskName = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTaskName(e.target.value);
  };
  const handleChangeAssign = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAssign(e.target.value);
  };
  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };
  const handleEdit = () => {
    const task = new ViewTask(
      contents.id,
      taskname,
      status,
      assign,
      contents.created_at,
      contents.updated_at
    );
    tasks.editElement(contents.id, task);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bgColor={"gray.300"} border={"1px"}>
          <ModalHeader bgColor={"blue.300"}>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired marginBottom={"0.5em"}>
              <FormLabel>task</FormLabel>
              <Input
                value={taskname}
                onChange={handleChangeTaskName}
                bgColor={"white"}
                placeholder="todo"
              />
            </FormControl>
            <FormControl isRequired marginBottom={"0.5em"}>
              <FormLabel>assign</FormLabel>
              <Input
                value={assign}
                onChange={handleChangeAssign}
                bgColor={"white"}
                placeholder="todo"
              />
            </FormControl>
            <FormControl isRequired as="fieldset" marginBottom={"0.5em"}>
              <FormLabel as="legend">status</FormLabel>
              <RadioGroup
                defaultValue="pending"
                value={status}
                onChange={handleChangeStatus}
              >
                <HStack spacing="24px">
                  <Radio value="pending">pending</Radio>
                  <Radio value="processing">processing</Radio>
                  <Radio value="done">done</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              修正する
            </Button>
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

export const DeleteModal = (props: DeleteProps) => {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const id = props.id;
  const handleDelete = (id: number) => {
    tasks.removeElement(id);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bgColor={"gray.100"} border={"1px"}>
          <ModalHeader bgColor={"yellow.300"}>Notice </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box marginTop={"2.5em"} textAlign={"center"}>
              <Button
                w={"80px"}
                bgColor={"red.300"}
                color={"white"}
                onClick={() => handleDelete(id)}
                marginRight={"2.5em"}
              >
                はい
              </Button>
              <Button
                w={"80px"}
                bgColor={"blue.300"}
                color={"white"}
                onClick={onClose}
              >
                いいえ
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button bgColor={"gray.300"} variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
