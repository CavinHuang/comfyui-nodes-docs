# ∞ Agent As Tool
## Documentation
- Class name: `ConvertAgentAsTool`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

This node is designed to transform conversational agents into tools that can be utilized within a broader system. It encapsulates the functionality of an agent, allowing it to be invoked as a callable tool with a specific interface, thereby extending the agent's capabilities to new contexts.
## Input types
### Required
- **`agent`**
    - The conversational agent to be transformed into a tool. This agent's conversational abilities are repurposed to function within a tool interface, enabling its integration into larger workflows.
    - Comfy dtype: `AGENT`
    - Python dtype: `ConversableAgent`
## Output types
- **`tool`**
    - Comfy dtype: `TOOL`
    - The transformed conversational agent, now structured as a callable tool. This tool retains the agent's conversational capabilities, repackaged for direct invocation within system workflows.
    - Python dtype: `Dict[str, Any]`
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
