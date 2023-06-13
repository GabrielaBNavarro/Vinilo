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
import HomeHeader from "../../components/homeHeader/HomeHeader";

const Home = () => {
  const auth: string = localStorage.getItem("token") || "";

  const [discData, setDiscData] = useState<IDisco[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
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
    setLoading(true);
    getDiscData(auth).then((respuesta) => {
      setDiscData(respuesta)
      setLoading(false)
    }
    );
  }, []);

  const handleCreate = async (token: string, data: IDisco) => {
    try {
      setLoading(true);
      const newData = await createDisc(token, data);
      setDiscData(newData);
      setModalState({
        modalVisible: false,
        initialValues: { id: 0, name: "", author: "", genre: "" },
      });
    } catch (error) {
      return Promise.reject(error);
    }
    setLoading(false);
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
    setLoading(true);
    const newData = await updateDisc(token, data);
    setDiscData(newData);
    setModalState({
      modalVisible: false,
      initialValues: { id: 0, name: "", author: "", genre: "" },
    });
    setLoading(false);
  };

  const handleDelete = async (token: string, id: number) => {
    setLoading(true);
    try {
      const newData = await deleteDisc(token, id);
      setDiscData(newData);
    } catch (error) {
      return Promise.reject(error);
    }
    setLoading(false);
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
      <HomeHeader />
      <DiscTable token={auth} discData={discData} loading={loading} onCreate={openCreate} onUpdate={handleEdit} onDelete={handleDelete} />
      <EditDiscModal modalVisible={modalState.modalVisible} initialValues={modalState.initialValues} onCancel={onCancel} onUpdate={handleUpdate} />
      <CreateDiscModal modalVisible={createModalState.modalVisible} initialValues={createModalState.initialValues} onCancel={onCreateCancel} onCreate={handleCreate} />
    </>
  );
};

export default Home;
