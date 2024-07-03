
# Documentation
- Class name: ClearMemory
- Category: SALT/Language Toolkit/Agents
- Output node: False

ClearMemory节点旨在重置或清除指定代理的记忆，可能针对其记忆范围内的特定接收者。这一功能对于管理和刷新对话代理的状态至关重要，确保它们能够在不受过时或无关的对话历史负担的情况下运行。

# Input types
## Required
- agent
    - agent参数代表需要清除记忆的对话代理。这对于重置代理的状态或上下文至关重要，以确保它能有效处理新的交互。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent

# Output types
- agent
    - 返回记忆已被清除或重置的代理，准备好进行新的交互。这确保了代理可以在一个全新的状态下运行，不受先前对话历史的约束。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ClearMemory:
	@classmethod
	def INPUT_TYPES(cls):
		return {
			"required": {
				"agent": ("AGENT",),
			},
			"oprional": {
				"recipient": ("AGENT", {"default": None}),
			},
		}

	RETURN_TYPES = ("AGENT",)
	RETURN_NAMES = ("agent",)

	FUNCTION = "clear_memory"
	CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

	def clear_memory(self, agent, recipient=None):
		agent = clone_conversable_agent(agent)
		agent.clear_history(recipient)
		return (agent,)

```
