import { UsersDTO } from '../../users/models/UsersDTO';


export class ReposDTO {
      id: number;
      node_is: string;
      name: string;
      full_name: string;
      owner: UsersDTO;
      private: boolean;
      html_url: string;
      description: string;
      fork: string;
      url: string;
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
}