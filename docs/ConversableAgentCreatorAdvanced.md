
# Documentation
- Class name: ConversableAgentCreatorAdvanced
- Category: SALT/Shakers/Agents
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConversableAgentCreatorAdvanced节点专门用于创建具有可定制功能的高级会话代理，包括集成大型语言模型（LLM）和个性化系统消息。它允许创建能够处理复杂交互并基于特定配置提供定制响应的AI代理。

# Input types
## Required
- name
    - name参数指定了所创建的会话代理的身份，作为唯一标识符和交互标签。
    - Comfy dtype: STRING
    - Python dtype: str
- system_message
    - system_message参数定义了代理用于指导其交互的初始消息或指令集，为其操作设定了基调和上下文。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- llm_model
    - llm_model参数允许指定一个大型语言模型，以赋予代理先进的理解和响应生成能力。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- default_auto_reply
    - 指定代理在无法生成特定回复时使用的默认响应，确保了一种备用通信方式。
    - Comfy dtype: STRING
    - Python dtype: str
- description
    - 代理目的或能力的简短描述，用于其他代理的识别或参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- agent
    - 输出是一个配置了提供参数的会话代理，准备好进行交互并能够处理复杂任务。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConversableAgentCreatorAdvanced:
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
				# default auto reply when no code execution or llm-based reply is generated.
				"default_auto_reply": ("STRING", {"multiline": True}),
				# a short description of the agent, this description is used by other agents.
				"description": ("STRING", {"multiline": True}),
			}
		}

	RETURN_TYPES = ("AGENT",)
	RETURN_NAMES = ("agent",)

	FUNCTION = "create_agent"
	CATEGORY = f"{MENU_NAME}/Shakers/Agents"

	def create_agent(self, name, system_message, llm_model=None, default_auto_reply="", description=None):
		agent = ConversableAgent(
			name=name,
			system_message=system_message,
			llm_config={"config_list": [{"model": llm_model["llm"].model, "api_key": llm_model["llm"].api_key}]} if llm_model is not None else False,
			human_input_mode="NEVER",
			default_auto_reply=default_auto_reply,
			description=description if description is not None else system_message,
		)
		return (agent,)

```
