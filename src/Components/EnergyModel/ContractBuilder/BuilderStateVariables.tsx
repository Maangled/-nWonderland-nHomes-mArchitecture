import { CatAttributeType, CatModelType } from "../../CatModel/CatButton/CatModelTypes";

export var stateAttributes: CatModelType = {
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

export var newHomeAttributes: CatModelType = {
    attributes: [
        {
            questId: '0x00000',
            title: "Home #1",
            description: 'describe this node ... "smart board assistant node with AI assistant and AI tools"',
            // TODO content will automatically be filled with information about the node, the software, hardware, os, etc. 
                // this information will be able be saved in the node and initially not be sent to the blockchain
                // this will serve as a way to keep track of the node's information, and on computationally explicit nodes, where 
                // the hardeware and software need to be verified or the user wants to run a security scan, this information will 
                // be analyzed using privacy preserving machine learning algorithms to determine if there are any memory leaks, 
                // security vulnerabilities, or other issues with the node
            content: 'describe your node',
            // TODO tags will be automatically generated by the AI Assistant
            tags: 'Tags',

            AITools: 'AI Tools',
            Log: 'Log',
            Metadata: 'Metadata',
        },
    ],
};

export function setStateAttributes(attributes: CatAttributeType[]) {
    stateAttributes.attributes.push(attributes[0]);
}
export function setStateQuestId(questId: string) {
    stateAttributes.attributes[0].questId = questId;
}
export function setStateTitle(title: string) {
    return stateAttributes.attributes[0].title = title;
}
export function getStateTitle() {
    return stateAttributes.attributes[0].title;
}
export function setStateDescription(description: string) {
    stateAttributes.attributes[0].description = description;
}
export function setStateContent(content: string) {
    stateAttributes.attributes[0].content = content;
}
export function setStateTags(tags: string) {
    stateAttributes.attributes[0].tags = tags;
}
export function setStateAITools(AITools: string) {
    stateAttributes.attributes[0].AITools = AITools;
}
export function setStateLog(Log: string) {
    stateAttributes.attributes[0].Log = Log;
}
export function setStateMetadata(Metadata: string) {
    stateAttributes.attributes[0].Metadata = Metadata;
}

