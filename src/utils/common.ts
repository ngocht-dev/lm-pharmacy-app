import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

export const getAppVersion = () => {
  const showExpoUpdate = Updates.channel === 'development' && Updates.updateId;
  return `v${Application.nativeApplicationVersion}${showExpoUpdate ? `-${Updates.updateId}` : ''}`;
};
