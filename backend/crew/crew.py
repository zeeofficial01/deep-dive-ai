from crewai import Crew, Task, Process

from agents.notes_agent import create_notes_agent
from agents.timestamp_agent import create_timestamp_agent
from agents.action_agent import create_action_agent


def create_analysis_crew(transcript):

    notes_agent = create_notes_agent()
    timestamp_agent = create_timestamp_agent()
    action_agent = create_action_agent()

    notes_task = Task(
        description=f"""
        Analyze the following video transcript and create structured,
        clear, and useful notes.

        TRANSCRIPT:
        {transcript}
        """,
        expected_output="""
        A structured summary containing:
        - Executive summary
        - Main topics
        - Key insights
        - Important concepts
        """,
        agent=notes_agent
    )

    timestamp_task = Task(
        description=f"""
        Analyze the following transcript and identify the most important
        moments and topics.

        TRANSCRIPT:
        {transcript}
        """,
        expected_output="""
        A list of important moments with:
        - Timestamp
        - Topic
        - Brief explanation
        """,
        agent=timestamp_agent
    )

    action_task = Task(
        description=f"""
        Analyze the following transcript and identify all useful action
        items, recommendations, and next steps.

        TRANSCRIPT:
        {transcript}
        """,
        expected_output="""
        A structured list of action items with:
        - Action
        - Description
        - Priority
        """,
        agent=action_agent
    )

    analysis_crew = Crew(
        agents=[
            notes_agent,
            timestamp_agent,
            action_agent
        ],
        tasks=[
            notes_task,
            timestamp_task,
            action_task
        ],
        process=Process.sequential,
        verbose=True
    )

    return analysis_crew