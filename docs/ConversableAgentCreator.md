
# Documentation
- Class name: ConversableAgentCreator
- Category: SALT/Shakers/Agents
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConversableAgentCreator节点旨在创建可对话的智能体，这些智能体能够基于预定义的系统消息进行对话交互，并可选择性地利用大型语言模型(LLM)来生成响应。该节点为构建具有对话能力的AI实体提供了灵活且强大的工具。

# Input types
## Required
- name
    - 指定可对话智能体的名称，作为其唯一标识符。这个名称对于在系统中识别和引用特定的智能体至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- system_message
    - 定义初始系统消息，为可对话智能体设置上下文或指令，指导其交互行为。这个消息对塑造智能体的个性和功能起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- llm_model
    - 可选参数，允许集成大型语言模型(LLM)以增强智能体的对话能力，通过生成动态响应来提升交互质量。这为智能体提供了更高级的语言理解和生成能力。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict or None

# Output types
- agent
    - 创建的可对话智能体，已准备就绪可以进行交互，能够处理用户输入并做出响应。这个输出代表了一个功能完备的智能对话实体。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent


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
