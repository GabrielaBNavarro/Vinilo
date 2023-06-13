export interface IDisco {
  key: number;
  name: string;
  genre: string;
  author: string;
}

export interface ITableProps {
  token: string;
  discData?: IDisco[];
  loading: boolean;
  onCreate: (token: string, data: IDisco) => void;
  onUpdate: (data: IDisco) => void;
  onDelete: (token: string, id: number) => void;
  
}
export interface IEditDiscModalProps {
  modalVisible: boolean;
  initialValues: IDisco;
  onCancel: () => void;
  onUpdate: (token: string, data: IDisco) => void;
}
export interface ICreateDiscModalProps {
  modalVisible: boolean;
  initialValues: IDisco;
  onCancel: () => void;
  onCreate: (token: string, data: IDisco) => void;
}
