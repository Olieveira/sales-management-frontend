import React, { useEffect, createContext, useContext, useState, useCallback } from "react";
import { Alert, AlertSelect } from "./Alert";
import { AnimatePresence } from "framer-motion";

type AlertContextType = {
  showAlert: (msg: string, duration?: number) => void;
  showSelectAlert: (msg: string, selectType: 'number' | 'boolean') => Promise<number | boolean>;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ show: boolean; msg: string; duration: number }>({
    show: false,
    msg: "",
    duration: 3000,
  });

  const [selectAlert, setSelectAlert] = useState<{
    show: boolean;
    msg: string;
    selectType: 'number' | 'boolean';
    resolve?: (selected: number | boolean) => void;
  }>({
    show: false,
    msg: '',
    selectType: 'boolean',
  });

  useEffect(() => {
    if (!alert.show) return;
    const maxDuration = alert.duration > 1800000 ? 1800000 : alert.duration;
    const timeout = setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), maxDuration);
    return () => clearTimeout(timeout);
  }, [alert.msg, alert.show]);

  const showAlert = useCallback((msg: string, duration?: number) => {
    setAlert({ show: true, msg, duration: duration || 3000 });
  }, []);

  const showSelectAlert = useCallback((msg: string, selectType: 'number' | 'boolean') => {
    return new Promise<number | boolean>((resolve) => {
      setSelectAlert({ show: true, msg, selectType, resolve })
    })
  }, []);

  const handleSelect = (selected: boolean | number) => {
    if (selectAlert.resolve) selectAlert.resolve(selected);
    setSelectAlert({ ...selectAlert, show: false })
  }

  return (
    <AlertContext.Provider value={{ showAlert, showSelectAlert }}>
      {children}
      <AnimatePresence>
        {alert.show && <Alert key="alert" message={alert.msg} />}
        {selectAlert.show && <AlertSelect
          key="selectAlert"
          message={selectAlert.msg}
          selectType={selectAlert.selectType}
          handleSelect={handleSelect} />}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert deve estar dentro do AlertProvider");
  return context.showAlert;
}

export function useSelectAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useSelectAlert deve estar dentro do AlertProvider");
  return context.showSelectAlert;
}