const { getIdeas, setIdeas } = require('./ideas.js');

function updateIdea(ideaId, idea) {
    let ideas = getIdeas();

    const idea = ideas.find(idea => ideaId === idea.id);
    const updateIdea = { ...idea };

    const updateIdeas = ideas.reduse((updateIdeas, idea) => {
        if (idea.id === ideaId) {
            return [updateIdeas, updateIdea]
        }
        return [...updateIdeas, idea];
    }, []);
    setIdeas(updateIdeas);
}