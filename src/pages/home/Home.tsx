import { useState, useEffect } from "react";
import { IDisco } from "../../types/crud";
import DiscTable from "../../components/discTable/DiscTable";
import {
  createDisc,
  deleteDisc,
  getDiscData,
  updateDisc,
} from "../../services/crud";
import EditDiscModal from "../../components/editDiscModal/EditDiscModal";
import CreateDiscModal from "../../components/createDiscModal/CreateDiscModal";

const Home = () => {
  const auth: string = localStorage.getItem("token") || "";

  const [discData, setDiscData] = useState<IDisco[]>([]);
  const [modalState, setModalState] = useState<{
    modalVisible: boolean;
    initialValues: IDisco;
  }>({
    modalVisible: false,
    initialValues: { id: 0, name: "", author: "", genre: "" },
  });
  const [createModalState, setCreateModalState] = useState<{
    modalVisible: boolean;
    initialValues: IDisco;
  }>({
    modalVisible: false,
    initialValues: { id: 0, name: "", author: "", genre: "" },
  });

  useEffect(() => {
    getDiscData(auth).then((respuesta) => {
      setDiscData(respuesta);
    });
  }, []);

  const handleCreate = async (token: string, data: IDisco) => {
    try {
      const newData = await createDisc(token, data);
      console.log(newData);
      setDiscData(newData);
      setModalState({
        modalVisible: false,
        initialValues: { id: 0, name: "", author: "", genre: "" },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleEdit = (data: IDisco) => {
    setModalState({ modalVisible: true, initialValues: data });
  };
  const openCreate = () => {
    setCreateModalState({
      modalVisible: true,
      initialValues: { id: 0, name: "", author: "", genre: "" },
    });
  };
  const handleUpdate = async (token: string = auth, data: IDisco) => {
    const newData = await updateDisc(token, data);
    console.log(newData);
    setDiscData(newData);
    setModalState({
      modalVisible: false,
      initialValues: { id: 0, name: "", author: "", genre: "" },
    });
  };

  const handleDelete = async (token: string, id: number) => {
    try {
      const newData = await deleteDisc(token, id);
      console.log(newData);
      setDiscData(newData);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onCancel = () => {
    setModalState({
      modalVisible: false,
      initialValues: { id: 0, name: "", author: "", genre: "" },
    });
  };
  const onCreateCancel = () => {
    setCreateModalState({
      modalVisible: false,
      initialValues: { id: 0, name: "", author: "", genre: "" },
    });
  };

  return (
    <>
      <DiscTable token={auth} discData={discData} onCreate={openCreate} onUpdate={handleEdit} onDelete={handleDelete} />
      <EditDiscModal modalVisible={modalState.modalVisible} initialValues={modalState.initialValues} onCancel={onCancel} onUpdate={handleUpdate} />
      <CreateDiscModal modalVisible={createModalState.modalVisible} initialValues={createModalState.initialValues} onCancel={onCreateCancel} onCreate={handleCreate} />
    </>
  );
};

export default Home;
