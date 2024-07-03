
# Documentation
- Class name: GroupChatAdvanced
- Category: SALT/Language Toolkit/Agents
- Output node: False
- Repo Ref: https://github.com/jmcheon/saltai/tree/d26748c7a9cb42f687c0a48949b7fc949a3bbf50

GroupChatAdvanced节点提供了一个先进的群聊功能，可以协调多个代理之间的对话。它包含了消息过滤、发言者选择和自定义聊天介绍等特性，以增强互动的动态性。

# Input types
## Required
- group_manager
    - 指定负责监督群聊的管理者，确保结构化和有序的互动。
    - Comfy dtype: GROUP_MANAGER
    - Python dtype: GroupManager
- init_message
    - 启动聊天会话的初始消息，为对话设定基调。
    - Comfy dtype: STRING
    - Python dtype: str
- select_speaker_message_template
    - 自定义选择下一位发言者的消息，在聊天中提供上下文和指示。
    - Comfy dtype: STRING
    - Python dtype: str
- select_speaker_prompt_template
    - 自定义选择下一位发言者的提示，指导LLM选择下一个代理担任角色。
    - Comfy dtype: STRING
    - Python dtype: str
- summary_method
    - 决定生成聊天摘要的方法，允许对对话进行定制化的反思。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- max_turns
    - 指定聊天中的最大轮数，控制对话的长度。
    - Comfy dtype: INT
    - Python dtype: int
- func_call_filter
    - 启用时，基于函数调用建议过滤下一位发言者，增加基于代理能力的互动层。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- speaker_selection_method
    - 定义选择下一位发言者的策略，促进有组织和动态的对话流程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- allow_repeat_speaker
    - 允许同一发言者连续发言，增加对话流程的灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- send_introductions
    - 选择在聊天开始时发送介绍性消息，为对话设定舞台。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- role_for_select_speaker_messages
    - 指定与选择下一位发言者相关的消息的角色，增强发言者选择的上下文。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clear_history
    - 选择在开始新会话前清除聊天历史，确保一个全新的开始。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- agent_i
    - 代表聊天中潜在的多个代理之一，为互动对话做出贡献。
    - Comfy dtype: AGENT
    - Python dtype: Agent

# Output types
- chat_history
    - 聊天会话期间交换的消息的完整历史记录。
    - Comfy dtype: STRING
    - Python dtype: str
- summary
    - 聊天会话的摘要，捕捉对话的精髓和关键点。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GroupChatAdvanced:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "group_manager": ("GROUP_MANAGER",),
                "init_message": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                # select_speaker_message_template: customize the select speaker message (used in "auto" speaker selection), which appears first in the message context and generally includes the agent descriptions and list of agents. The string value will be converted to an f-string, use "{roles}" to output the agent's and their role descriptions and "{agentlist}" for a comma-separated list of agent names in square brackets.
                "select_speaker_message_template": ("STRING", {
                    "multiline": True,
                    "dynamicPrompts": False,
                    "default": "You are in a role play game. The following roles are available:\n{roles}.\nRead the following conversation.\nThen select the next role from {agentlist} to play. Only return the role."
                }),
                # select_speaker_prompt_template: customize the select speaker prompt (used in "auto" speaker selection), which appears last in the message context and generally includes the list of agents and guidance for the LLM to select the next agent. The string value will be converted to an f-string, use "{agentlist}" for a comma-separated list of agent names in square brackets.
                "select_speaker_prompt_template": ("STRING", {
                    "multiline": True,
                    "dynamicPrompts": False,
                    "default": "Read the above conversation. Then select the next role from {agentlist} to play. Only return the role."
                }),
                "summary_method": ([
                    "last_msg",
                    "reflection_with_llm",
                ],),
                "max_turns": ("INT", {"default": 10}),
                # When set to True and when a message is a function call suggestion,
                # the next speaker will be chosen from an agent which contains the corresponding function name
                # in its `function_map`
                "func_call_filter": ("BOOLEAN", {"default": True},),
                # speaker_selection_method: the method for selecting the next speaker.
                # Could be any of the following (case insensitive), will raise ValueError if not recognized:
                # - "auto": the next speaker is selected automatically by LLM.
                # - "manual": the next speaker is selected manually by user input.
                # - "random": the next speaker is selected randomly.
                # - "round_robin": the next speaker is selected in a round robin fashion, i.e., iterating in the same order as provided in `agents`.
                "speaker_selection_method": ([
                    "auto",
                    # "manual",
                    "random",
                    "round_robin",
                ],),
                # whether to allow the same speaker to speak consecutively.
                "allow_repeat_speaker": ("BOOLEAN", {"default": True},),
                # send_introductions: send a round of introductions at the start of the group chat, so agents know who they can speak to
                "send_introductions": ("BOOLEAN", {"default": False},),
                # role_for_select_speaker_messages: sets the role name for speaker selection when in 'auto' mode, typically 'user' or 'system'.
                "role_for_select_speaker_messages": ([
                    "system",
                    "user",
                ],),
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
        select_speaker_message_template,
        select_speaker_prompt_template,
        func_call_filter,
        speaker_selection_method,
        allow_repeat_speaker,
        send_introductions,
        role_for_select_speaker_messages,
        summary_method,
        max_turns,
        clear_history,
        **kwargs,
    ):
        agents = [kwargs[i] for i in kwargs if "agent_" in i]
        assert len(agents) != 1, "At least 1 agent is needed to start a group chat session"
        # create chat
        group_chat = AutogenGroupChat(
            agents=agents,
            messages=[],
            max_round=max_turns,
            func_call_filter=func_call_filter,
            select_speaker_prompt_template=select_speaker_prompt_template,
            speaker_selection_method=speaker_selection_method,
            allow_repeat_speaker=allow_repeat_speaker,
            send_introductions=send_introductions,
            role_for_select_speaker_messages=role_for_select_speaker_messages,
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
            chat_history += "- " + str(message["content"]) + "\n\n"
        return (chat_history, summary)

```
