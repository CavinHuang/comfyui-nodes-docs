
# Documentation
- Class name: AV_LLMApiConfig
- Category: ArtVenture/LLM
- Output node: False

AV_LLMApiConfig节点旨在为语言模型API生成配置设置，主要聚焦于模型选择、token限制和温度设置。它抽象了配置语言模型的复杂性，为在各种应用中使用语言模型提供了一个简化的接口，用于指定关键参数。

# Input types
## Required
- model
    - 指定要使用的语言模型，允许从预定义的GPT和Claude模型列表中进行选择。模型的选择直接影响生成的语言模型配置的行为和能力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Union[List[str], str]
- max_token
    - 定义语言模型在单个请求中可以生成或处理的最大token数，为输出长度设置了限制。
    - Comfy dtype: INT
    - Python dtype: int
- temperature
    - 控制语言模型响应的创造性或随机性，较高的值会导致更多样化的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- llm_config
    - 生成的语言模型配置，封装了模型选择、token限制和温度设置。
    - Comfy dtype: LLM_CONFIG
    - Python dtype: LLMConfig


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMApiConfigNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (gpt_models + claude_models, {"default": gpt_vision_models[0]}),
                "max_token": ("INT", {"default": 1024}),
                "temperature": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.001}),
            }
        }

    RETURN_TYPES = ("LLM_CONFIG",)
    RETURN_NAMES = ("llm_config",)
    FUNCTION = "make_config"
    CATEGORY = "ArtVenture/LLM"

    def make_config(self, max_token, model, temperature):
        return (LLMConfig(model=model, max_token=max_token, temperature=temperature),)

```
