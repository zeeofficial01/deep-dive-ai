from crewai import Agent


def create_action_agent():
    return Agent(
        role="Action Items Specialist",
        goal=(
            "Identify actionable tasks, recommendations, and next steps "
            "from a video transcript."
        ),
        backstory=(
            "You are an expert at analyzing meetings, lectures, and "
            "discussions to identify what needs to be done next."
        ),
        verbose=True,
        allow_delegation=False
    )