import { CatAttributeType, CatModelType } from "../../CatModel/CatButton/CatModelTypes";

// builder state variables contain the state of the contract builder
// the contract builder is used to create a contract profile
// the contract profile is a JSON Data Layer object that is stored on the blockchain
// a data layer object will be created on the blockchain for each attribute in the contract profile and then claimed by the user

// let create a variable called builderStateAttributes that is a CatModelType
// the CatModelType is an object with a name and a list of attributes
// the attributes are a list of objects with a name and a value

export var BuilderStateVariables: CatModelType = {
    // lets create an array of data called attributes
    attributes: [
        {
            // the attributes will be an array of objects with a name and a value called data
            data: {
                id: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
                title: ["Contract Builder"],
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
                setAttributes: (attributes: CatAttributeType[]) => {
                    BuilderStateVariables.attributes = attributes;
                },
                // lets create a function that will set the id of the contract
                setId: (id: string) => {
                    BuilderStateVariables.attributes[0].data.id = [id];
                },
                // lets create a function that will set the title of the contract
                setTitle: (title: string) => {
                    BuilderStateVariables.attributes[0].data.title = [title];
                },
                // lets create a function that will set the tags of the contract
                setTags: (tags: string[]) => {
                    BuilderStateVariables.attributes[0].data.tags = tags;
                },
                // lets create a function that will set the description of the contract
                setDescription: (description: string) => {
                    BuilderStateVariables.attributes[0].data.description = [description];
                },
                // lets create a function that will set the content of the contract
                setContent: (content: string) => {
                    BuilderStateVariables.attributes[0].data.content = [content];
                },
                // lets create a function that will set the aiTools of the contract
                setAiTools: (aiTools: string[]) => {
                    BuilderStateVariables.attributes[0].data.aiTools = aiTools;
                },
                // lets create a function that will set the metadata of the contract
                setMetadata: (metadata: string[]) => {
                    BuilderStateVariables.attributes[0].data.metadata = [metadata];
                },
                // lets create a function that will set the log of the contract
                setLog: (log: string[]) => {
                    BuilderStateVariables.attributes[0].data.log = [log];
                },
                // lets create a function that will set the nodes of the contract
                setNodes: (nodes: string[]) => {
                    BuilderStateVariables.attributes[0].data.nodes = [nodes];
                },
                // lets create a function that will set the edges of the contract
                setEdges: (edges: string[]) => {
                    BuilderStateVariables.attributes[0].data.edges = [edges];
                },
                // lets create a function that will set the trades of the contract
                setTrades: (trades: string[]) => {
                    BuilderStateVariables.attributes[0].data.trades = [trades];
                },
            },
        },
    ],

};

// lets create functions to add and remove data from the builderStateAttributes by status
    // if the status is "0" then we will push the contract into the array
      // if the status is "1" then we will update the contract from the array based on the id
      // if the status is "2" then we will delete the contract in the array based on the id
