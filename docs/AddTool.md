
# Documentation
- Class name: `AddTool`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

AddTool节点旨在通过向会话代理注册新功能或工具来增强其能力。它抽象了为代理增加额外能力的过程，从而实现更加动态和多功能的交互体验。

# Input types
## Required
- tool
    - 表示要添加到代理的工具，封装了该工具的功能、名称和描述。
    - Comfy dtype: TOOL
    - Python dtype: Dict[str, Any]
- assistant
    - 将添加工具的主要会话代理，作为交互的主要接口。
    - Comfy dtype: AGENT
    - Python dtype: AGENT

## Optional
- executor
    - 一个可选的次要代理，可以执行工具的功能。如果未指定，默认为主要代理。
    - Comfy dtype: AGENT
    - Python dtype: AGENT

# Output types
- assistant
    - 增强后的会话代理，现在具备了新工具的能力。
    - Comfy dtype: AGENT
    - Python dtype: AGENT
- executor
    - 负责执行工具功能的代理，可能与主要代理相同。
    - Comfy dtype: AGENT
    - Python dtype: AGENT


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
