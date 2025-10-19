"use client";
import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';
import type { Shoe } from "@/types/types";

type ResultType = string | null | undefined

type CompareContextType = {
    compareElements: Shoe[];
    addToCompare: (shoe: Shoe) => void;
    removeFromCompare: (slug: string) => void;
    clearCompare: () => void;
    compareResult: ResultType;
    setCompareResult: React.Dispatch<React.SetStateAction<ResultType>>;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
    const [compareElements, setCompareElements] = useState<Shoe[]>([]);
    const [compareResult, setCompareResult] = useState<ResultType>();

    const notify = () => toast('Maximum 4 products can be compared at the same time.',
        {
            icon: '⚠️',
            style: {
                borderRadius: '10px',
                padding: '10px',
                background: '#333',
                color: '#fff',
                fontFamily: 'Adineu Pro'
            },
        }
    );

    const addToCompare = (shoe: Shoe) => {
        if (compareElements.length < 4) {
            setCompareElements((prev) => {
                if (prev.some((s) => s.slug === shoe.slug)) return prev;
                return [...prev, shoe];
            });
            setCompareResult(null);
        } else notify()
    };

    const removeFromCompare = (slug: string) => {
        setCompareElements((prev) => prev.filter((s) => s.slug !== slug));
        setCompareResult(null);
    }

    const clearCompare = () => {
        setCompareElements([]);
        setCompareResult(null);
    }

    return (
        <CompareContext.Provider
            value={{
                compareElements,
                addToCompare,
                removeFromCompare,
                clearCompare,
                compareResult,
                setCompareResult
            }}
        >
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) throw new Error("useCompare must be used within CompareProvider");
    return ctx;
};
