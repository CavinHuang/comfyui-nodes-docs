
# Documentation
- Class name: ChangeSystemMessage
- Category: SALT/Language Toolkit/Agents
- Output node: False

ChangeSystemMessage节点旨在修改代理的系统消息，使得可以根据新的系统消息动态更新代理的指令或行为。

# Input types
## Required
- agent
    - 代表需要更新系统消息的代理，作为主要的修改对象。
    - Comfy dtype: AGENT
    - Python dtype: CustomAgentType
- system_message
    - 要为代理设置的新系统消息，用于自定义代理的指令或行为。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- agent
    - 应用了新系统消息的更新后的代理，反映了指令或行为的变化。
    - Comfy dtype: AGENT
    - Python dtype: CustomAgentType


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
