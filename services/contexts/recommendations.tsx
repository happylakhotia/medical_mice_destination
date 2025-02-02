import { createContext, useContext, useState } from "react"

interface RecommendationContext {
    recommendations: any
    uploadRecommendations: (recommendations: any) => void
}


const recommendationContext = createContext<RecommendationContext | undefined>(undefined)


export function RecommendationContextProvider({children}: {children: React.ReactNode}) {
    const [recommendations, setRecommendations] = useState<any>(undefined)


    function uploadRecommendation(recommendations: any) {
        setRecommendations(recommendations)
    }


    return (
        <recommendationContext.Provider value={{
            recommendations: recommendations,
            uploadRecommendations: uploadRecommendation
        }}>
        {children}
        </recommendationContext.Provider>
    )
}


export function useRecommendationProvider() {
    const context = useContext(recommendationContext)

    if (!context) {
        throw new Error(`Call use RecommendationProvider inside Reecommendation Context Provider`)
    }

    return context
}

