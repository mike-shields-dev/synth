import { camelCaseToTitleCase } from ".";

describe('camelCaseToTitleCase', () => {
    it('converts camel case to title case', () => {
        expect(camelCaseToTitleCase("camelCaseToTitleCase")).toEqual('Camel Case To Title Case');
    })
})