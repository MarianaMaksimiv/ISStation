export interface IssInfo {
    iss_position: {
        latitude: number,
        longitude: number,
    }

    timestamp: number 
}
export interface IssSavedInfo {
    name: string
    iss_position: {
        latitude: number,
        longitude: number,
    }
    timestamp: number 
}
