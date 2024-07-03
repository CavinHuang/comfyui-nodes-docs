
# Documentation
- Class name: GroupChat
- Category: SALT/Language Toolkit/Agents
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GroupChat节点负责创建和管理多代理之间的群聊会话。它支持聊天的启动、消息的处理，以及聊天流程的管理，包括选择发言者和介绍代理，从而在群聊环境中编排复杂的多代理交互。

# Input types
## Required
- group_manager
    - 负责监督群聊的管理员，为聊天会话提供必要的配置和权限。
    - Comfy dtype: GROUP_MANAGER
    - Python dtype: GroupManager
- init_message
    - 用于启动群聊会话的初始消息，为对话设定基调和背景。
    - Comfy dtype: STRING
    - Python dtype: str
- send_introductions
    - 一个标志，指示代理是否应在聊天开始时发送自我介绍，为他们的互动奠定基础。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- summary_method
    - 用于生成聊天会话摘要的方法，决定如何捕捉对话的关键点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- max_turns
    - 指定聊天会话可以进行的最大回合数，控制对话的长度和可能的深度。
    - Comfy dtype: INT
    - Python dtype: int
- clear_history
    - 一个标志，指示是否应在开始新会话前清除聊天历史，确保隐私和相关性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- agent_i
    - 代表可能参与群聊的多个代理之一，为对话的动态流程做出贡献。
    - Comfy dtype: AGENT
    - Python dtype: Agent

# Output types
- chat_history
    - 聊天会话期间交换的所有消息的记录，提供对话流程的全面概览。
    - Comfy dtype: STRING
    - Python dtype: str
- summary
    - 聊天会话的简明摘要，捕捉对话的精髓和关键点。
    - Comfy dtype: STRING
    - Python dtype: str


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
