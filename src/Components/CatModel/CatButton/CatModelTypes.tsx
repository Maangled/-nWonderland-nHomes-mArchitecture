// this is the types for the Cat Model; it is a simple object with a name and a list of attributes
// the attributes are a list of objects with a name and a value
// the value is a string, but it is a string that is a number, so we need to convert it to a number

export interface CatModelType {
    attributes: CatAttributeType[];
}

export interface CatAttributeType {
    questId: string;
    title: string;
    description: string;
    content: string;
    tags: string;
    AITools: string;
    Log: string;
    Metadata: string;
    }

// create a default cat model
export const defaultCatModel: CatModelType = {
    attributes: [
        {
            questId: '0',
            title: 'Title',
            description: 'Description',
            content: 'Content',
            tags: 'Tags',
            AITools: 'AI Tools',
            Log: 'Log',
            Metadata: 'Metadata',
        },
    ],
};