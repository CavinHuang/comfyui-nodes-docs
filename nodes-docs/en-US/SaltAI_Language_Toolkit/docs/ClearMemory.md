# ∞ Clear Memory
## Documentation
- Class name: `ClearMemory`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

The ClearMemory node is designed to reset or clear the memory of a specified agent, potentially targeting a specific recipient within its memory scope. This functionality is crucial for managing and refreshing the state of conversational agents, ensuring they can operate without the burden of outdated or irrelevant conversational history.
## Input types
### Required
- **`agent`**
    - The 'agent' parameter represents the conversational agent whose memory is to be cleared. This is essential for resetting the agent's state or context to ensure it can handle new interactions effectively.
    - Comfy dtype: `AGENT`
    - Python dtype: `ConversableAgent`
## Output types
- **`agent`**
    - Comfy dtype: `AGENT`
    - Returns the agent with its memory cleared or reset, ready for new interactions. This ensures the agent can operate with a fresh state, free from the constraints of its prior conversational history.
    - Python dtype: `ConversableAgent`
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
