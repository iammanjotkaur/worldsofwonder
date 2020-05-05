export class Monument {
    constructor(
        private id: string,
        private  place: string,
        private  description: string,
        private imageURL: string,
        private ratings: number,
        private likes: number,
        private isLiked: boolean
    ) {}
}

