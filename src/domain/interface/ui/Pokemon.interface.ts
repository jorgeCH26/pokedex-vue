
export interface Pokemon{
    id: number;
    name: string;
    types: string[];
    imgUrl: string;
    imgUrlGift?: string;
    abilities: string[];
    stats: Stats[];
    imgUrl3d?: string;
    
}


interface Stats {
    base_stat: string;
    name_stat: string
}
