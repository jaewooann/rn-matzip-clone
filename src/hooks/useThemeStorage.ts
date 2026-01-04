import {storageKeys} from '@/constants/key';
import useThemeStore, {Theme} from '@/store/theme';
import {getEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

function useThemeStorage() {
  const systemTheme = useColorScheme();
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: Theme) => {
    await setEncryptStorage(storageKeys.THEME_MODE, mode);
    setTheme(mode);
  };

  const setSystem = async (isSystem: boolean) => {
    await setEncryptStorage(storageKeys.THEME_SYSTEM, isSystem);
    setSystemTheme(isSystem);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getEncryptStorage(storageKeys.THEME_MODE)) ?? 'light';
      const systemMode =
        (await getEncryptStorage(storageKeys.THEME_SYSTEM)) ?? false;

      const newMode = systemMode ? systemTheme : mode;
      setTheme(newMode);
      setSystemTheme(systemMode);
    })();
  }, [setTheme, setSystemTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;
