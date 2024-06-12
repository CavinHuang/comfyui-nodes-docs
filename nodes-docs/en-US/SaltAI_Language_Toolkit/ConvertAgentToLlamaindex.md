---
tags:
- Agents
- LLM
- LLMChat
---

# ∞ Convert Agent To Llamaindex
## Documentation
- Class name: `ConvertAgentToLlamaindex`
- Category: `SALT/Shakers/Agents`
- Output node: `False`

This node is designed to transform an agent into a format compatible with Llama, potentially incorporating an optional embedding model to enhance the agent's capabilities.
## Input types
### Required
- **`agent`**
    - The primary agent to be converted into a Llama-compatible format, serving as the core element for transformation.
    - Comfy dtype: `AGENT`
    - Python dtype: `Dict[str, Any]`
### Optional
- **`optional_embed_model`**
    - An optional embedding model that can be included to augment the agent's conversion process, providing additional capabilities or optimizations.
    - Comfy dtype: `LLM_EMBED_MODEL`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`model`**
    - Comfy dtype: `LLM_MODEL`
    - The transformed agent, now in a format compatible with Llama, optionally enhanced by an embedding model.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConvertAgentToLlamaindex:
	@classmethod
	def INPUT_TYPES(cls):
		return {
			"required": {
				"agent": ("AGENT",),
			},
			"optional": {
				"optional_embed_model": ("LLM_EMBED_MODEL",)
            }
		}

	RETURN_TYPES = ("LLM_MODEL",)
	RETURN_NAMES = ("model",)

	FUNCTION = "convert_agent"
	CATEGORY = f"{MENU_NAME}/Shakers/Agents"

	def convert_agent(self, agent, optional_embed_model=None):
		llm = {"llm": BaseModel(agent)}
		if optional_embed_model:
			llm.update(optional_embed_model)
		return (llm,)

```
