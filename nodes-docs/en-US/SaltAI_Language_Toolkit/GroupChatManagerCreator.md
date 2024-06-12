# ∞ Group Chat Manager
## Documentation
- Class name: `GroupChatManagerCreator`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

This node is designed to facilitate the creation of a group chat manager, capable of overseeing and managing the interactions within a group chat environment. It specializes in configuring and initializing a chat manager agent that is tailored for group chat scenarios, ensuring smooth communication and interaction management among multiple participants.
## Input types
### Required
- **`name`**
    - The name of the group chat manager, serving as an identifier and a label for the chat management entity.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`system_message`**
    - A system message that can be used by the group chat manager, typically for announcements or instructions within the group chat.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`llm_model`**
    - An optional parameter specifying the large language model (LLM) configuration for the chat manager, enabling advanced language understanding and response generation capabilities.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`max_consecutive_auto_reply`**
    - An optional parameter that limits the maximum number of consecutive automatic replies by the chat manager, helping to prevent spam and maintain conversation quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`group_manager`**
    - Comfy dtype: `GROUP_MANAGER`
    - The configured group chat manager, ready to be utilized in managing a group chat session.
    - Python dtype: `dict`
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
