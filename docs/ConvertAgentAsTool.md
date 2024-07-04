
# Documentation
- Class name: ConvertAgentAsTool
- Category: SALT/Language Toolkit/Agents
- Output node: False

这个节点旨在将对话型智能体转换为可在更广泛系统中使用的工具。它封装了智能体的功能，使其能够作为具有特定接口的可调用工具被调用，从而将智能体的能力扩展到新的应用场景中。

# Input types
## Required
- agent
    - 需要转换为工具的对话型智能体。该智能体的对话能力将被重新定向以适应工具接口的功能，使其能够集成到更大的工作流程中。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent

# Output types
- tool
    - 转换后的对话型智能体，现在被构造为一个可调用的工具。这个工具保留了智能体的对话能力，但被重新打包以便在系统工作流程中直接调用。
    - Comfy dtype: TOOL
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConvertAgentAsTool:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "agent": ("AGENT",),
            },
        }

    RETURN_TYPES = ("TOOL",)
    RETURN_NAMES = ("tool",)

    FUNCTION = "create_tool"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def create_tool(self, agent):
        agent = clone_conversable_agent(agent)
        def agent_call(message: Annotated[str, "Message to ask the assistant."]):
            return agent.generate_reply(messages=[{"content": message, "role": "user"}])

        tool = {
            "name": "agent_call",
            "description": agent.description,
            "function": agent_call,
        }
        return (tool,)

```
