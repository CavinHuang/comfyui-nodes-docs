# ∞ Add Tool
## Documentation
- Class name: `AddTool`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

The AddTool node is designed to enhance conversational agents by registering new functionalities or tools to them. It abstracts the process of augmenting agents with additional capabilities, allowing for a more dynamic and versatile interaction experience.
## Input types
### Required
- **`tool`**
    - Represents the tool to be added to the agent, encapsulating the functionality, name, and description of the tool.
    - Comfy dtype: `TOOL`
    - Python dtype: `Dict[str, Any]`
- **`assistant`**
    - The primary conversational agent to which the tool will be added, serving as the main interface for interaction.
    - Comfy dtype: `AGENT`
    - Python dtype: `AGENT`
### Optional
- **`executor`**
    - An optional secondary agent that can execute the tool's functionality, defaulting to the primary agent if not specified.
    - Comfy dtype: `AGENT`
    - Python dtype: `AGENT`
## Output types
- **`assistant`**
    - Comfy dtype: `AGENT`
    - The enhanced conversational agent, now equipped with the new tool's capabilities.
    - Python dtype: `AGENT`
- **`executor`**
    - Comfy dtype: `AGENT`
    - The agent responsible for executing the tool's functionality, which may be the same as the primary agent.
    - Python dtype: `AGENT`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddTool:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "tool": ("TOOL",),
                "assistant": ("AGENT",),
            },
            "optional": {
                "executor": ("AGENT",),
            }
        }

    RETURN_TYPES = ("AGENT", "AGENT",)
    RETURN_NAMES = ("assistant", "executor",)

    FUNCTION = "create_tool"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def create_tool(self, tool, assistant, executor=None):
        assistant = clone_conversable_agent(assistant)
        if executor is None:
            executor = assistant
        # Register the calculator function to the two agents.
        register_function(
            tool["function"],
            caller=assistant,
            executor=executor,
            name=tool["name"],
            description=tool["description"],
        )
        return (assistant, executor,)

```
