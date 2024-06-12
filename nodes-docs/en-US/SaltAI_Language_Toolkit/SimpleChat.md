# ∞ Simple Chat
## Documentation
- Class name: `SimpleChat`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

SimpleChat facilitates straightforward, one-on-one text-based conversations between two agents. It abstracts the complexities of initiating, managing, and summarizing chat interactions, providing a seamless interface for engaging in dialogues.
## Input types
### Required
- **`initiator`**
    - Represents the agent initiating the chat, setting the stage for the conversation's context and dynamics.
    - Comfy dtype: `AGENT`
    - Python dtype: `ConversableAgent`
- **`recipient`**
    - Denotes the agent receiving the chat initiation, playing a crucial role in the dialogue by responding to the initiator's messages.
    - Comfy dtype: `AGENT`
    - Python dtype: `ConversableAgent`
- **`summary_method`**
    - Specifies the method used to summarize the chat conversation, impacting the overall understanding and takeaway of the dialogue.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clear_history`**
    - Determines whether to clear the chat history before starting a new conversation, affecting the continuity and context of interactions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`init_message`**
    - Optional initial message to set the tone and topic of the conversation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`max_turns`**
    - Limits the number of exchanges between the agents, controlling the conversation's length.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`chat_history`**
    - Comfy dtype: `STRING`
    - Provides a detailed record of the chat conversation, capturing the exchange of messages between the agents.
    - Python dtype: `str`
- **`summary`**
    - Comfy dtype: `STRING`
    - Offers a concise summary of the chat, highlighting key points and outcomes of the conversation.
    - Python dtype: `str`
- **`initiator`**
    - Comfy dtype: `AGENT`
    - Returns the initiating agent, reflecting their role and contributions to the chat session.
    - Python dtype: `ConversableAgent`
- **`recipient`**
    - Comfy dtype: `AGENT`
    - Returns the recipient agent, showcasing their responses and engagement within the chat.
    - Python dtype: `ConversableAgent`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SimpleChat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "initiator": ("AGENT",),
                "recipient": ("AGENT",),
                "summary_method": ([
                    "last_msg",
                    "reflection_with_llm",
                ],),
                # whether to clear the chat history with the agent
                "clear_history": ("BOOLEAN", {"default": True},),
            },
            "optional": {
                "init_message": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "max_turns": ("INT", {"default": 10}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "AGENT", "AGENT",)
    RETURN_NAMES = ("chat_history", "summary", "initiator", "recipient",)

    FUNCTION = "start_chat"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def start_chat(self, initiator, recipient, summary_method, clear_history, init_message=None, max_turns=None):
        initiator = clone_conversable_agent(initiator)
        recipient = clone_conversable_agent(recipient)

        chat_result = initiator.initiate_chat(
            recipient,
            message=init_message,
            max_turns=max_turns,
            summary_method=summary_method,
            clear_history=clear_history,
        )
        summary = chat_result.summary
        chat_history = ""
        for message in chat_result.chat_history:
            if message["content"] is not None:
                chat_history += "- " + message["content"] + "\n\n"
        return (chat_history, summary, initiator, recipient,)

```
