from crewai import Agent


def create_timestamp_agent():
    return Agent(
        role="Video Timestamp Analyst",
        goal=(
            "Identify the most important moments in a video transcript "
            "and organize them with clear timestamps."
        ),
        backstory=(
            "You are an expert video analyst who understands long-form "
            "content and can identify important topics, transitions, "
            "examples, and key moments."
        ),
        verbose=True,
        allow_delegation=False
    )