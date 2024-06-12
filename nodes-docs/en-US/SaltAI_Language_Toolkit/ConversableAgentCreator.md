---
tags:
- Agents
- LLM
- LLMChat
---

# ∞ Conversable Agent
## Documentation
- Class name: `ConversableAgentCreator`
- Category: `SALT/Shakers/Agents`
- Output node: `False`

This node is designed to facilitate the creation of conversable agents, which are AI entities capable of engaging in dialogue based on predefined system messages and optionally leveraging large language models (LLMs) for generating responses.
## Input types
### Required
- **`name`**
    - Specifies the name of the conversable agent, serving as its identifier.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`system_message`**
    - Defines the initial system message that sets the context or instructions for the conversable agent, guiding its interaction behavior.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`llm_model`**
    - An optional parameter that allows the integration of a large language model (LLM) to enhance the agent's conversational capabilities by generating dynamic responses.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict or None`
## Output types
- **`agent`**
    - Comfy dtype: `AGENT`
    - The created conversable agent, ready for interaction and capable of processing and responding to user inputs.
    - Python dtype: `ConversableAgent`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConversableAgentCreator:
	@classmethod
	def INPUT_TYPES(cls):
		return {
			"required": {
				"name": ("STRING", {"multiline": False, "placeholder": "Assistant"}),
				"system_message": ("STRING", {
					"multiline": True,
					"default": "You are a helpful AI assistant. You can help with document QA. Return 'TERMINATE' when the task is done."
				}),
			},
			"optional": {
				"llm_model": ("LLM_MODEL",),
			}
		}

	RETURN_TYPES = ("AGENT",)
	RETURN_NAMES = ("agent",)

	FUNCTION = "create_agent"
	CATEGORY = f"{MENU_NAME}/Shakers/Agents"

	def create_agent(self, name, system_message, llm_model=None):
		agent = ConversableAgent(
			name=name,
			system_message=system_message,
			llm_config={"config_list": [{"model": llm_model["llm"].model, "api_key": llm_model["llm"].api_key}]} if llm_model is not None else False,
			human_input_mode="NEVER",
		)
		return (agent,)

```
