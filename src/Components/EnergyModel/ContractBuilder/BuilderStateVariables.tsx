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

export function setStateAttributes(attributes: CatAttributeType[]) {
    stateAttributes.attributes.push(attributes[0]);
}
export function setStateQuestId(questId: string) {
    stateAttributes.attributes[0].questId = questId;
}
export function setStateTitle(title: string) {
    stateAttributes.attributes[0].title = title;
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

