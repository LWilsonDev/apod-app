import React, {useState, useEffect, useMemo, useContext} from "react";
import {AccessibilityInfo} from "react-native";

/**
 * Taken from https://github.com/cds-snc/covid-alert-app/blob/main/src/services/AccessibilityService/AccessibilityServiceProvider.tsx
 */

interface AccessibilityServiceContextProps {
  isScreenReaderEnabled: boolean;
}

const AccessibilityServiceContext =
  React.createContext<AccessibilityServiceContextProps>({} as any);

export interface AccessibilityServiceProviderProps {
  children: React.ReactNode;
}

export const AccessibilityServiceProvider = ({
  children,
}: AccessibilityServiceProviderProps) => {
  const [screenReaderEnabled, setScreenReaderEnabled] =
    useState<AccessibilityServiceContextProps["isScreenReaderEnabled"]>(false);

  useEffect(() => {
    const handleScreenReaderToggled = (screenReaderEnabled: any) => {
      setScreenReaderEnabled(screenReaderEnabled);
    };
    // for initial app start
    AccessibilityInfo.isScreenReaderEnabled()
      .then((enabled: any) => {
        setScreenReaderEnabled(enabled);
      })
      .catch(() => {
        setScreenReaderEnabled(false);
      });
    AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      handleScreenReaderToggled
    );
    return () => {
      AccessibilityInfo.removeEventListener(
        "screenReaderChanged",
        handleScreenReaderToggled
      );
    };
  }, []);

  const props = useMemo(() => {
    return {isScreenReaderEnabled: screenReaderEnabled};
  }, [screenReaderEnabled]);

  return (
    <AccessibilityServiceContext.Provider value={props}>
      {children}
    </AccessibilityServiceContext.Provider>
  );
};

export const useAccessibilityService = () => {
  return useContext(AccessibilityServiceContext);
};
