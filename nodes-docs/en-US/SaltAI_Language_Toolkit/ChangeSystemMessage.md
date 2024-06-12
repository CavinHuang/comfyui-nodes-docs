# ∞ Change System Message
## Documentation
- Class name: `ChangeSystemMessage`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

This node is designed to modify the system message within an agent, allowing for dynamic updates to the agent's instructions or behavior based on new system messages.
## Input types
### Required
- **`agent`**
    - Represents the agent whose system message is to be updated, serving as the primary entity for modification.
    - Comfy dtype: `AGENT`
    - Python dtype: `CustomAgentType`
- **`system_message`**
    - The new system message to be set for the agent, enabling customization of the agent's instructions or behavior.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`agent`**
    - Comfy dtype: `AGENT`
    - The updated agent with the new system message applied, reflecting the changes in instructions or behavior.
    - Python dtype: `CustomAgentType`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ChangeSystemMessage:
	@classmethod
	def INPUT_TYPES(cls):
		return {
			"required": {
				"agent": ("AGENT",),
				"system_message": ("STRING", {
					"multiline": True,
					"default": "You are a helpful AI assistant. You can help with document QA. Return 'TERMINATE' when the task is done."
				}),
			},
		}

	RETURN_TYPES = ("AGENT",)
	RETURN_NAMES = ("agent",)

	FUNCTION = "update_system_prompt"
	CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

	def update_system_prompt(self, agent, system_message, llm_model=None):
		agent = clone_conversable_agent(agent)
		agent.update_system_message(system_message)
		return (agent,)

```
