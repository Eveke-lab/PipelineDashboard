// Firestore module
import { firestore } from 'firebase';

// Application model
import { UserModel } from './user.model';

/**
 * PullRequest model
 */
export class PullRequestModel {
  uid: string = '';
  url: string = '';
  state: 'open' | 'closed';
  title: string = '';
  owner: UserModel;
  id: number;
  assigned: UserModel;
  requestedReviewers: UserModel;
  description: string = '';
  createdOn: firestore.Timestamp;
  updatedOn: firestore.Timestamp;
  comments: number;
  reviewComments: number;
  maintainerCanModify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
}
