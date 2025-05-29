import React, { createContext, useContext, useState, useCallback } from "react";
import { Alert } from "./Alert";
import { AnimatePresence } from "framer-motion";

type AlertContextType = {
  showAlert: (msg: string, duration?: number) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ show: boolean; msg: string; duration: number }>({
    show: false,
    msg: "",
    duration: 3000,
  });

  const showAlert = useCallback((msg: string, duration?: number) => {
    setAlert({ show: true, msg, duration: duration || 3000 });
  }, []);

  React.useEffect(() => {
    if (!alert.show) return;
    const maxDuration = alert.duration > 1800000 ? 1800000 : alert.duration;
    const timeout = setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), maxDuration);
    return () => clearTimeout(timeout);
  }, [alert.msg, alert.show]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AnimatePresence>
        {alert.show && <Alert message={alert.msg} />}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within an AlertProvider");
  return context.showAlert;
}