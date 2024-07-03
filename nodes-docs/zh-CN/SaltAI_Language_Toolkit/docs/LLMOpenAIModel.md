
# Documentation
- Class name: LLMOpenAIModel
- Category: SALT/Language Toolkit/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMOpenAIModel节点旨在简化OpenAI语言模型的集成和使用过程。它提供了一个便捷的接口来加载和嵌入模型，可用于文本生成、分析等多种应用场景。该节点通过抽象化与OpenAI API的直接交互复杂性，为嵌入和模型管理提供了一个流畅的界面。

# Input types
## Required
- model
    - 指定要加载的OpenAI模型。此选择决定了所使用的语言模型的能力和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- api_key
    - 用于验证OpenAI服务请求的API密钥。它确保了对模型加载功能的安全访问。
    - Comfy dtype: STRING
    - Python dtype: str
- embedding_model
    - 定义与主要语言模型一起使用的特定嵌入模型，通过额外的文本嵌入能力增强其功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- multimodal
    - 一个布尔标志，指示要加载的模型是否应支持多模态输入，允许文本之外更广泛的输入类型。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- llm_model
    - 返回加载的主要语言模型，包括其配置和功能，可用于各种应用。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- embed_model_only
    - 提供单独加载的嵌入模型，详细说明其特定功能以及如何补充主要语言模型。
    - Comfy dtype: LLM_EMBED_MODEL
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMOpenAI:
    """
    @Documentation: https://docs.llamaindex.ai/en/stable/api_reference/llms/openai/
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (list(ALL_AVAILABLE_MODELS),),
                "api_key": ("STRING", {
                    "multiline": False, 
                    "dynamicPrompts": False, 
                    "default": os.environ.get("OPENAI_API_KEY", "")
                }),
                "embedding_model": (
                    sorted([x.value for x in OpenAIEmbeddingModelType]),
                    {"default": "text-embedding-ada-002"},
                ),
            },
            "optional": {
                "multimodal": ("BOOLEAN", {"default": False})
            }
        }

    RETURN_TYPES = ("LLM_MODEL", "LLM_EMBED_MODEL")
    RETURN_NAMES = ("llm_model", "embed_model_only")

    FUNCTION = "load_model"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load_model(self, model:str, embedding_model:str, api_key:str, multimodal:bool = False) -> Dict[str, Any]:
        llm = OpenAI(model=model) if not multimodal else OpenAIMultiModal(model=model)
        llm.api_key = api_key
        embed_model = OpenAIEmbedding(model_name=embedding_model, api_key=api_key,)
        return ({"llm":llm, "llm_name": model, "embed_model":embed_model, "embed_name": embedding_model}, {"embed_model": embed_model, "embed_name": embedding_model})

```
