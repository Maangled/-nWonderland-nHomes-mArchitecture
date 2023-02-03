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
                setId: (id: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.id?.splice(0, 1, id);
                },
                // lets create a function that will set the title of the contract
                setTitle: (title: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.title?.splice(0, 1, title);
                },
                // lets create a function that will set the tags of the contract
                setTags: (tags: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.tags?.splice(0, 1, tags);
                },
                // lets create a function that will set the description of the contract
                setDescription: (description: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.description?.splice(0, 1, description);
                },
                // lets create a function that will set the content of the contract
                setContent: (content: any) => {
                    // splice the content into the first element of the array
                    BuilderStateVariables?.attributes?.[0]?.data?.content?.splice(0, 1, content);
                },
                // lets create a function that will set the aiTools of the contract
                setAiTools: (aiTools: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.aiTools?.splice(0, 1, aiTools);
                },
                // lets create a function that will set the metadata of the contract
                setMetadata: (metadata: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.metadata?.splice(0, 1, metadata);
                },
                // lets create a function that will set the log of the contract
                setLog: (log: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.log?.splice(0, 1, log);
                },
                // lets create a function that will set the nodes of the contract
                setNodes: (nodes: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.nodes?.splice(0, 1, nodes);
                },
                // lets create a function that will set the edges of the contract
                setEdges: (edges: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.edges?.splice(0, 1, edges);
                },
                // lets create a function that will set the trades of the contract
                setTrades: (trades: any) => {
                    BuilderStateVariables?.attributes?.[0]?.data?.trades?.splice(0, 1, trades);
                },
            },
        },
    ],
    setEnergyModelState: (energyModelState: number) => {
        energyModelState === energyModelState;
    },
    energyModelState: 0,
};

// lets create functions to add and remove data from the builderStateAttributes by status
    // if the status is "0" then we will push the contract into the array
      // if the status is "1" then we will update the contract from the array based on the id
      // if the status is "2" then we will delete the contract in the array based on the id
