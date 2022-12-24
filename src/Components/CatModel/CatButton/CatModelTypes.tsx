// this is the types for the Cat Model; it is a simple object with a name and a list of attributes
// the attributes are a list of objects with a name and a value
// Cat models are the data structures that are used to store the data for the contracts and quests
// they are converted to JSON Data Layer objects that are stored on the blockchain



export interface CatModelType {
    // lets create an array of data called attributes
    attributes: CatAttributeType[];
    functions?: CatModelFunctions[];
}

export interface CatAttributeType {
    // the attributes will be an array of objects with a name and a value called data
    data: {
        // id is the id of the contract or quest, it is updated anytime the contract or quest is updated
        id: any[];
        // title is the title of the contract or quest
        title: string[];
        // tags are the tags that are used to search for the contract or quest
        tags: string[];
        // description is the description of the contract or quest
        description: string[];
        // content is the data of the contract or quest
        content: string[];
        // aiTools is the list functions that are used to create modify or update the contract or quest
        aiTools: string[];
        // metadata is other data that is used to create modify or update the contract or quest
        metadata: any[];
        // log is the list of events that have happened to the contract or quest
        log: any[];
        // nodes is the list of nodes that ar contractually bound to the contract or quest
        nodes: any[];
        // edges are the iot devices that are contractually feeding data to the contract or quest
        edges: any[];
        // trades are events that are available to the contract or quest
        trades: any[];
    };
    }

export interface CatModelFunctions {
    dataFunctions: {
        setAttributes: (attributes: CatAttributeType[]) => void;
        // lets create a function that will set the id of the contract
        setId: (id: string) => void;
        // lets create a function that will set the title of the contract
        setTitle: (title: string) => void;
        // lets create a function that will set the tags of the contract
        setTags: (tags: string[]) => void;
        // lets create a function that will set the description of the contract
        setDescription: (description: string) => void;
        // lets create a function that will set the content of the contract
        setContent: (content: string) => void;
        // lets create a function that will set the aiTools of the contract
        setAiTools: (aiTools: string[]) => void;
        // lets create a function that will set the metadata of the contract
        setMetadata: (metadata: any[]) => void;
        // lets create a function that will set the log of the contract
        setLog: (log: any[]) => void;
        // lets create a function that will set the nodes of the contract
        setNodes: (nodes: any[]) => void;
        // lets create a function that will set the edges of the contract
        setEdges: (edges: any[]) => void;
        // lets create a function that will set the trades of the contract
        setTrades: (trades: any[]) => void;
    };
}


// create a default cat model
export const defaultCatModel: CatModelType = {
    //set the default attributes to an empty array attributes[0].data{id, title, tags, description, content, aiTools, metadata, log, nodes, edges, trades}
    attributes: [
        {
            data: {
                id: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                title: ["Cat Model"],
                tags: ["Cat Model"],
                description: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                content: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                aiTools: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                metadata: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                log: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                nodes: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                edges: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                trades: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
            },
        },
    ],
    functions: [
        {
            dataFunctions: {
                setAttributes: (attributes: CatAttributeType[]) => {},
                // lets create a function that will set the id of the contract
                setId: (id: string) => {},
                // lets create a function that will set the title of the contract
                setTitle: (title: string) => {},
                // lets create a function that will set the tags of the contract
                setTags: (tags: string[]) => {},
                // lets create a function that will set the description of the contract
                setDescription: (description: string) => {},
                // lets create a function that will set the content of the contract
                setContent: (content: string) => {},
                // lets create a function that will set the aiTools of the contract
                setAiTools: (aiTools: string[]) => {},
                // lets create a function that will set the metadata of the contract
                setMetadata: (metadata: any[]) => {},
                // lets create a function that will set the log of the contract
                setLog: (log: any[]) => {},
                // lets create a function that will set the nodes of the contract
                setNodes: (nodes: any[]) => {},
                // lets create a function that will set the edges of the contract
                setEdges: (edges: any[]) => {},
                // lets create a function that will set the trades of the contract
                setTrades: (trades: any[]) => {},
            },
        },
    ],
};