// Third party modules
import { firestore, CloudFunction, EventContext } from 'firebase-functions';

// Dashboard hub firebase functions models/mappers
import { DocumentData, DocumentSnapshot, FirebaseAdmin, WriteResult } from './../client/firebase-admin';

export const onDeleteProjectRepositories: CloudFunction<DocumentSnapshot> = firestore
  .document('projects/{projectUid}')
  .onDelete(async (projectSnapshot: DocumentSnapshot, context: EventContext) => {

    try {
      const project: DocumentData = projectSnapshot.data();

      if (Array.isArray(project.repositories) && project.repositories.length > 0) {

        const promiseList: Promise<WriteResult>[] = [];

        for (const repositoryUid of project.repositories) {
          const repo: Promise<WriteResult> = FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).get()
            .then((repoSnapshot: DocumentSnapshot) => {
              const repoData: DocumentData = repoSnapshot.data();
              if (Array.isArray(repoData.projects)) {
                repoData.projects = repoData.projects.filter((element: string) => element !== context.params.projectUid);
              } else {
                repoData.projects = [];
              }

              return FirebaseAdmin.firestore().collection('repositories').doc(repositoryUid).update(repoData);
            });

          promiseList.push(repo);
        }

        await Promise.all(promiseList);
      }

      return;

    } catch (err) {
      console.log(err)
      throw err;
    }

  });