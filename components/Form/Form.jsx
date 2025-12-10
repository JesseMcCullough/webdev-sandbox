import "./Form.css";
import { useState, createContext, useEffect, useContext } from "react";
import Debug from "@/utils/Debug";

const FormContext = createContext();
const isDebug = true;

export function Form({ children }) {
    const [values, setValues] = useState({});
    const [error, setError] = useState([]);
    const debug = new Debug("Form", { enabled: isDebug });

    useEffect(() => {
        debug.log(values);
        debug.log(error);
    }, [values, error]);

    function addError(name, message) {
        setError((prev = []) => {
            // default empty array
            const index = prev.findIndex((error) => error?.name === name);

            if (index !== -1) {
                // existing error
                if (message === null) {
                    // delete error
                    return prev.filter((error) => error?.name !== name);
                } else {
                    // update error
                    const updated = [...prev];
                    updated[index] = { name, message };
                    return updated;
                }
            } else {
                // add new error
                if (!message) return prev; // nothing to add
                return [...prev, { name, message }];
            }
        });
    }

    return (
        <FormContext.Provider
            value={{
                values,
                setValues,
                setError,
                addError,
            }}
        >
            <form className="form">
                {children}
                {error.map((error) => (
                    <p key={error.name} className="error-message">
                        {error.message}
                    </p>
                ))}
            </form>
        </FormContext.Provider>
    );
}

export function Input({ name, type, label, autocomplete }) {
    const { values, setValues, addError } = useContext(FormContext);
    const [isError, setIsError] = useState(false);
    const debug = new Debug("Input", { enabled: isDebug });

    function validateInput() {
        debug.log("Running validateInput");
        if (type === "text") {
            debug.log("is text");
            if (!values[name]) {
                debug.log("Setting error for " + label);
                addError(name, label + " is required");
                setIsError(true);
            }
        }
    }

    let inputClassNames = "";
    values[name] ? (inputClassNames += " has-value") : inputClassNames;
    isError ? (inputClassNames += " error") : inputClassNames;

    return (
        <InputGroup>
            <input
                name={name}
                type={type}
                id={name}
                onChange={(e) => {
                    setIsError(false);
                    debug.log(
                        "onchange, trying to add " + name + " with null (reset)"
                    );
                    addError(name, null);
                    setValues((prev) => ({
                        ...prev,
                        [e.target.id]: e.target.value,
                    }));
                }}
                onBlur={validateInput}
                className={inputClassNames}
                autoComplete={autocomplete}
                value={values[name] ? values[name] : ""}
            />
            <label htmlFor={name}>{label}</label>
        </InputGroup>
    );
}

export function InputGroup({ name, children }) {
    return (
        <div className={name ? `${name} input-group` : "input-group"}>
            {children}
        </div>
    );
}
