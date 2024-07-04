
# Documentation
- Class name: ConvertAgentToLlamaindex
- Category: SALT/Shakers/Agents
- Output node: False

这个节点旨在将一个agent转换为与Llama兼容的格式，还可能包含一个可选的嵌入模型来增强agent的能力。

# Input types
## Required
- agent
    - 要转换成Llama兼容格式的主要agent，作为转换过程的核心元素。
    - Comfy dtype: AGENT
    - Python dtype: Dict[str, Any]
## Optional
- optional_embed_model
    - 一个可选的嵌入模型，可以包含在内以增强agent的转换过程，提供额外的功能或优化。
    - Comfy dtype: LLM_EMBED_MODEL
    - Python dtype: Dict[str, Any]

# Output types
- model
    - 转换后的agent，现在已经是与Llama兼容的格式，可能还通过嵌入模型得到了增强。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]


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
