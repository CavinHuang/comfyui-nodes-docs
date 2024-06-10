# ∞ Group Chat
## Documentation
- Class name: `GroupChat`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

The GroupChat node facilitates the creation and management of group chat sessions among multiple agents. It enables the initiation of chats, handling of messages, and management of chat flow, including the selection of speakers and the introduction of agents, thereby orchestrating complex multi-agent interactions within a group chat environment.
## Input types
### Required
- **`group_manager`**
    - The manager responsible for overseeing the group chat, providing necessary configurations and permissions for the chat session.
    - Comfy dtype: `GROUP_MANAGER`
    - Python dtype: `GroupManager`
- **`init_message`**
    - The initial message to start the group chat session, setting the tone and context for the conversation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`send_introductions`**
    - A flag indicating whether agents should send introductions at the beginning of the chat, setting the stage for their interactions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`summary_method`**
    - The method used to generate a summary of the chat session, determining how the conversation's key points are captured.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`max_turns`**
    - Specifies the maximum number of turns the chat session can have, controlling the length and potentially the depth of the conversation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`clear_history`**
    - A flag to indicate whether the chat history should be cleared before starting a new session, ensuring privacy and relevance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`agent_i`**
    - Represents one of potentially multiple agents participating in the group chat, contributing to the dynamic flow of conversation.
    - Comfy dtype: `AGENT`
    - Python dtype: `Agent`
## Output types
- **`chat_history`**
    - Comfy dtype: `STRING`
    - A record of all messages exchanged during the chat session, providing a comprehensive overview of the conversation's flow.
    - Python dtype: `str`
- **`summary`**
    - Comfy dtype: `STRING`
    - A concise summary of the chat session, capturing the essence and key points of the conversation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GroupChat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "group_manager": ("GROUP_MANAGER",),
                "init_message": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "send_introductions": ("BOOLEAN", {"default": False},),
                "summary_method": ([
                    "last_msg",
                    "reflection_with_llm",
                ],),
                "max_turns": ("INT", {"default": 10}),
                "clear_history": ("BOOLEAN", {"default": True},),
            },
            "optional": {
                "agent_1": ("AGENT",),
                "agent_2": ("AGENT",),
                "agent_3": ("AGENT",),
                "agent_4": ("AGENT",),
                "agent_5": ("AGENT",),
                "agent_6": ("AGENT",),
                "agent_7": ("AGENT",),
                "agent_8": ("AGENT",),
            },
        }

    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("chat_history", "summary", )

    FUNCTION = "start_chat"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def start_chat(
        self,
        group_manager,
        init_message,
        send_introductions,
        summary_method,
        max_turns,
        clear_history,
        **kwargs,
    ):
        agents = [kwargs[i] for i in kwargs if "agent_" in i]
        assert len(agents) > 1, "At least 2 agents are needed to start a group chat session"
        # create chat
        group_chat = AutogenGroupChat(
            agents=agents,
            messages=[],
            max_round=max_turns,
            send_introductions=send_introductions,
        )
        group_chat_manager = GroupChatManager(
            groupchat=group_chat,
            **group_manager,
        )
        # start chat
        chat_result = agents[0].initiate_chat(
            group_chat_manager,
            message=init_message,
            summary_method=summary_method,
            max_turns=max_turns,
            clear_history=clear_history,
        )
        # parse results
        summary = chat_result.summary
        chat_history = ""
        for message in chat_result.chat_history:
            if message["content"] is not None:
                chat_history += "- " + message["content"] + "\n\n"
        return (chat_history, summary)

```
