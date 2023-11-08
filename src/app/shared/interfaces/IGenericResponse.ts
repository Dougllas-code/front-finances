import { ResponseType } from "../enums/responseType";

export interface IGenericResponse<DataType> {
  type: ResponseType;
  message: string;
  data: DataType;
}
