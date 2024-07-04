
# Documentation
- Class name: GroupChatManagerCreator
- Category: SALT/Language Toolkit/Agents
- Output node: False

该节点旨在创建一个群聊管理器，能够监督和管理群聊环境中的互动。它专门用于配置和初始化适用于群聊场景的聊天管理代理，确保多个参与者之间的沟通和互动管理顺畅进行。

# Input types
## Required
- name
    - 群聊管理器的名称，作为聊天管理实体的标识符和标签。
    - Comfy dtype: STRING
    - Python dtype: str
- system_message
    - 群聊管理器可使用的系统消息，通常用于在群聊中发布公告或指示。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- llm_model
    - 可选参数，指定聊天管理器的大型语言模型（LLM）配置，使其具备高级语言理解和响应生成能力。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- max_consecutive_auto_reply
    - 可选参数，限制聊天管理器连续自动回复的最大次数，有助于防止垃圾信息并维持对话质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- group_manager
    - 配置完成的群聊管理器，可直接用于管理群聊会话。
    - Comfy dtype: GROUP_MANAGER
    - Python dtype: dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GroupChatManagerCreator:
	"""
	A chat manager agent that can manage a group chat of multiple agents.
	Can only be used in group chats.
	"""
	@classmethod
	def INPUT_TYPES(cls):
		return {
			"required": {
				"name": ("STRING", {"multiline": False, "placeholder": "Manager"}),
				"system_message": ("STRING", {
					"multiline": True,
					"placeholder": "Group chat manager.",
				}),
			},
			"optional": {
				"llm_model": ("LLM_MODEL",),
				"max_consecutive_auto_reply": ("INT", {"default": 10}),
			}
		}

	RETURN_TYPES = ("GROUP_MANAGER",)
	RETURN_NAMES = ("group_manager",)

	FUNCTION = "create_agent"
	CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

	def create_agent(self, name, system_message, llm_model=None, max_consecutive_auto_reply=None):
		group_manager = {
			"name": name,
			"system_message": system_message,
			"llm_config": {
				"config_list": [
					{
						"model": llm_model["llm"].model,
						"api_key": llm_model["llm"].api_key,
					}
				]
			} if llm_model is not None else None,
			"max_consecutive_auto_reply": max_consecutive_auto_reply,
		}
		return (group_manager,)

```
