import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [isComeback, setisComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setisComeback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setisComeback(false);
      }

      appState.current = nextAppState;

      return () => {
        subscription.remove();
      };
    });
  }, []);

  return {
    isComeback,
  };
}

export default useAppState;
