import { UsersDTO } from './UsersDTO';
import { ReposDTO } from './ReposDTO';

export class RepoDetailsDTO {
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
      watchers_count: number;
      default_branch: string;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      has_downloads: boolean;
      archived: boolean;
      disabled: boolean;
      pushed_at: Date;
      created_at: Date;
      updated_at: Date;
      parent: ReposDTO;
}