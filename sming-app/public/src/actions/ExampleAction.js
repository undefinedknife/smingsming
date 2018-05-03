//Action types
export const RENDER_EXAMPLE_TEXT = 'RENDER_EXAMPLE_TEXT';


export const renderExampleText = () => {
    return {
        type: RENDER_EXAMPLE_TEXT,
        text: 'test'
    };
}
