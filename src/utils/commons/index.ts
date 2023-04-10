import { typeErrors } from "../../data/typeErrors";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("de-DE").format(value);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dateTimeFormat = (value: string | Date, type = "short") => {
    return new Intl.DateTimeFormat("es-ES", {
        ...(type === "long"
            ? {
                  weekday: "long",
                  month: "long"
              }
            : {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  month: "2-digit"
              }),
        year: "numeric",
        day: "2-digit",
        timeZone: "America/Santiago"
    }).format(new Date(value));
};

export const translateErrors = (statusCode: string): string => typeErrors[statusCode] || typeErrors["DEFAULT"];
