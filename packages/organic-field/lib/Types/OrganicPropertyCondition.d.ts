import OrganicProperty from '@src/OrganicProperty';
declare type OrganicPropertyMessages = {
    log?: string[];
    info?: string[];
    warn?: string[];
    error?: string[];
    [k: string]: any;
};
export declare type OrganicPropertyConditionResult = {
    passed: boolean;
    messages?: OrganicPropertyMessages;
};
export declare type OrganicPropertyCondition = (property: OrganicProperty<any>) => OrganicPropertyConditionResult;
export default OrganicPropertyCondition;
//# sourceMappingURL=OrganicPropertyCondition.d.ts.map