// create a type for the cat model
// it will have a catState that will determine if the cat is walking, sleeping, or jumping
// it will also have a catType that will determine if the cat is a normal cat, a radioactive cat, or a cat in a box
// it will also have a catPosition that will determine the position of the cat
// it will also have a catDirection that will determine the direction of the cat
// it will also have a catSpeed that will determine the speed of the cat
// it will also have a catSize that will determine the size of the cat
// it will also have a catColor that will determine the color of the cat
// it will also have a catImage that will determine the image of the cat

export type CatType = {
    cAtributes: CatState[];
};
// create a type for the cat state
// it will have a catState that will determine if the cat is walking, sleeping, or jumping
// CatState is separate from CatType because so that more than one cat can be created.
export interface CatState {
    catState: string;
    catBreed: string;
    catPosition: string;
    catDirection: string;
    catSpeed: number;
    catSize: string;
    catColor: string;
    catImage: string;
}
// create a default cat state that will be used to initialize the cat
export const DefaultCatState: CatState = {
    catState: "walking",
    catBreed: "normal",
    catPosition: "left",
    catDirection: "right",
    catSpeed: 1,
    catSize: "small",
    catColor: "black",
    catImage: "cat",
};
